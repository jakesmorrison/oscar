import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';

import { AppComponent } from './app.component';

// Components
import { MainComponent } from './components/main/main.component'
import { LoginComponent } from './components/login/login.component'

// Services
import { DataService } from './services/data.service'

// 3rd Party

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [DataService],
})
export class AppModule {
  constructor(router: Router) {}
}


