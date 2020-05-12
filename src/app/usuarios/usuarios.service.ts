import { Injectable } from '@angular/core';
import { Usuario } from './Usuario';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  users: Usuario[];

  usersSubject = new BehaviorSubject<Usuario[]>([]);

  
    constructor(private http: HttpClient) {
        this.users = [
          new Usuario("abc","123","Jalisco",["nadar","futbol"]),
          new Usuario("pae","sdfasd","Aguascalientes",["leer","música"] )
      ];
        this.usersSubject.next(this.getUsers());
        this.loadUsers();
    }

    loadUsers() {
      this.http.get('http://localhost:3000/api/users').subscribe(
        (data: Usuario[])=> {
          this.users = data;
          this.usersSubject.next(this.getUsers())
        },
        (err)=> console.log(err)
      )
    }

    addUser(user): Observable<any> {
      //this.users.push(user);
      return this.http.post('http://localhost:3000/api/users', user);
    }

    getUsers():Usuario[] {
      return this.users.slice();
    }

    updateUser(pos, pass){
      this.users[pos].pass = pass;
    }

}
