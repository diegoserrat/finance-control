import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from './../../../core/services/authentication/authentication.service';
import { RoutesEnum } from './../../../shared/models/enums/routes.enum';

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
    private route: ActivatedRoute,
    private router: Router,
    private authenticationSerice: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate([`${RoutesEnum.home}`]);
    }
  }

  post() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.authenticationSerice.signIn(email, password).then((res) => {
      console.log(res);
      if (this.authenticationSerice.isLogged) {
        this.router.navigate([`${RoutesEnum.home}`]);
      }
    });
  }

  toRegister() {
    this.router.navigate([`/register`], { relativeTo: this.route });
  }
}
