import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicosProvider } from   '../../providers/servicos/servicos';
import { ItemPedido } from '../../models/itemPedido';
import { StatusPedidoPage } from '../status-pedido/status-pedido';

/**
 * Generated class for the ConfirmarPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const tipos = {
  COMIDA: 'comida',
  BEBIDA: 'bebida',
  OUTROS: 'outros',
}

@IonicPage()
@Component({
  selector: 'page-confirmar-pedido',
  templateUrl: 'confirmar-pedido.html',
})
export class ConfirmarPedidoPage {
  itemDoPedido: any;

  comidas: Array<ItemPedido>;
  bebidas: Array<ItemPedido>;
  outros: Array<ItemPedido>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private servicos: ServicosProvider) {

    this.comidas = new Array<ItemPedido>();
    this.bebidas = new Array<ItemPedido>();
    this.outros = new Array<ItemPedido>();
  }

  ionViewDidLoad() {
    this.listarPedidos();
  }

  listarPedidos() {
    this.itemDoPedido = this.servicos.pedidoEmAndamento.itens;

    this.itemDoPedido.forEach(element => {
      switch (element.item.tipo.toLowerCase()) {
        case tipos.COMIDA: 
          this.comidas.push(element);
          break;
        case tipos.BEBIDA:
          this.bebidas.push(element);
          break;
        case tipos.OUTROS: 
        default:
          this.outros.push(element);
      }
    });
  }

  enviarPedido() {
    this.servicos.inserirPedido();
    let alerta = this.alertCtrl.create({
      title: 'Pedido enviado com sucesso!',
      subTitle: 'Aguarde!',
      buttons: ['OK']
    });
    alerta.present();
    this.navCtrl.push(StatusPedidoPage);
  }

  // status(){
  //   this.navCtrl.push(StatusPedidoPage);
  // }
}
