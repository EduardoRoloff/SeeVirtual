import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicosProvider } from '../../providers/servicos/servicos';

/**
 * Generated class for the FecharContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fechar-conta',
  templateUrl: 'fechar-conta.html',
})
export class FecharContaPage {

  pedidos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private servicos: ServicosProvider) {
  }

  ionViewDidLoad() {
  }

  listarPedidos() {
    this.pedidos = this.servicos.pedidoEmAndamento.itens;

    for (let i = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].quantidade) {

      }
    }
  }

  confirmarPagamentoCredito() {
    let confirm = this.alertCtrl.create({
      title: 'Valor: R$ 45,80',
      message: 'Deseja pagar esse valor no crédito?',
      buttons: [
        {text: 'Cancelar'},
        {text: 'Confimar'}
      ]
    });
    confirm.present();
  }

  confirmarPagamentoDebito() {
    let confirm = this.alertCtrl.create({
      title: 'Valor: R$ 45,80',
      message: 'Deseja pagar esse valor no débito?',
      buttons: [
        {text: 'Cancelar'},
        {text: 'Confimar'}
      ]
    });
    confirm.present();
  }

  confirmarPagamentoAVista() {
    let confirm = this.alertCtrl.create({
      title: 'Valor: R$ 45,80',
      message: 'Deseja pagar esse valor a vista?',
      buttons: [
        {text: 'Cancelar'},
        {text: 'Confimar'}
      ]
    });
    confirm.present();
  }

}
