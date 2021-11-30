import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoinListPageRoutingModule } from './coin-list-routing.module';

import { CoinListPage } from './coin-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoinListPageRoutingModule
  ],
  declarations: [CoinListPage]
})
export class CoinListPageModule {}
