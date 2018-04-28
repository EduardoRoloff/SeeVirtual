import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Mesa } from '../../models/mesa';
import { Empresa } from '../../models/empresa';
import { AutenticacaoServiceProvider } from '../autenticacao-service/autenticacao-service';

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

  constructor(private db: AngularFireDatabase, private autenticacao: AutenticacaoServiceProvider) {
  }

  alterarMesa(mesa: Mesa) {
    let path = 'empresas/' + this.empresaSelecionda.$key + '/mesas/' + (+mesa.numero -1);
    this.db.object(path).set({...mesa});
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
    var starCountRef = this.db.database.ref('empresas/' + this.empresaSelecionda.$key + '/mesas')
      .orderByChild("numero").equalTo(mesa.numero);
    starCountRef.on('value', (snapshot) => {
      this.mesasDoBanco = snapshot.val();
      this.mesaSelecionada = this.mesasDoBanco[0];
    });
  }

  finalizarPedido() {
  }
}
