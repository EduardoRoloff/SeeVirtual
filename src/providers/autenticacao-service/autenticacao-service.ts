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

  logout(usuario: Usuario){
    return this.angularFireAuth.auth.signOut();
  }

}
