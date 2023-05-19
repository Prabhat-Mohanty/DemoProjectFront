import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { SigninComponent } from './components/signin/signin.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { UserComponent } from './components/home/user/user.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryComponent } from './components/category/category.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UserPasswordResetComponent } from './components/user-password-reset/user-password-reset.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookOrderedComponent } from './components/book-ordered/book-ordered.component';
import { SigninModalComponent } from './components/signin-modal/signin-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AddauthorComponent } from './components/addauthor/addauthor.component';
import { AddpublisherComponent } from './components/addpublisher/addpublisher.component';
import { GetallbooksComponent } from './components/getallbooks/getallbooks.component';
import { GetallRequestComponent } from './components/getall-request/getall-request.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AdminDashBoardComponent } from './components/dashboard/admin-dash-board/admin-dash-board.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    FooterComponent,
    SigninComponent,
    GalleryComponent,
    PageNotFoundComponent,
    ContactusComponent,
    AboutusComponent,
    UserComponent,
    PrivacyComponent,
    CategoryComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    UserPasswordResetComponent,
    BookDetailComponent,
    BookOrderedComponent,
    SigninModalComponent,
    UpdateProfileComponent,
    AddbookComponent,
    AddauthorComponent,
    AddpublisherComponent,
    GetallbooksComponent,
    GetallRequestComponent,
    PricingComponent,
    TermsAndConditionsComponent,
    ConfirmDialogComponent,
    ContactDetailsComponent,
    UserDetailsComponent,
    AdminDashBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forRoot([]),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      disableTimeOut: false,
      timeOut: 4500,
      progressBar: true,
      positionClass: 'toast-top-right',
    }), // ToastrModule added
    CarouselModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
