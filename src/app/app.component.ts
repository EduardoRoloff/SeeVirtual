import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AutenticacaoServiceProvider } from '../providers/autenticacao-service/autenticacao-service';
import { StatusPedidoPage } from '../pages/status-pedido/status-pedido';
import { ServicosProvider } from '../providers/servicos/servicos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any;
  
  paginas: Array<{titulo: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    afAuth: AngularFireAuth, 
    private autenticacaoService: AutenticacaoServiceProvider,
    private servicos: ServicosProvider) {
    
    const authObserver = afAuth.authState.subscribe(usuario => {
      if (usuario) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    })

    this.paginas = [
      // { titulo: 'Home', component: HomePage },
      { titulo: 'Status do Pedido', component: StatusPedidoPage },
    ];
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  logout(){
    this.autenticacaoService.logout()
     .then(() =>{
       this.nav.setRoot(LoginPage);
     })
     .catch((error) => {
       console.error(error)
     })
  }

  abrirPaginas(page) {
    this.nav.setRoot(page.component);
  }

  abrirHome(){
    this.nav.setRoot(HomePage);
  }
}
