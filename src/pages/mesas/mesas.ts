import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComandaPage } from '../comanda/comanda';
import { Empresa } from '../../models/empresa';
import { ServicosProvider } from '../../providers/servicos/servicos';

/**
 * Generated class for the MesasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mesas',
  templateUrl: 'mesas.html',
})
export class MesasPage {
  empresaSelecionada: Empresa;
  mesas: string[] = [];


  constructor(
    public navCtrl: NavController,  
    public navParams: NavParams,
    private servico: ServicosProvider
  ) {
    
    this.servico.empresaSelecionda;
    for (let index = 1; index <  this.servico.empresaSelecionda.quantidadeDeMesas; index++) {
      this.mesas.push(''+index);
    }
  }

  ionViewDidLoad() {
  }

  abrirComanda(mesa: string){
    this.servico.selecionarMesa(mesa);
    this.navCtrl.push(ComandaPage, {empresa: this.servico.empresaSelecionda.itens});
  }
  
}
