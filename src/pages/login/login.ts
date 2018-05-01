import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../providers/autenticacao-service/usuario';
import { NgForm } from '@angular/forms';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { AutenticacaoServiceProvider } from '../../providers/autenticacao-service/autenticacao-service';
import { HomePage } from '../home/home';
import { ResetarSenhaPage } from '../resetar-senha/resetar-senha';

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
    public navParams: NavParams,
    private autenticacaoService: AutenticacaoServiceProvider,
    private toastCtrl: ToastController) {
  }

  criarConta(){
    this.navCtrl.push(CriarContaPage);
  }

  esqueciMinhaSenha(){
    this.navCtrl.push(ResetarSenhaPage);
  }

  logar(){
    if (this.form.form.valid) {
      this.autenticacaoService.logar(this.usuario)
        .then(() => {
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present(); //exibir mensagem
        });
    }
  }

}