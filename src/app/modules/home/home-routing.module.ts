import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const clientRoutes: Routes = [
  { path: '', component: HomeComponent, data: { preload: true } },
  { path: ':id', component: HomeComponent, data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
