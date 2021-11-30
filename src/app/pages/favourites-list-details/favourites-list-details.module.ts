import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesListDetailsPageRoutingModule } from './favourites-list-details-routing.module';

import { FavouritesListDetailsPage } from './favourites-list-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesListDetailsPageRoutingModule
  ],
  declarations: [FavouritesListDetailsPage]
})
export class FavouritesListDetailsPageModule {}
