import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersMainComponent } from './users-main/users-main.component';
import { AuthGuardService } from '../auth-guard.service';
import { UserListComponent } from './users-main/user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './users-main/user-detail/user-detail.component';


const routes: Routes = [

   {path: 'users', component: UsersMainComponent, canActivate: [AuthGuardService],
    children:[
      {path: '', component: UserListComponent},
      {path: 'new', component: UserEditComponent},
      {path: ':id', component: UserDetailComponent},
      {path: ':id/edit', component: UserEditComponent}
    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
