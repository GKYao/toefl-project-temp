import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'lists',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  text = "";
  count=1;
  data = " ";
  currentUser='';
  translation='';
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    // Make get request fetch data
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
      var body={"username":this.currentUser};
      this.http.post("/userpage/",body).subscribe(data => {
        this.count=data['page'];
        var url = "/api/reading/"+this.count;
        this.http.post(url,body).subscribe(data => {
          this.data=JSON.stringify(data['article']);
          this.data=this.data.replace(/\\n/g, '<br>');
          this.data = this.data.substring(1,(this.data.length-1));
        });
      });

    }
    else{this.data="PLEASE LOG IN";}
  }

  // nextArticle(){
  //   this.count += 1;
  //   var url = "/api/reading/"+this.count;
  //   // Make get request fetch data
  //   this.http.get(url).subscribe(data => {
  //       this.data=JSON.stringify(data['article']);
  //       this.data=this.data.replace(/\\n/g, '<br>');
  //       this.data = this.data.substring(1,(this.data.length-1));
  //   });
  // }
  nextArticle(){
     this.count += 1;
    var url = "/api/reading/"+this.count;
    // Make get request fetch data
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
      var body={"username":this.currentUser};
      this.http.post(url,body).subscribe(data => {
        this.data=JSON.stringify(data['article']);
        this.data=this.data.replace(/\\n/g, '<br>');
        this.data = this.data.substring(1,(this.data.length-1));
      });
    }
  }
  lastArticle(){
    if(this.count!=1){
     this.count -= 1;}
    var url = "/api/reading/"+this.count;
    // Make get request fetch data
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
      var body={"username":this.currentUser};
      this.http.post(url,body).subscribe(data => {
        this.data=JSON.stringify(data['article']);
        this.data=this.data.replace(/\\n/g, '<br>');
        this.data = this.data.substring(1,(this.data.length-1));
      });
    }
  }

  getSelectedText() {
    if (window.getSelection) {
        this.text = window.getSelection().toString();
    }
        return this.text;
    }

    saveSelectedText() {
      var selectedText = this.getSelectedText();
      if(selectedText&&localStorage.getItem('currentUser')){
        if (selectedText.replace(/\s/g, '').length) {
          if (selectedText&&selectedText!="") {
          this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
          var body={
            "username":this.currentUser,
            "word":this.text
          }
          this.http.post("http://localhost:3000/word", body).subscribe((result) => {

         });
        this.http.post("http://localhost:3000/translate", body).subscribe((result) => {

        });
      }
    }
  }
          return this.text;
      }

    sendTranslate() {
      if (window.getSelection) {
          this.text = window.getSelection().toString();
          this.translation='';
      }
        var selectedText = this.getSelectedText();
        if(selectedText){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
      var body={
        "username":this.currentUser,
        "word":this.text
      }
      this.http.post("http://localhost:3000/translate", body).subscribe((result) => {
        this.translation=result["result"];
          });
        }
      }

      onMousemove(event: MouseEvent): void  {
        var selectedText = this.getSelectedText();
        if (selectedText.replace(/\s/g, '').length) {
        if (selectedText&&selectedText!="") {
          $('#infoDiv').css('display', 'block');
          $('#infoDiv').css('position', 'absolute');
          $('#infoDiv').css('left', event.pageX );
          $('#infoDiv').css('top', event.pageY );
        } else {
          $('#infoDiv').css('display', 'none');
          };
        }
        else{  $('#infoDiv').css('display', 'none');}
      }
}
