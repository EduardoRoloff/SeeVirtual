import { ConfirmarPagamentoPageModule } from './../pages/confirmar-pagamento/confirmar-pagamento.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CriarContaPage } from '../pages/criar-conta/criar-conta';
import { ResetarSenhaPage } from '../pages/resetar-senha/resetar-senha';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MesasPageModule } from '../pages/mesas/mesas.module';
import { IntroPageModule } from '../pages/intro/intro.module';
import { ComandaPageModule } from '../pages/comanda/comanda.module';

import { ComandaServiceProvider } from '../providers/comanda-service/comanda-service';
import { ServicosProvider } from '../providers/servicos/servicos';
import { AutenticacaoServiceProvider } from '../providers/autenticacao-service/autenticacao-service';

import { environment } from '../environments/environment';
import { ConfirmarPedidoPageModule } from '../pages/confirmar-pedido/confirmar-pedido.module';
import { StatusPedidoPageModule } from '../pages/status-pedido/status-pedido.module';
import { StatusPedidoPage } from '../pages/status-pedido/status-pedido';
import { VisualizarComandaPageModule } from '../pages/visualizar-comanda/visualizar-comanda.module';
import { FecharContaPageModule } from '../pages/fechar-conta/fechar-conta.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CriarContaPage,
    ResetarSenhaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MesasPageModule,
    IntroPageModule,
    ComandaPageModule,
    ConfirmarPedidoPageModule,
    StatusPedidoPageModule,
    VisualizarComandaPageModule,
    FecharContaPageModule,
    ConfirmarPagamentoPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CriarContaPage,
    ResetarSenhaPage,
    StatusPedidoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ComandaServiceProvider,
    ServicosProvider,
    AutenticacaoServiceProvider
  ]
})
export class AppModule { }