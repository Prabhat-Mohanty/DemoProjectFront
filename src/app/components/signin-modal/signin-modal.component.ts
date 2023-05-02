import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.css'],
})
export class SigninModalComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.isVisible.next(true);
  }
  ngOnDestroy(): void {
    this.auth.isVisible.next(false);
  }
}
