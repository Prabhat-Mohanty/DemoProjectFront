import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { UserComponent } from './components/home/user/user.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AuthGuard } from './auth/auth.guard';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { CategoryComponent } from './components/category/category.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UserPasswordResetComponent } from './components/user-password-reset/user-password-reset.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookOrderedComponent } from './components/book-ordered/book-ordered.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { SigninModalComponent } from './components/signin-modal/signin-modal.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'Admin',
    component: AdminComponent,
  },
  {
    path: 'modalsignin',
    component: SigninModalComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'contactus',
    component: ContactusComponent,
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
  },
  {
    path: 'gallery',
    canActivate: [AuthGuard],
    component: GalleryComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'category/:genre',
    component: CategoryComponent,
  },
  {
    path: 'bookdetails/:bid',
    canActivate: [AuthGuard],
    component: BookDetailComponent,
  },
  {
    path: 'updateprofile',
    canActivate: [AuthGuard],
    component: UpdateProfileComponent,
  },
  {
    path: 'bookOrdered',
    canActivate: [AuthGuard],
    component: BookOrderedComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'user-reset-password',
    canActivate: [AuthGuard],
    component: UserPasswordResetComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
