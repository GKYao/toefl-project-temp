import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions } from "@angular/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ishome :Boolean=true;
  islists: Boolean=false;
  isprofile :Boolean=false;
  logined :Boolean=false;
  rForm: FormGroup;
  username: FormControl;
  password: FormControl;
  loginResponse='';
  box:Boolean=!this.logined;
  back=0;
  currentUser='';
  constructor(private http: HttpClient) { }

  ngOnInit(){
    if(JSON.parse(localStorage.getItem('currentUser'))){
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));}
    if(this.currentUser.length){this.logined=true;this.box=!this.logined;}
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
    this.http.post("http://localhost:3000/login", body).subscribe((result) => {
        if(result["result"]=="nouser"){
            this.loginResponse='The User Doesn‘t Exist';this.box=false;this.back=1;}

        if(result["result"]=="wrong"){
            this.loginResponse='Wrong Password';this.box=false;this.back=1;}

        if(result["result"]=="success"){
            this.box=false;this.logined=true;
            localStorage.setItem('currentUser', JSON.stringify(username));
            this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
          }
          });
  	}else{
  		// username.markAsTouched();
  	}
  }
  switchToLists(){
    if(this.islists = true){
      this.islists = false;
    }
    this.ishome = false;
    this.isprofile=false;
    this.islists = true;
  }
  switchToHome(){
    this.ishome = true;
    this.islists = false;
    this.isprofile=false;
    window.location.reload();
  }

  switchToProfile(){
    this.ishome = false;
    this.islists = false;
    this.isprofile=true;
  }

  public NoWhitespaceValidator(control: FormControl) {
    var valid = control.value.trim().length === 0;
    return !valid ? null : { 'whitespace': true }
  }
  goBack(){
    this.loginResponse=" ";this.box=true;this.back=0;
   }

   logout() {
           localStorage.removeItem('currentUser');
           this.currentUser='';
           this.loginResponse='';
           this.logined=false;
           this.box=true;
           this.ishome = true;
           this.islists = false;
           this.isprofile=false;
       }



}
