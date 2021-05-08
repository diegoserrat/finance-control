import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DebitsComponent } from './debits/debits.component';

const routes: Routes = [
  { path: '', component: DebitsComponent, data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebitsRoutingModule {}
