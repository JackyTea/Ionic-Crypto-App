import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'coin-list',
    loadChildren: () => import('./pages/coin-list/coin-list.module').then(m => m.CoinListPageModule)
  },
  {
    path: 'coin-list-details/:id',
    loadChildren: () => import('./pages/coin-list-details/coin-list-details.module').then(m => m.CoinListDetailsPageModule)
  },
  {
    path: 'favourites-list',
    loadChildren: () => import('./pages/favourites-list/favourites-list.module').then(m => m.FavouritesListPageModule)
  },
  {
    path: 'favourites-list-details',
    loadChildren: () => import('./pages/favourites-list-details/favourites-list-details.module')
      .then(m => m.FavouritesListDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
