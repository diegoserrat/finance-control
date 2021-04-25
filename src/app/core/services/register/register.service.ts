import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private angularFireStore: AngularFirestore) {}

  get() {
    return this.angularFireStore.collection('user').snapshotChanges();
  }

  create(payload) {
    return this.angularFireStore.collection('user').add(payload);
  }

  edit(payload, key: string) {
    return this.angularFireStore.doc(`user/${key}`).update(payload);
  }

  delete(key: string) {
    return this.angularFireStore.doc(`user/${key}`).delete();
  }
}
