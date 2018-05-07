import { PedidosCliente } from './../../models/pedido-cliente';
import { Pedido } from './../../models/pedido';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Mesa } from '../../models/mesa';
import { Empresa } from '../../models/empresa';
import { v1 } from 'uuid';
import { AutenticacaoServiceProvider } from '../autenticacao-service/autenticacao-service';


@Injectable()
export class ServicosProvider {

  private EMPRESAS = 'empresas';
  private CLIENTES = 'clientes';
  clientesList: AngularFireList<any>;
  empresasList: AngularFireList<any[]>;
  mesaSelecionada: Mesa;

  pedidoEmAndamento: Pedido;
  empresaSelecionda: Empresa;

  constructor(private db: AngularFireDatabase,
    private servicoLogin: AutenticacaoServiceProvider) {

   // this.obterListaDeClientes();
    this.getList()
    //this.obterUduarioLogado();
    
  }

  obterPedidoDoUsuario(chaveDopedido: string) {

   // let emailLogado = this.servicoLogin.obterUsuarioLogado().email;
    let ref = this.db.database.ref('empresas/' + this.empresaSelecionda.$key + '/pedidos');
    ref.orderByChild(chaveDopedido).on('child_added', snepshot => {
      let pedido = snepshot.val() as Pedido;
      this.pedidoEmAndamento = pedido;
      return;
    });

    if (!this.pedidoEmAndamento) {
      this.pedidoEmAndamento = new Pedido(this.servicoLogin.clienteLogado.usuario);
      if (this.mesaSelecionada.numero)
        this.pedidoEmAndamento.mesa = this.mesaSelecionada.numero;
    }

  }

  // carregarPedido() {
  //   this.obterUduarioLogado();
  // }

  buscarEmpresaSelecionada(empresa: Empresa) {
    let list = Array<Empresa>();
    list = [];

    this.db.database
      .ref(this.EMPRESAS)
      .orderByKey()
      .equalTo(empresa.$key).on("child_added", (snapshot) => {
        let item = snapshot.val();
        item.$key = snapshot.key;
        list.push(item as Empresa)
        this.empresaSelecionda = list[0];
        this.verificarPedidoEmAberto();
      });
  }

  salvarCliente(email: string) {
    this.clientesList.push({
      usuario: email
    });
  }

  // obterUduarioLogado() {
  //   let list = Array<Cliente>();
  //   list = [];
  //   let emailLogado = this.servicoLogin.obterUsuarioLogado().email;
  //   this.db.database
  //     .ref(this.CLIENTES)
  //     .orderByChild('usuario')
  //     .equalTo(emailLogado).on("child_added", (snapshot) => {
  //       let item = snapshot.val();
  //       item.$key = snapshot.key;
  //       list.push(item as Cliente)
  //       this.clienteLogado = list[0];

  //     });
  // }

  verificarPedidoEmAberto() {

    if(!this.servicoLogin.clienteLogado.pedidos){
      this.pedidoEmAndamento = new Pedido(this.servicoLogin.clienteLogado.usuario);
      return;
    }

    let pedidosDoCliente = Object.values(this.servicoLogin.clienteLogado.pedidos);
    let pedido: PedidosCliente;

    if (pedidosDoCliente) {
      pedido = pedidosDoCliente.find(c => c.status);
    }

    if (!pedido) {
      this.pedidoEmAndamento = new Pedido(this.servicoLogin.clienteLogado.usuario);
      return
    }

    this.obterPedidoDoUsuario(pedido.numero);
  }


  getList() {
    this.empresasList = this.db.list(this.EMPRESAS);
    return this.empresasList;
  }

  obterListaDeClientes() {
    this.clientesList = this.db.list(this.CLIENTES);
   
  }

  selecionarMesa(mesa: Mesa) {
    this.mesaSelecionada = mesa;
  }

  inserirPedido() {

    if (!this.pedidoEmAndamento) {
      return;
    }
    if (!this.pedidoEmAndamento.pedidoEmAberto) {
      this.pedidoEmAndamento.pedidoEmAberto = true;
    }

    if (!this.pedidoEmAndamento.numeroDoPedido) {
      this.pedidoEmAndamento.numeroDoPedido = v1();
    }

    this.pedidoEmAndamento.horaDoPedido = new Date();

    let path = this.EMPRESAS + '/' + this.empresaSelecionda.$key + '/pedidos/' + this.pedidoEmAndamento.numeroDoPedido;
    this.db.object(path).set({ ...this.pedidoEmAndamento });

    this.salvarPedidoNoCliente();

  }

  private salvarPedidoNoCliente() {
    let pedidoDoCliente = new PedidosCliente();

    pedidoDoCliente.status = true;
    pedidoDoCliente.numero = this.pedidoEmAndamento.numeroDoPedido;
    pedidoDoCliente.dataPedido = this.pedidoEmAndamento.horaDoPedido;
    pedidoDoCliente.empresa = this.empresaSelecionda.$key;

   
    let path = this.CLIENTES + '/' + this.servicoLogin.clienteLogado.$key + '/' + '/pedidos/' + pedidoDoCliente.numero;
    this.db.object(path).set({ ...pedidoDoCliente });
  }
  
}
