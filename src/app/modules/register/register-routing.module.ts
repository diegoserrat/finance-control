import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';

const registerRoutes: Routes = [
  { path: '', component: RegisterComponent, data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forChild(registerRoutes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
