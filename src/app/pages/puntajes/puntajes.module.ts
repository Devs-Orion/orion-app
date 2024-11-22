import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntajesPageRoutingModule } from './puntajes-routing.module';

import { PuntajesPage } from './puntajes.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntajesPageRoutingModule,
    ComponentesModule
  ],
  declarations: [PuntajesPage]
})
export class PuntajesPageModule { }
