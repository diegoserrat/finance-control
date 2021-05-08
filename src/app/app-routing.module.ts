import { AuthGuard } from './core/helpers/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { RoutesEnum } from './shared/models/enums/routes.enum';

const routes: Routes = [
  {
    path: `${RoutesEnum.home}`,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: `${RoutesEnum.register}`,
    loadChildren: () =>
      import('./modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: `${RoutesEnum.debits}`,
    loadChildren: () =>
      import('./modules/debits/debits.module').then((m) => m.DebitsModule),
  },
  {
    path: `${RoutesEnum.login}`,
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  { path: '', redirectTo: `${RoutesEnum.login}`, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
