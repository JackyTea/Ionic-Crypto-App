import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesListPageRoutingModule } from './favourites-list-routing.module';

import { FavouritesListPage } from './favourites-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesListPageRoutingModule
  ],
  declarations: [FavouritesListPage]
})
export class FavouritesListPageModule {}
