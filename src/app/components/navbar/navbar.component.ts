import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: any;
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
    this.authSubscription = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      if (status) {
        this.username = localStorage.getItem('username');
      } else {
        this.username = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
