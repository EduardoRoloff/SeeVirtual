import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MesasPageModule } from '../pages/mesas/mesas.module';
import { IntroPageModule } from '../pages/intro/intro.module';
import { ComandaPageModule } from '../pages/comanda/comanda.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MesasPageModule,
    IntroPageModule,
    ComandaPageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAHubPzRwdtsZ2bGeVGyU3BfAhKqt0M2XY",
      authDomain: "seevirtualapp.firebaseapp.com",
      databaseURL: "https://seevirtualapp.firebaseio.com",
      projectId: "seevirtualapp",
      storageBucket: "seevirtualapp.appspot.com",
      messagingSenderId: "1004474068785"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }