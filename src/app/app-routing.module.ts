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
    path: 'favourites-list',
    loadChildren: () => import('./pages/favourites-list/favourites-list.module').then(m => m.FavouritesListPageModule)
  },
  {
    path: 'coin-details/:id',
    loadChildren: () => import('./pages/coin-details/coin-details.module').then( m => m.CoinDetailsPageModule)
  },
  {
    path: 'favourites-details/:id',
    loadChildren: () => import('./pages/favourites-details/favourites-details.module').then( m => m.FavouritesDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
