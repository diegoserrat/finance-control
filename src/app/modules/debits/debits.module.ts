import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { DebitsComponent } from './debits/debits.component';
import { DebitsRoutingModule } from './debits-routing.module';

@NgModule({
  declarations: [DebitsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DebitsRoutingModule,
    MatInputModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DebitsModule {}
