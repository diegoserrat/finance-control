import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const clientRoutes: Routes = [
  { path: '', component: LoginComponent, data: { preload: true } },
  { path: ':id', component: LoginComponent, data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
