import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ManuComponent } from './manu/manu.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [
    AppComponent,
    ManuComponent,
    HomeComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'lists', component: ListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
