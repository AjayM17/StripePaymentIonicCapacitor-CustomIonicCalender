import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalaenderPageRoutingModule } from './calaender-routing.module';

import { CalaenderPage } from './calaender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalaenderPageRoutingModule
  ],
  declarations: [CalaenderPage]
})
export class CalaenderPageModule {}
