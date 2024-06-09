import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  username: any
  constructor(private router: Router) {
    this.username = localStorage.getItem('username');
  }
  ngOnInit() {
  }
  logout() {
    // Clear user session
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/']);
    // Perform any other logout actions if needed, e.g., redirect to login page
  }
}
