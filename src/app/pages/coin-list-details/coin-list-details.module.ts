import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoinListDetailsPageRoutingModule } from './coin-list-details-routing.module';

import { CoinListDetailsPage } from './coin-list-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoinListDetailsPageRoutingModule
  ],
  declarations: [CoinListDetailsPage]
})
export class CoinListDetailsPageModule {}
