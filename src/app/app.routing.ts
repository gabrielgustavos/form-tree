import { HomeComponent } from './pages/home/home.component';

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES)