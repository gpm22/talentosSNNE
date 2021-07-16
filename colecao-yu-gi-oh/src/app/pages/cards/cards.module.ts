import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { CardsFormComponent } from './modals/cards-form/cards-form.component';
import { CardsDeleteComponent } from './modals/cards-delete/cards-delete.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardsComponent,
    CardsFormComponent,
    CardsDeleteComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    SharingModule,
    ReactiveFormsModule
  ]
})
export class CardsModule { }
