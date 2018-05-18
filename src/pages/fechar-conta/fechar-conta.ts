import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { SolicitacaoDeFechamento } from '../../models/solicitacao-de-fechamento';
import { ConfirmarPagamentoPage } from '../confirmar-pagamento/confirmar-pagamento';

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

      this.fechar()
    } catch (error) {
      alert(error);
    }

  }

  confirmarPagamentoDebito() {
    try {
      this.servicos.pedidoEmAndamento.solicitacaoDeFechamento.formaDePagamento = "debito";
      this.fechar();
    } catch (error) {
      alert(error);
    }
  }

  confirmarPagamentoAVista() {
    try {
      this.servicos.pedidoEmAndamento.solicitacaoDeFechamento.formaDePagamento = "avista";
      this.fechar();
    } catch (error) {
      alert(error);
    }
  }

  fechar() {

    this.servicos.somarConta();

    var total = "R$ " + this.servicos.pedidoEmAndamento.solicitacaoDeFechamento.valorTotal.toFixed(2).replace(".",",");

    let confirmacao = confirm('O total da sua conta é ' + total + '\n deseja fechar a conta?');

    if (confirmacao) {
      this.servicos.fecharConta();
      alert('Solicitação enviada, aguarde para efetuar o pagamento!')
    }

  }

  liberar(){
    this.navCtrl.push(ConfirmarPagamentoPage);
  }

}
