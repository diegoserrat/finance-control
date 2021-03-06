import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { CardsHomeDebitsComponent } from './cards-home-debits/cards-home-debits.component';
import { CardsUserComponent } from './cards-client/cards-user.component';

@NgModule({
  declarations: [CardsUserComponent, CardsHomeDebitsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [CardsUserComponent, CardsHomeDebitsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardsUserModule {}
