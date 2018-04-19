import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ComandaPage } from '../comanda/comanda';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { Entity } from '../../app/models/entity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  empresasList: Entity[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private homeService: HomeServiceProvider) {
  }

  ngOnInit(){
    var empresa = this.homeService.getList();
    empresa.snapshotChanges().subscribe(item => {
      this.empresasList = [];
      item.forEach(element => {
        var empresaListada = element.payload.toJSON();
        empresaListada["$key"] = element.key;
        this.empresasList.push(empresaListada as Entity);
      })
    })
  }

  abrirComanda(empresa){
    this.navCtrl.push(ComandaPage, {empresa: empresa});
  }


  getEmpresas(ev) {
    // Reset items back to all of the items
    this.homeService.getList();

    //set val to the value of the ev target
    var val = ev.target.value;

    //if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.empresasList = this.empresasList.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }
}
