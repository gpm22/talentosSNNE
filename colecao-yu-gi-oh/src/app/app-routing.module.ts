import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GateGuardian } from './guards/guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'cards', 
    loadChildren: () => import('./pages/cards/cards.module').then(m => m.CardsModule),
    canActivate: [GateGuardian]
  },
  { 
    path: 'users', 
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canActivate: [GateGuardian] 
  },
  { 
    path: 'unauthorized', 
    loadChildren: () => import('./pages/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule) 
  },
  { 
    path: '**', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
