import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  isLoggedIn: any;
  token: any;

  constructor(private storage: Storage,
    private env: EnvService,
    private http: HttpClient) { }


  login(email: String, password: String) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(this.env.API_URL + 'login',
      { email: email, password: password }, { headers: headers }
    ).pipe(
      tap(user => {
        console.log(user);
        this.storage.set('user', user)
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
        this.currentUser = user;
        this.isLoggedIn = true;
        return user;
      }),
    );
  }

  register(name: String, email: String, password: String, c_password: String) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(this.env.API_URL + 'register',
      {name: name, email: email, password: password, c_password: c_password}, {headers: headers}
    )
  }

  getToken() {
    return this.storage.get('user').then(
      data => {
        this.currentUser = data;
        if(this.currentUser != null) {
          this.isLoggedIn=true;
          this.token = data['success']['token'];
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.currentUser = null;
        this.isLoggedIn=false;
      }
    );
  }
  

}