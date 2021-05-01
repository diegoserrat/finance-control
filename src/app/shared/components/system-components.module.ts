import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsUserModule } from './cards/cards-user-module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [CardsUserModule, MenuModule],
})
export class SystemComponentsModule {}
