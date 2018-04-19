import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AutenticacaoServiceProvider } from '../../providers/autenticacao-service/autenticacao-service';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the ResetarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetar-senha',
  templateUrl: 'resetar-senha.html',
})
export class ResetarSenhaPage {

  usuarioEmail: string = '';
  @ViewChild('form') form: NgForm; //Recebe os dados do formulário

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private autenticacaoService: AutenticacaoServiceProvider) {
  }

  resetarSenha(){
    if (this.form.form.valid) {

      let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'})
      this.autenticacaoService.resetarSenha(this.usuarioEmail)
      .then(() =>{
        toast.setMessage('Solicitação foi enviada para seu e-mail');
        toast.present();

        this.navCtrl.pop();
      })
      .catch((error: any) => {
        if (error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/user-not-found') {
          toast.setMessage('O usuário não foi encontrado.');
        }
        toast.present();
      });
    }
  }

}
