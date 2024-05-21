import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.register(this.email, this.password).then(() => {
      this.showSuccessModal();
      this.email = '';
      this.password = '';
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });

  }

  showSuccessModal() {
    const modalElement = document.getElementById('successModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
