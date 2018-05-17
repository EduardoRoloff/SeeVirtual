import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Empresa } from '../../models/empresa';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { ItemPedido } from '../../models/itemPedido';
import { AutenticacaoServiceProvider } from '../../providers/autenticacao-service/autenticacao-service';
import { ConfirmarPedidoPage } from '../confirmar-pedido/confirmar-pedido';


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
  algumItemSelecionado: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
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
    itemPedido.quantidade++;
    return;
  }

  confirmarPedido() {
    try {

      let itens = [
        ...this.comidas,
        ...this.bebidas,
        ...this.outros
      ].filter(i => i.escolhido);

      itens.forEach(element => {
        let itemJaExistente = false;
        if (this.servicos.pedidoEmAndamento.itens) {
          for (let i = 0; i < this.servicos.pedidoEmAndamento.itens.length; i++) {
            if (element.item.codigo == this.servicos.pedidoEmAndamento.itens[i].item.codigo) {
              if (!this.servicos.pedidoEmAndamento.itens[i].antendido) {
                this.servicos.pedidoEmAndamento.itens[i].quantidade = element.quantidade;
                itemJaExistente = true;
              }
            }
          }
        }

        if (!itemJaExistente)
          this.servicos.pedidoEmAndamento.itens.push(element);
      });


      if (this.servicos.pedidoEmAndamento.itens.length == 0) {
        let alerta = this.alertCtrl.create({
          title: 'Não foi selecionado nenhum item!',
          subTitle: 'Para continuar selecione alguns itens!',
          buttons: ['OK']
        });
        alerta.present();
        return;
      }

      this.servicos.pedidoEmAndamento.emailDoCliente = this.autenticacaoService.clienteLogado.usuario;
      this.servicos.pedidoEmAndamento.horaDoPedido = new Date();
      this.servicos.pedidoEmAndamento.mesa = this.servicos.pedidoEmAndamento.pedidoEmAberto ? this.servicos.pedidoEmAndamento.mesa : this.servicos.mesaSelecionada;
      this.servicos.pedidoEmAndamento.pedidoEmAberto = true;

      this.navCtrl.push(ConfirmarPedidoPage);
      // this.servicos.alterarMesa(this.servicos.mesaSelecionada);

    } catch (error) {
      alert(error)
      console.log(error);
    }
  }
}