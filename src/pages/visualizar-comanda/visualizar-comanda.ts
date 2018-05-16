import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { ItemPedido } from '../../models/itemPedido';
import { FecharContaPage } from '../fechar-conta/fechar-conta';

/**
 * Generated class for the VisualizarComandaPage page.
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
  selector: 'page-visualizar-comanda',
  templateUrl: 'visualizar-comanda.html',
})
export class VisualizarComandaPage {

  pedidos: any;

  comidas: Array<ItemPedido>;
  bebidas: Array<ItemPedido>;
  outros: Array<ItemPedido>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servicos: ServicosProvider) {

    this.comidas = new Array<ItemPedido>();
    this.bebidas = new Array<ItemPedido>();
    this.outros = new Array<ItemPedido>();
  }

  ionViewDidLoad() {
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidos = this.servicos.listaDaComanda;
      this.pedidos.forEach(element => {
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

  fecharConta() {
    this.navCtrl.push(FecharContaPage);
  }

}
