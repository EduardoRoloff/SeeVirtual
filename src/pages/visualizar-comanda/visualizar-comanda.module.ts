import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizarComandaPage } from './visualizar-comanda';

@NgModule({
  declarations: [
    VisualizarComandaPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizarComandaPage),
  ],
})
export class VisualizarComandaPageModule {}
