import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  issignup :Boolean=false;
  isslider :Boolean=true;
  constructor() { }

  ngOnInit() {
  }
  switchToSignup(){
    this.issignup=true;
    this.isslider=false;
  }
}
