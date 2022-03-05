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

// Pipes
import { ObjectLengthPipe } from './components/pipe/object-length-pipe';

// 3rd Party
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    ObjectLengthPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    TabsModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [DataService],
})
export class AppModule {
  constructor(router: Router) {}
}


