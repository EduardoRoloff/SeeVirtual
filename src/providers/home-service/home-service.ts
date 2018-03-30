import { Injectable } from '@angular/core';
import { AngularFireDatabase,  AngularFireList} from 'angularfire2/database';

/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServiceProvider {

  private PATH = 'empresas';
  empresasList: AngularFireList<any[]>

  constructor(private db: AngularFireDatabase) {
  }

  getList(){
    this.empresasList = this.db.list(this.PATH);
    return this.empresasList;
  }

  get(key: string){
  }

}
