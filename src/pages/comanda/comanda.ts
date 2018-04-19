import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Item } from 'ionic-angular';
import { Entity } from '../../app/models/entity';

/**
 * Generated class for the ComandaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comanda',
  templateUrl: 'comanda.html',
})
export class ComandaPage {
  empresa: Entity;
  itensDaTela: Array<Item>[];
  comanda: string = "comidas";
  isAndroid: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform) {
    this.isAndroid = platform.is('android');

    this.empresa = navParams.data.empresa;
  }

  ngOnInit() {


    this.itensDaTela = [];
    for (let index = 0; index < 14; index++) {
      this.itensDaTela.push(this.empresa.itens[index]);
      console.log(this.empresa.itens[index]);
    }
  }
}


