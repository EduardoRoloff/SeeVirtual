import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Empresa } from './models/empresa.model';

/**
 * Generated class for the CadastroEmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-empresa',
  templateUrl: 'cadastro-empresa.html',
})
export class CadastroEmpresaPage {

  empresas: AngularFireList<any>;
  empresaSelecionada: Empresa = new Empresa();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private firebase: AngularFireDatabase) {
       

  }
  obterTodos(){
    this.empresas = this.firebase.list('empresas');
    return this.empresas;
  }



  





  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroEmpresaPage');
  }

}
