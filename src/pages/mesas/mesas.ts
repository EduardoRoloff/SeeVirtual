import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComandaPage } from '../comanda/comanda';

/**
 * Generated class for the MesasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mesas',
  templateUrl: 'mesas.html',
})
export class MesasPage {
  public nome_usuario:string = "X-Tudo Código";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  public somaDoisNumeros(num1:number, num2:number): void{
    // alert(num1 + num2);
  }

  ionViewDidLoad() {
    // this.somaDoisNumeros(10, 90);
  }

  abrirComanda(){
    this.navCtrl.push(ComandaPage)
  }
}
