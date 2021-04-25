import { Injectable } from '@angular/core';
import { Login } from '../../../shared/models/interface/login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  post(payload: Login) {
    if (payload.email === 'teste' && payload.password === '123456') {
      return true;
    }
    return false;
  }
}
