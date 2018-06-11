import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { Empresa } from '../../models/empresa';
import { MesasPage } from '../mesas/mesas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  empresasList: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private servicos: ServicosProvider) {
  }

  ngOnInit(){
    var empresa = this.servicos.getList();
    empresa.snapshotChanges().subscribe(item => {
      this.servicos.recarregarPedido();
      this.empresasList = [];
      item.forEach(element => {
        var empresaListada = element.payload.toJSON();
        empresaListada["$key"] = element.key;
        this.empresasList.push(empresaListada as Empresa);
      })
    })
  }

  abrirComanda(empresa){
    this.servicos.buscarEmpresaSelecionada(empresa);
    if(this.servicos.empresaSelecionda.valoresAdicionais){
      alert('Este estabelecimento possue valores adicionais a serem somados na sua conta!')
    }
    this.navCtrl.push(MesasPage);
  }
  
}
