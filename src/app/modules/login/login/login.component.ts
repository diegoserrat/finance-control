import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Login } from './../../../shared/models/interface/login.interface';
import { AuthenticationService } from './../../../core/services/authentication/authentication.service';
import { RoutesEnum } from './../../../shared/models/enums/routes.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private router: Router,
    private authenticationSerice: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate([`${RoutesEnum.home}`]);
    }
  }

  async post() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    await this.authenticationSerice.signIn(email, password);
    if (this.authenticationSerice.isLogged) {
      this.router.navigate([`${RoutesEnum.home}`]);
    }
  }
}
