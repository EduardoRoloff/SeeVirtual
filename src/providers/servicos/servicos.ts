import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Mesa } from '../../models/mesa';
import { Empresa } from '../../models/empresa';

/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicosProvider {

  mesasDoBanco: AngularFireList<any[]>;
  private PATH = 'empresas';
  empresasList: AngularFireList<any[]>;
  mesaSelecionada: Mesa;
  empresaSelecionda: Empresa;

  constructor(private db: AngularFireDatabase) {
  }

  alterarMesa(mesa: Mesa) {
    if (!mesa.pedidos) {
      return;
    }
    if (!mesa.emAberto) {
      mesa.emAberto = true;
    }
    let posicao = parseInt(mesa.numero) - 1;
    let path = 'empresas/' + this.empresaSelecionda.$key + '/mesas/' + posicao;
    this.db.object(path).set({ ...mesa });
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
    let list = Array<Mesa>();
    list = [];
    var starCountRef = this.db.database.ref('empresas/' + this.empresaSelecionda.$key + '/mesas')
      .orderByChild("numero").equalTo(mesa.numero);
    starCountRef.on('value', (snapshot) => {
      this.mesasDoBanco = snapshot.val();
      let numeroDaMesa = parseInt(mesa.numero);
      let item = snapshot.val()[numeroDaMesa - 1];
      list.push(item as Mesa);
      this.mesaSelecionada = list[0];
      this.mesaSelecionada.emAberto = true;
    });
  }

  finalizarPedido() {
  }
}
