import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  login() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password).then(() => {
      this.showSuccessModal();
      this.email = '';
      this.password = '';
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  showSuccessModal() {
    const modalElement = document.getElementById('successModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  navigateToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
