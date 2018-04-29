import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Item } from '../../models/item';
import { Empresa } from '../../models/empresa';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { ItemPedido } from '../../models/itemPedido';
import { Pedido } from '../../models/pedido';
import { AutenticacaoServiceProvider } from '../../providers/autenticacao-service/autenticacao-service';
import { ConfirmarPedidoPage } from '../confirmar-pedido/confirmar-pedido';

/**
 * Generated class for the ComandaPage page.
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
  selector: 'page-comanda',
  templateUrl: 'comanda.html',
})
export class ComandaPage {

  empresaSelecionada: Empresa;
  itensDoPedidos: Array<ItemPedido>;
  comidas: Array<ItemPedido>;
  bebidas: Array<ItemPedido>;
  outros: Array<ItemPedido>;
  comanda: string = "comidas";
  isAndroid: boolean = false;
  qtdItens = 0;
  selecionado = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private servicos: ServicosProvider,
    private autenticacaoService: AutenticacaoServiceProvider) {

    this.isAndroid = platform.is('android');
    this.empresaSelecionada = this.servicos.empresaSelecionda;

    this.comidas = new Array<ItemPedido>();
    this.bebidas = new Array<ItemPedido>();
    this.outros = new Array<ItemPedido>();
    this.itensDoPedidos = new Array<ItemPedido>();
  }

  ngOnInit() {
    this.servicos.empresaSelecionda.itens.forEach((item: Item) => {
      let itemPedido = new ItemPedido();

      itemPedido.item = item;
      itemPedido.antendido = false;
      itemPedido.quantidade = 0;
      itemPedido.observacao = '';

      if (itemPedido.item.status) {
        switch (itemPedido.item.tipo.toLowerCase()) {
          case tipos.COMIDA:
            this.comidas.push(itemPedido);
            break;
          case tipos.BEBIDA:
            this.bebidas.push(itemPedido); 
            break;
          case tipos.OUTROS:
          default:
            this.outros.push(itemPedido);
        }
      }
    })
  }

  selecionarItem(itemPedido: ItemPedido) {
    if (!itemPedido)
      return;

    if (itemPedido.escolhido) {
      this.adicionarMaisItem(itemPedido)
      return
    }
    this.zerarQuatidade(itemPedido)
  }

  zerarQuatidade(itemSelecionado: ItemPedido) {
    itemSelecionado.quantidade = 0;
  }

  adicionarMaisItem(itemPedido: ItemPedido) {
    if (itemPedido.escolhido) {
      itemPedido.quantidade++;
      return;
    }
  }

  confirmarPedido() {
    let pedido = new Pedido();
    if (!this.servicos.mesaSelecionada.pedidos) {
      this.servicos.mesaSelecionada.pedidos = [];
    }
    pedido.itens = [];

    pedido.itens = [
      ...this.comidas,
      ...this.bebidas,
      ...this.outros
    ].filter(i => i.escolhido);

    pedido.emailDoCliente = this.autenticacaoService.obterUsuarioLogado().email;
    pedido.horaDoPedido = new Date();
    pedido.pedidoEmAberto = true;
    this.servicos.mesaSelecionada.pedidos.push(pedido);
    this.navCtrl.push(ConfirmarPedidoPage);
    // this.servicos.alterarMesa(this.servicos.mesaSelecionada);
  }
}