import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ComandaPage } from '../comanda/comanda';
import { VisualizarComandaPage } from '../visualizar-comanda/visualizar-comanda';

/**
 * Generated class for the StatusPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status-pedido',
  templateUrl: 'status-pedido.html',
})
export class StatusPedidoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    
  }

  fazerNovoPedido(){
    this.navCtrl.push(ComandaPage);
  }

  visualizarComanda(){
    this.navCtrl.push(VisualizarComandaPage);
  }
}
