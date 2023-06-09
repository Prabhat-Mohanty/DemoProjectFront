import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogged!: boolean;
  isAdmin!: string;
  userEmail!: string;

  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.auth.isLogged.subscribe((res) => {
      this.isLogged = res;
    });

    this.auth.isAdmin.subscribe((res) => {
      this.isAdmin = res;
    });

    this.auth.checkLoggedInEmail.subscribe((res) => {
      this.userEmail = res;
    });
  }

  logout() {
    this.auth.logout();
    this.auth.isLogged.next(false);
    localStorage.removeItem('role');
    this.router.navigate(['/signin']);
  }
}
