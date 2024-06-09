import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
    { username: 'user3', password: 'pass3' }
  ];

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor() { }

  isAuthenticated(): boolean {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return this.validateUser(username, password);
  }

  validateUser(username: string | null, password: string | null): boolean {
    if (!username || !password) {
      return false;
    }
    return this.users.some(user => user.username === username && user.password === password);
  }

  login(username: string, password: string): boolean {
    if (this.validateUser(username, password)) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      this.authStatus.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.authStatus.next(false);
  }
}
