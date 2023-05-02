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
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.auth.isLogged.subscribe((res) => {
      this.isLogged = res;
    });
  }

  logout() {
    this.auth.logout();
    this.auth.isLogged.next(false);
    this.router.navigate(['/signin']);
  }
}
