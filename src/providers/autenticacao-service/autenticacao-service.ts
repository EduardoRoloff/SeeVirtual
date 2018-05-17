import { Cliente } from './../../models/cliente';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from './usuario';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the AutenticacaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacaoServiceProvider {

  clientesList: any;
  clienteLogado: Cliente;
  private CLIENTES = 'clientes';
  private usuario: Usuario;

  constructor(private angularFireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private toastCtrl: ToastController) {

    this.clientesList = this.db.list(this.CLIENTES);
    this.usuario = new Usuario();
    this.statusDoUsuario();
  }

  obterUsuarioLogado(emailLogado: string) {

    let list = Array<Cliente>();
    list = [];

    this.db.database
      .ref(this.CLIENTES)
      .orderByChild('usuario')
      .equalTo(emailLogado).on("child_added", (snapshot) => {
        let item = snapshot.val();
        item.$key = snapshot.key;
        list.push(item as Cliente)
        this.clienteLogado = list[0];
      });

  }

  criarUsuario(usuario: Usuario) {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((usuario) => {
          this.salvarCliente(usuario.email)
          resolve(usuario);
        }).catch((error: any) => {

          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
        })
        toast.present();
    })
  }

  logar(usuario: Usuario) {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha)
        .then((usuario) => {
          resolve(usuario);
        }).catch((error: any) => {

          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
        })
      toast.present();
    })

  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }

  resetarSenha(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  statusDoUsuario() {
    this.angularFireAuth.auth.onAuthStateChanged(usuario => {
      if (usuario) {
        console.log(usuario);
        this.usuario.email = usuario.email;
        this.obterUsuarioLogado(usuario.email);
      }
    });
  }
  salvarCliente(email: string): any {
    this.clientesList.push({
      usuario: email
    })
  }
}
