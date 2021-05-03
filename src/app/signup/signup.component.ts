import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from '../controller/model/admin.model';
import { RegisterService } from '../controller/service/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupPayloadAdmin: Admin;
  error: boolean;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private cookieService: CookieService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.signupForm = this.formBuilder.group({
      email: '',
    });
    this.error = false;

    this.signupPayloadAdmin = {
      login: '',
      password: '',
      email: '',
    };
  }

  ngOnInit() {
    if (this.cookieService.check('expert') || this.cookieService.check('admin'))
      this.router.navigate(['/home']);
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      login: [null, Validators.required],
    });
  }
  signup() {
    this.signupPayloadAdmin.login = this.signupForm.get('login')?.value;
    this.signupPayloadAdmin.password = this.signupForm.get('password')?.value;
    this.signupPayloadAdmin.email = this.signupForm.get('email')?.value;

    this.registerService.signupAdmin(this.signupPayloadAdmin).subscribe(
      (data) => {
        this.cookieService.set('admin', JSON.stringify(data));
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
  openSnackBar() {
    this._snackBar.open('Connecté', 'Masquer');
  }
}
