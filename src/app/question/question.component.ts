import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Critere } from '../controller/model/critere.model';
import { Expert } from '../controller/model/expert.model';
import { ProjetPayload } from '../controller/model/projet-payload.model';
import { Projet } from '../controller/model/projet.model';
import { ProjetService } from '../controller/service/projet.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  questionForm: FormGroup;
  error = false;
  ate: any[];

  animals: question[] = [
    { name: 'moin important ', val: 1 },
    { name: 'fortement moin important', val: 2 },
    { name: 'très fortement moin important', val: 3 },
    { name: 'extrêmement fortement moin important', val: 4 },
    { name: 'également important', val: 5 },
    { name: 'plus important', val: 6 },
    { name: 'fortement important', val: 7 },
    { name: 'très fortement plus important', val: 8 },
    { name: 'extrêmement plus important', val: 9 },
  ];
  array = ['apple', 'banana', 'lemon', 'mango'];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar,
    private projetService: ProjetService
  ) {
    this.questionForm = this.formBuilder.group({});
    this.ate = [];
  }

  ngOnInit(): void {
    if (!this.cookieService.check('expert')) this.router.navigate(['/home']);
    else {
      this.questionForm = this.formBuilder.group({});

      let projetName = JSON.parse(this.cookieService.get('expert')).projet
        .projetName;
      this.projetService.getCriteres(projetName).subscribe(
        (data: Projet) => {
          this.ate = this.loadQst(data.criteres);
          for (let index = 0; index < this.ate.length; index++) {
            const element = this.ate[index];
            let n = 'qst' + index;
            this.questionForm.addControl(n, new FormControl(''));
          }
        },

        (error) => {
          console.log(error);
        }
      );
    }
  }

  loadQst(arr: Critere[] | any) {
    let array = [];
    for (var key in arr) {
      var obj = arr[key].critereName;
      array.push(obj);
    }
    let results = [];
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        results.push(
          `Quelle est votre preferance de "${array[i]}" par rapport a "${array[j]}"`
        );
      }
    }

    return results;
  }
  submitQst() {
    var keys = Object.keys(this.questionForm.value);
    let results = '';

    for (let index = 0; index < this.ate.length; index++) {
      const element = this.questionForm.value[keys[index]];
      results = results + ',' + element;
    }
    let expert: Expert = JSON.parse(this.cookieService.get('expert'));
    expert.answers = results;
    this.projetService.answerQst(expert).subscribe(
      (data) => {
        this.cookieService.deleteAll();
        this.router.navigate(['/answered']);
      },

      (error) => {
        console.log(error);
      }
    );
  }
}
interface question {
  name: string;
  val: number;
}
