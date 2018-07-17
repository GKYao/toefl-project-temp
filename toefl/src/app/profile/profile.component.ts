import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions } from "@angular/http";
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser='';
  result='';
  items: string[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    if(localStorage.getItem('currentUser')){
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));}
  }
  parseObject(obj){
     for(var key in obj)
     {
         this.items.push(obj[key]);
     }
  }
  getVocab(){
    var body={"username":this.currentUser,}
    this.http.post("http://localhost:3000/vocab", body).subscribe((result) => {
        this.result=JSON.stringify(result);
        for(var key in result){
        this.parseObject(result[key]);}
    });
  }
}
