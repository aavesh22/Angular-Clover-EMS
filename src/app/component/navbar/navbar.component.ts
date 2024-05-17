import { Component, Input } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth: AuthService) {

  }

  toggleSearch(event: Event) {
    event.preventDefault();
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
    let table = document.getElementsByClassName('table')
    table[0].classList.toggle('table-dark')
  }

  logout() {
    this.auth.logout();
  }
}
