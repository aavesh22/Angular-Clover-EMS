import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
// import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // private isAuthenticated: boolean = false;

  constructor(private router: Router, private fireauth: AngularFireAuth) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
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

  // isAuthenticatedUser(): boolean {
  //     return this.isAuthenticated;
  // }

  // register method
  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration Successful');
      //   this.sendEmailForVerification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  //   // forgot password
  //   forgotPassword(email: string) {
  //     this.fireauth.sendPasswordResetEmail(email).then(() => {
  //       this.router.navigate(['/verify-email']);
  //     }, err => {
  //       alert('Something went wrong');
  //     })
  //   }

  //   // email Verification
  //   sendEmailForVerification(user: any) {
  //     console.log(user);
  //     user.sendEmailVerification().then((res: any) => {
  //       this.router.navigate(['/verify-email']);
  //     }, (err: any) => {
  //       alert('Something went wrong. Not able to send mail to your email.')
  //     })
  //   }

  //   //SigninwithGoogle
  //   googleSignIn() {
  //     return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res) => {
  //       this.router.navigate(['/dashboard']);
  //       localStorage.setItem('token', JSON.stringify(res.user?.uid));
  //     }, err => {
  //       alert(err.message);
  //     }
  //     )
  //   }
}