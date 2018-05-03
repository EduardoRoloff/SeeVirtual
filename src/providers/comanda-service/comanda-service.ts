import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/*
  Generated class for the ComandaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComandaServiceProvider {
  
  private PATH = 'empresas/itens';
  itensList: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase) { 
  }

  // getList(){
  //   this.itensList = this.db.list(this.PATH);
  //   return this.itensList;
  // }

  //BUSCAR TODOS
  getAll() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => { //MAP PARA RECEBER AS MUDANÇAS
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })); // ... não precisa retornar variavel
      })
  }

  //BUSCAR APENAS UM
  get(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => { //MAP PARA ACESSAR O OBJETO
        return { key: c.key, ...c.payload.val() };
      })
  } 

  //SALVAR
  save(comanda: any) {
    return new Promise((resolve, reject) => {
      if (comanda.key) {
        this.db.list(this.PATH)
          .update(comanda.key, { lista: comanda.item })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ lista: comanda.item })
          .then(() => resolve());
      }
    });
  }

  //excluir
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
