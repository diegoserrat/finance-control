import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../../core/services/authentication/authentication.service';
import { RegisterService } from './../../../core/services/register/register.service';
import { RoutesEnum } from './../../../shared/models/enums/routes.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signOnForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {}

  async register() {
    const email = this.signOnForm.controls.email.value;
    const password = this.signOnForm.controls.password.value;

    const payload: any = { email, password };

    await this.authenticationService.signUp(email, password);
    if (
      this.authenticationService.isLogged &&
      this.authenticationService.uuId
    ) {
      payload.uid = this.authenticationService.uuId;
      this.registerService.create(payload).then((res) => {
        this.router.navigate([`${RoutesEnum.home}`]);
      });
    }
  }

  update() {
    const payload = {};

    this.registerService.edit(payload, '').then((res) => {
      console.log(res);
    });
  }

  delete() {
    this.registerService.delete('').then((res) => {
      console.log(res);
    });
  }
}
