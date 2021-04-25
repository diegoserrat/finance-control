import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Login } from '../../../shared/models/interface/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLogged = false;
  public user: Observable<any>;
  private userSubject: BehaviorSubject<any>;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.isLogged = true;
      });
  }

  signUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.isLogged = true;
      });
  }

  logout() {
    this.angularFireAuth.signOut();
    localStorage.removeItem('user');
    this.isLogged = false;
  }
}
