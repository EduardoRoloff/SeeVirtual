import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComandaPage } from '../comanda/comanda';
import { Empresa } from '../../models/empresa';
import { Mesa } from '../../models/mesa';
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
  mesas: Mesa[] = [];


  constructor(
    public navCtrl: NavController,  
    public navParams: NavParams,
    private servico: ServicosProvider
  ) {
    
    this.mesas = new Array<Mesa>();
    this.servico.empresaSelecionda;
    for (let index = 0; index <  this.servico.empresaSelecionda.quantidadeDeMesas; index++) {
      var novaMesa = new Mesa();
      novaMesa.numero = ''+index;
      this.mesas.push(novaMesa);
      
    }
  }

  ionViewDidLoad() {
  }

  abrirComanda(mesa: Mesa){
    this.servico.selecionarMesa(mesa);
    this.navCtrl.push(ComandaPage, {empresa: this.servico.empresaSelecionda.itens});
  }
  
}
