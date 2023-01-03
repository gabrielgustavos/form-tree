import { HomeComponent } from './pages/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
];

export const routing: ModuleWithProviders<any> =
  RouterModule.forRoot(APP_ROUTES);
