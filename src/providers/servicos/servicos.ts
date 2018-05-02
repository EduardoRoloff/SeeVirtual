import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Mesa } from '../../models/mesa';
import { Empresa } from '../../models/empresa';
import { Pedido } from '../../models/pedido';
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

  private PATH = 'empresas';
  empresasList: AngularFireList<any[]>;
  mesaSelecionada: Mesa;
  pedidoEmAndamento: PedidoEmAndaento;
  empresaSelecionda: Empresa;

  constructor(private db: AngularFireDatabase,private servicoLogin: AutenticacaoServiceProvider) {
  }

  alterarPedido(){
    
    if (!this.pedidoEmAndamento.pedido.pedidoEmAberto) {
      this.pedidoEmAndamento.pedido.pedidoEmAberto = true;
    }
    let path = this.pedidoEmAndamento.caminhoDoPedidoEmAndamento;
    this.db.object(path).set({ ...this.pedidoEmAndamento.pedido});
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
    this.empresasList = this.db.list(this.PATH);
    return this.empresasList;
  }

  selecionarMesa(mesa: Mesa) {
    this.mesaSelecionada = mesa;
    
  }
  
  inserirPedido(pedido: Pedido) {

    if (!pedido) {
      return;
    }

    if (!pedido.pedidoEmAberto) {
      pedido.pedidoEmAberto = true;
    }

    if(this.pedidoEmAndamento){
      this.empresaSelecionda.pedidos = [];
     }


    pedido.numeroDoPedido = v1();
    this.empresaSelecionda.pedidos.push(pedido);
    let path = 'empresas/' + this.empresaSelecionda.$key + '/pedidos/'+pedido.numeroDoPedido;
    this.db.object(path).set({ ...pedido});
  }


}
