import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLogged = false;
  uuId = '';
  public user: Observable<any>;
  private userSubject: BehaviorSubject<any>;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) // private angularFirestore: AngularFirestore
  {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  async signIn(email: string, password: string) {
    await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLogged = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  async signUp(email: string, password: string) {
    await this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.uuId = res.user.uid;
        this.isLogged = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  logout() {
    this.angularFireAuth.signOut();
    localStorage.removeItem('user');
    this.isLogged = false;
  }

  // async signOut() {
  //   await this.angularFireAuth.auth.signOut();
  //   return this.router.navigate(['/']);
  // }
}
