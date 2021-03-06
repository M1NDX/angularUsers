import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token= "";
  logueado = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token:string){
    localStorage.setItem('token', token);
    this.token = token;
  }

  public isLoggedIn():boolean {
    const tokenData = this.getTokenData();
    console.log(tokenData);

    if(tokenData){
       let resp = tokenData.exp > Date.now() /1000;
       this.logueado.next(true);
       return resp;
    }else{
      this.logueado.next(false);
      return false;
    }

  }

  public getTokenData() {
    let payload;
    if(this.token){
      payload = this.token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }else{
      return null;
    }
  }

  public login(nombre: string, pass: string): Observable<any>{
    return this.http
               .post(environment.url+'/api/login', {nombre, pass})
               .pipe(
                 map((data:any)=>{
                  if(data.token){
                    this.saveToken(data.token);
                    this.isLoggedIn();
                  }
                  return data;
                 })
               )

  }

  public logout(){
    this.token ='';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this.logueado.next(false);
  }

  public googleLogin(params){
    return this.http.get(environment.url+'/api/google/redirect',{params})
        .pipe(
          map((data:any)=>{
          if(data.token){
            this.saveToken(data.token);
            this.isLoggedIn();
          }
          return data;
         })
        )

  }



}
