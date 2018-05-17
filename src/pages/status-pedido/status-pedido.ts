import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ComandaPage } from '../comanda/comanda';
import { VisualizarComandaPage } from '../visualizar-comanda/visualizar-comanda';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { MesasPage } from '../mesas/mesas';

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

  pedidoEmAberto: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public servicos: ServicosProvider) {
  }

  ionViewDidLoad() {
  }

  fazerNovoPedido(){
    if(this.servicos.pedidoEmAndamento.mesa || this.servicos.mesaSelecionada){
      this.navCtrl.push(ComandaPage);
    }else{
      this.navCtrl.push(MesasPage);
    }
  }

  visualizarComanda(){
    this.navCtrl.push(VisualizarComandaPage);
  }
}
