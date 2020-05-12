import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsersMainComponent } from './users-main/users-main.component';
import { UserListComponent } from './users-main/user-list/user-list.component';
import { UserComponent } from './users-main/user-list/user/user.component';
import { UserDetailComponent } from './users-main/user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [
    UsersMainComponent,
    UserListComponent,
    UserComponent,
    UserDetailComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }
