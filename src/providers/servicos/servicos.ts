import { PedidoEmAndaento } from './../../models/pedidoEmAndamento';
import { PedidosCliente } from './../../models/pedido-cliente';
import { Cliente } from './../../models/cliente';
import { Pedido } from './../../models/pedido';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Mesa } from '../../models/mesa';
import { Empresa } from '../../models/empresa';
import { v1 } from 'uuid';
import { AutenticacaoServiceProvider } from '../autenticacao-service/autenticacao-service';


@Injectable()
export class ServicosProvider {



  clienteLogado: Cliente;
  private PATHEMPRESAS = 'empresas';
  private PATHCLIENTES = 'clientes';
  clientesList: AngularFireList<any>;
  empresasList: AngularFireList<any[]>;
  mesaSelecionada: Mesa;

  pedidoEmAndamento: Pedido;
  empresaSelecionda: Empresa;

  constructor(private db: AngularFireDatabase,
    private servicoLogin: AutenticacaoServiceProvider) {
    this.obterListaDeClientes();

  }

  obterPedidoDoUsuario(chaveDopedido: string) {

    let emailLogado = this.clienteLogado.usuario;
    let ref = this.db.database.ref('empresas/' + this.empresaSelecionda.$key + '/pedidos');
    ref.orderByChild(chaveDopedido).on('child_added', snepshot => {
      let pedido = snepshot.val() as Pedido;
      this.pedidoEmAndamento = pedido != null ? pedido : new Pedido(emailLogado);
    });

    this.pedidoEmAndamento = new Pedido(emailLogado);
  }

  buscarEmpresaSelecionada(empresa: Empresa) {
    let list = Array<Empresa>();
    list = [];

    let ref = this.db.database
      .ref("empresas")
      .orderByKey()
      .equalTo(empresa.$key).on("child_added", (snapshot) => {
        let item = snapshot.val();
        item.$key = snapshot.key;
        list.push(item as Empresa)
        this.empresaSelecionda = list[0];
        this.obterUduarioLogado();
        if (!this.pedidoEmAndamento) {
          this.pedidoEmAndamento = new Pedido(this.servicoLogin.obterUsuarioLogado().email);
        }
      });
  }

  salvarCliente(email: string) {
    this.clientesList.push({
      usuario: email
    });

  }

  obterUduarioLogado() {
    let list = Array<Cliente>();
    list = [];
    let emailLogado = this.servicoLogin.obterUsuarioLogado().email;
    let ref = this.db.database
      .ref("clientes")
      .orderByChild('usuario')
      .equalTo(emailLogado).on("child_added", (snapshot) => {
        let item = snapshot.val();
        item.$key = snapshot.key;
        list.push(item as Cliente)
        this.clienteLogado = list[0];
        this.verificarPedidoEmAberto();
      });
  }

  verificarPedidoEmAberto() {
    if (!this.clienteLogado.empresa) {
      this.pedidoEmAndamento = new Pedido(this.clienteLogado.usuario);
      return;
    }
    let empresa = this.clienteLogado.empresa
      .find(e => e.chaveDaEmpresa === this.empresaSelecionda.$key);

    if (!empresa) {
      this.pedidoEmAndamento = new Pedido(this.clienteLogado.usuario);
      return
    }
    let pedido = empresa.pedido.find(c => c.status);

    this.obterPedidoDoUsuario(pedido.pedido);

  }




  getList() {
    this.empresasList = this.db.list(this.PATHEMPRESAS);
    return this.empresasList;
  }

  obterListaDeClientes() {
    this.clientesList = this.db.list(this.PATHCLIENTES);
    return this.clientesList;
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

    this.pedidoEmAndamento.numeroDoPedido = v1();
    this.pedidoEmAndamento.horaDoPedido = new Date();
    let path = 'empresas/' + this.empresaSelecionda.$key + '/pedidos/' + this.pedidoEmAndamento.numeroDoPedido;
    this.db.object(path).set({ ...this.pedidoEmAndamento });

    this.salvarPedidoNoCliente();

  }

  private salvarPedidoNoCliente() {
    let pedidoDoCliente = new PedidosCliente();
    
    pedidoDoCliente.status = true;
    pedidoDoCliente.numero = this.pedidoEmAndamento.numeroDoPedido;
    pedidoDoCliente.dataPedido = this.pedidoEmAndamento.horaDoPedido;

    if(!this.clienteLogado){
      this.clienteLogado = new Cliente(this.servicoLogin.obterUsuarioLogado().email);
      this.clienteLogado.$key = v1();
    }
    let path = 'cliente/' + this.clienteLogado.$key + '/empresas/' + this.empresaSelecionda.$key + '/pedidos/' + pedidoDoCliente.numero;
    this.db.object(path).set({ ...pedidoDoCliente });
  }
}
