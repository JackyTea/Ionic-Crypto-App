import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinListDetailsPage } from './coin-list-details.page';

const routes: Routes = [
  {
    path: '',
    component: CoinListDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoinListDetailsPageRoutingModule {}
