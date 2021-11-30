import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinListPage } from './coin-list.page';

const routes: Routes = [
  {
    path: '',
    component: CoinListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoinListPageRoutingModule {}
