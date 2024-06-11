import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router, private fireauth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      return Promise.resolve();
    }).catch(err => {
      return Promise.reject(err);
    });
  }

  register(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      return Promise.resolve();
    }, err => {
      return Promise.reject(err);
    });
  }
  
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      // this.isAuthenticated = false;
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
  }
}
