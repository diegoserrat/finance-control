import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';

const clientRoutes: Routes = [
  { path: '', component: RegisterComponent, data: { preload: true } },
  { path: ':id', component: RegisterComponent, data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
