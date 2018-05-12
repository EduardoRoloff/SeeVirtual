import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { SolicitacaoDeFechamento } from '../../models/solicitacao-de-fechamento';

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

      this.validarEstancia();
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

  private validarEstancia() {
    if (!this.servicos.pedidoEmAndamento.solicitacaoDeFechamento) {
      this.servicos.pedidoEmAndamento.solicitacaoDeFechamento = new SolicitacaoDeFechamento();
    }
  }
  

  confirmarPagamentoCredito() {
    try {
      this.servicos.pedidoEmAndamento.solicitacaoDeFechamento.formaDePagamento = "credito";
      this.servicos.fecharConta();
    } catch (error) {
      alert(error);
    }

  }

  confirmarPagamentoDebito() {
    try {
      this.servicos.pedidoEmAndamento.solicitacaoDeFechamento.formaDePagamento = "debito";
      this.servicos.fecharConta();
    } catch (error) {
      alert(error);
    }
  }

  confirmarPagamentoAVista() {
    try {
      this.servicos.pedidoEmAndamento.solicitacaoDeFechamento.formaDePagamento = "avista";
      this.servicos.fecharConta();
    } catch (error) {
      alert(error);
    }
  }

}
