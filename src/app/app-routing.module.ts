import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutesEnum } from './shared/models/enums/routes.enum';

const routes: Routes = [
  {
    path: `${RoutesEnum.home}`,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: `${RoutesEnum.register}`,
    loadChildren: () =>
      import('./modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
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
