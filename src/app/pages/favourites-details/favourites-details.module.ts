import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesDetailsPageRoutingModule } from './favourites-details-routing.module';

import { FavouritesDetailsPage } from './favourites-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesDetailsPageRoutingModule
  ],
  declarations: [FavouritesDetailsPage]
})
export class FavouritesDetailsPageModule {}
