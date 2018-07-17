import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs"
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  box=1;
  back=0;
  signupReponse='';
  rForm: FormGroup;
  username: FormControl;
  password: FormControl;
  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.username = new FormControl('', [Validators.required, this.NoWhitespaceValidator]);
    this.password = new FormControl('', [Validators.required, this.NoWhitespaceValidator]);
    this.rForm = new FormGroup({
  		username: this.username,
      password: this.password
  	});
  }

  submit_form(get){
  	if(this.rForm.valid){
  		var username = get.username;
      var password = get.password;
      console.log(username+', '+password)
      //posting form
      const body =  {
    "username": username,
    "password": password}
    this.http.post("http://localhost:3000/signup", body).subscribe((result) => {
        if(result["result"]=="taken"){
          this.signupReponse="The User Name Is Taken";this.box=0;this.back=1;}
        if(result["result"]=="success"){
          this.signupReponse="Signup Suceeded!Welcome!";this.box=0;this.back=1;}
        });
  	}else{
  		this.username.markAsTouched();
  	}
  }


  public NoWhitespaceValidator(control: FormControl) {
    var valid = control.value.trim().length === 0;
    return !valid ? null : { 'whitespace': true }
  }

  goBack(){
   this.signupReponse=" ";this.box=1;this.back=0;
   }
}
