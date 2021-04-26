import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private angularFirestore: AngularFirestore) {}

  get(uid) {
    return this.angularFirestore.collection('user').ref.where('uid', '==', uid);
  }
}
