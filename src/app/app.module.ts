import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule} from '@angular/common/http';

import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const config: SocketIoConfig = { url: environment.url , options: {}}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    UsuariosModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
