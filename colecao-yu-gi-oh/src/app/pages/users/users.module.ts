import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { UserDeleteComponent } from './modals/user-delete/user-delete.component';
import { UserFormComponent } from './modals/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    UserDeleteComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
