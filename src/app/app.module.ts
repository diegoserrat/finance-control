import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthInterceptor } from './core/helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './core/helpers/error-interceptor';

export const firebaseConfig = {
  apiKey: 'AIzaSyDu9NZRZY7kvIX5c56PUh0Scxj6LOOZ0MM',
  authDomain: 'finance-control-1ce20.firebaseapp.com',
  projectId: 'finance-control-1ce20',
  storageBucket: 'finance-control-1ce20.appspot.com',
  messagingSenderId: '975473800781',
  appId: '1:975473800781:web:340f67cbf2b77f39418e04',
  measurementId: 'G-BDXPPCP9QW',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
