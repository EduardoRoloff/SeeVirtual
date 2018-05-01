import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from './usuario';

/*
  Generated class for the AutenticacaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacaoServiceProvider {

  private usuario: Usuario;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.usuario = new Usuario();
    this.statusDoUsuario();
  }

  obterUsuarioLogado() {
    return this.usuario;
  }

  criarUsuario(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((usuario) => {
          resolve(usuario);
        })
    })
  }

  logar(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha)
        .then((usuario) => {
          resolve(usuario);
        })
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
      this.usuario.email = usuario.email;
      console.log(usuario);
      
    });
  }
}
