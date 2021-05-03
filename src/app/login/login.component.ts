import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from '../controller/model/admin.model';
import { Expert } from '../controller/model/expert.model';
import { RegisterService } from '../controller/service/register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginPayloadAdmin: Admin;
  loginPayloadExpert: Expert;
  error: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private cookieService: CookieService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
    });
    this.error = false;
    this.loginPayloadExpert = {
      login: '',
      password: '',
    };
    this.loginPayloadAdmin = {
      login: '',
      password: '',
    };
  }

  ngOnInit() {
    if (this.cookieService.check('expert') || this.cookieService.check('admin'))
      this.router.navigate(['/home']);
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  login() {
    this.loginPayloadAdmin.login = this.loginForm.get('email')?.value;
    this.loginPayloadExpert.login = this.loginForm.get('email')?.value;
    this.loginPayloadAdmin.password = this.loginForm.get('password')?.value;
    this.loginPayloadExpert.password = this.loginForm.get('password')?.value;

    this.registerService.loginAdmin(this.loginPayloadAdmin).subscribe(
      (data) => {
        this.cookieService.set('admin', JSON.stringify(data));
        this.error = false;
        this.router.navigate(['/home']);
        this.openSnackBar();
      },
      () => {
        this.registerService.loginExpert(this.loginPayloadAdmin).subscribe(
          (data) => {
            this.cookieService.set('expert', JSON.stringify(data));
            this.error = false;
            this.router.navigate(['/home']);
            this.openSnackBar();
          },
          (error) => {
            console.log(error);
            this.error = true;
          }
        );
      }
    );
  }
  openSnackBar() {
    this._snackBar.open('Connecté', 'Masquer');
  }
}
