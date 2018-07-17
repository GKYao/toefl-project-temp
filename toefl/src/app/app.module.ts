import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
declare var jquery:any;
declare var $ :any;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    SignupComponent,
    ProfileComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'abgular 4 with jquery';
    toggleTitle(){
      $('.title').slideToggle(); //
    }
}
