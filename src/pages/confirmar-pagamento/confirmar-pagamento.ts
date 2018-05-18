import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicosProvider } from '../../providers/servicos/servicos';

/**
 * Generated class for the ConfirmarPagamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmar-pagamento',
  templateUrl: 'confirmar-pagamento.html',
})
export class ConfirmarPagamentoPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private servico: ServicosProvider) {

      this.servico.pedidoEmAndamento.solicitacaoDeFechamento.pago;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmarPagamentoPage');
  }

}
