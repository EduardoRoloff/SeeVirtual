import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../providers/autenticacao-service/usuario';
import { NgForm } from '@angular/forms';
import { CriarContaPage } from '../criar-conta/criar-conta';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario: Usuario = new Usuario();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  criarConta(){
    this.navCtrl.push(CriarContaPage);
  }

}
