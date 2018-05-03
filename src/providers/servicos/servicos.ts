import { PedidosCliente } from './../../models/pedido-cliente';
import { Cliente } from './../../models/cliente';
import { Pedido } from './../../models/pedido';
import { Usuario } from './../autenticacao-service/usuario';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Mesa } from '../../models/mesa';
import { Empresa } from '../../models/empresa';
import { PedidoEmAndaento } from '../../models/pedidoEmAndamento';
import { v1 } from 'uuid';
import { AutenticacaoServiceProvider } from '../autenticacao-service/autenticacao-service';


/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
    this.getListCliente();
    this.pedidoEmAndamento = new Pedido(this.servicoLogin.obterUsuarioLogado().email);
    this.obterUduarioLogado();

    }

  obterPedidoDoUsuario() {

    let emailLogado = this.servicoLogin.obterUsuarioLogado().email;
    let ref = this.db.database.ref('empresas/' + this.empresaSelecionda.$key + '/pedidos');
    ref.orderByChild(this.clienteLogado.usuario).on('child_added', snepshot => {
      let pedido = snepshot.val() as Pedido;
      this.pedidoEmAndamento = pedido != null ? pedido : new Pedido(emailLogado);
    });

    this.pedidoEmAndamento = new Pedido(emailLogado);
  }
  salvarCliente(email: string) {
    this.clientesList.push({
      usuario: email
    });

  }
  alterarCliente(cliente: Cliente) {
    this.clientesList.update(cliente.$key, {
      usuario: cliente.usuario,
      pedido: cliente.pedido
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
      });
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
      });
  } 


  getList() {
    this.empresasList = this.db.list(this.PATHEMPRESAS);
    return this.empresasList;
  }

  getListCliente() {
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
    let path = 'empresas/' + this.empresaSelecionda.$key + '/pedidos/' + this.pedidoEmAndamento.numeroDoPedido;
    this.db.object(path).set({ ...this.pedidoEmAndamento });

    if (!this.clienteLogado.pedido) {
      this.clienteLogado.pedido = [];
    }

    let pedidoDoCliente = new PedidosCliente();
    pedidoDoCliente.empresa = this.empresaSelecionda.$key;
    pedidoDoCliente.dataPedido = this.pedidoEmAndamento.horaDoPedido;
    pedidoDoCliente.pedido = this.pedidoEmAndamento.numeroDoPedido;
    pedidoDoCliente.status = true;

    this.clienteLogado.pedido.push(pedidoDoCliente)

    this.alterarCliente(this.clienteLogado);
  }


}
