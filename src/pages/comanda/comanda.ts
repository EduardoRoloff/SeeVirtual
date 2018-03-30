import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComandaServiceProvider } from '../../providers/comanda-service/comanda-service';

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
  // information: any[];
  title: string;
  form: FormGroup;
  comanda: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams) {
  }
  

  // toggleSection(i) {
  //   this.information[i].open = !this.information[i].open;
  // }
 
  // toggleItem(i, j) {
  //   this.information[i].children[j].open = !this.information[i].children[j].open;
  // }
}
