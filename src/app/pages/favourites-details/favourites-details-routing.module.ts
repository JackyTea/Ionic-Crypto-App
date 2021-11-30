import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouritesDetailsPage } from './favourites-details.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritesDetailsPageRoutingModule {}
