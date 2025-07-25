import { Routes } from '@angular/router';

export const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
  {path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)},
  {path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)},
  {path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent)}

];
