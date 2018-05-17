import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AutenticacaoServiceProvider } from '../../providers/autenticacao-service/autenticacao-service';
import { Usuario } from '../../providers/autenticacao-service/usuario';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';
import { Validacoes } from '../../providers/util/validacoes';

/**
 * Generated class for the CriarContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-conta',
  templateUrl: 'criar-conta.html',
})
export class CriarContaPage {
  usuario: Usuario = new Usuario();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private autenticacaoService: AutenticacaoServiceProvider) {
  }

  criarConta(){
    try {
      if (this.form.form.valid) {
        let toats = this.toastCtrl.create({duration: 3000, position: 'bottom'});

        let validacoes =  Validacoes.obterInstancia();
        validacoes.validarUsuario(this.usuario);
  
        this.autenticacaoService.criarUsuario(this.usuario)
          .then((usuario: any) =>{
            usuario.sendEmailVerification();
            toats.setMessage('Usuário criado com sucesso');
            toats.present();//EXIBIR O TOATS
  
            this.navCtrl.setRoot(HomePage);
          })
          .catch((error: any) => {
            if (error.code == 'auth/email-already-in-use') {
              toats.setMessage('O e-mail digitado já está em uso.');
            } else if (error.code == 'auth/invalid-email') {
              toats.setMessage('O e-mail digitado não é valido.');
            } else if (error.code == 'auth/operation-not-allowed') {
              toats.setMessage('Não está habilitado criar usuários.');
            } else if (error.code == 'auth/weak-password') {
              toats.setMessage('A senha digitada é muito fraca.');
            }
            toats.present();
          });
      }
    } catch (error) {
      alert(error)
    }
    
  }
}
