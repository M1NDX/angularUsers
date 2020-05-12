import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { UsersMainComponent } from './users/users-main/users-main.component';
// import { UserListComponent } from './users/users-main/user-list/user-list.component';
// import { UserDetailComponent } from './users/users-main/user-detail/user-detail.component';
// import { UserComponent } from './users/users-main/user-list/user/user.component';
// import { UserEditComponent } from './users/user-edit/user-edit.component';
// import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'google/redirect', component: LoginComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
