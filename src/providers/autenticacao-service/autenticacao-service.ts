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

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  criarUsuario(usuario: Usuario){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  logar(usuario: Usuario){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }

  logout(){
    return this.angularFireAuth.auth.signOut();
  }

  resetarSenha(email: string){
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

}
