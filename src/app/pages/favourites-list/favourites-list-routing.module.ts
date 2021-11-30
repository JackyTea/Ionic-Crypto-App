import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouritesListPage } from './favourites-list.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritesListPageRoutingModule {}
