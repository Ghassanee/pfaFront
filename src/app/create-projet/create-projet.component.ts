import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjetService } from '../controller/service/projet.service';
import { ProjetPayload } from '../controller/model/projet-payload.model';
import { Expert } from '../controller/model/expert.model';
import { Critere } from '../controller/model/critere.model';

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateProjetComponent implements OnInit {
  firstFormGroup: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: string[] = [];
  fieldArray: Array<any> = [];
  secondFormGroup: FormGroup;
  newAttribute: any = {};
  projetPayload: ProjetPayload;
  expertPayload: Expert[];
  criterePaylod: Critere[];
  error = false;
  groupForm = {
    name: ['', Validators.required],
    description: ['', Validators.required],
    fruits: [''],
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar,
    private projetService: ProjetService
  ) {
    this.firstFormGroup = this.formBuilder.group({});
    this.secondFormGroup = this.formBuilder.group({});
    this.projetPayload = {
      projet: {
        projetName: '',
        description: '',
      },
      experts: [
        {
          expertName: '',
          email: '',
        },
      ],
    };
    this.expertPayload = [];
    this.criterePaylod = [];
  }

  ngOnInit() {
    if (!this.cookieService.check('admin')) this.router.navigate(['/home']);
    this.firstFormGroup = this.formBuilder.group(this.groupForm);
    this.secondFormGroup = this.formBuilder.group({
      newAttributeCountryName: ['', Validators.required],
      newAttributeCountryMail: ['', [Validators.required, Validators.email]],
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  addFieldValue() {
    let leng = this.fieldArray.length;
    let n = 'newAttributeCountryName' + leng;
    let m = 'newAttributeCountryMail' + leng;
    this.secondFormGroup.addControl(n, new FormControl(''));
    this.secondFormGroup.addControl(
      m,
      new FormControl('', [Validators.required, Validators.email])
    );

    this.fieldArray.push(this.newAttribute);
  }
  deleteFieldValue(index: number) {
    this.fieldArray.splice(index, 1);
  }

  submit() {
    this.projetPayload.projet!.projetName = this.firstFormGroup.get(
      'name'
    )?.value;
    this.projetPayload.projet!.description = this.firstFormGroup.get(
      'description'
    )?.value;
    var keys = Object.keys(this.secondFormGroup.value);
    for (let index = 0; index < keys.length; index += 2) {
      const name = this.secondFormGroup.value[keys[index]];
      const email = this.secondFormGroup.value[keys[index + 1]];
      this.expertPayload.push({
        email: email,
        expertName: name,
      });
    }

    for (let index = 0; index < this.fruits.length; index++) {
      const element = this.fruits[index];
      this.criterePaylod.push({
        critereName: element,
      });
    }
    this.projetPayload.projet!.criteres = this.criterePaylod;

    this.projetPayload.experts = this.expertPayload;
    this.projetPayload.email = JSON.parse(
      this.cookieService.get('admin')
    ).email;
    this.projetService.createProjet(this.projetPayload).subscribe(
      (data) => {
        if (data == -1) this.error = true;
        else this.router.navigate(['/home']);
      },

      (error) => {
        console.log(error);
      }
    );
  }
}
