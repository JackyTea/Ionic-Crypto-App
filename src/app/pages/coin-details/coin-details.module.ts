import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoinDetailsPageRoutingModule } from './coin-details-routing.module';

import { CoinDetailsPage } from './coin-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CoinDetailsPageRoutingModule
  ],
  declarations: [CoinDetailsPage]
})
export class CoinDetailsPageModule {}
