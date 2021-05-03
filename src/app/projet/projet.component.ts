import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Projet } from '../controller/model/projet.model';
import { ProjetService } from '../controller/service/projet.service';
@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss'],
})
export class ProjetComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion();
  ate: Projet[];

  constructor(
    private router: Router,
    private cookieService: CookieService,

    private projetService: ProjetService
  ) {
    this.ate = [];
  }

  ngOnInit() {
    if (!this.cookieService.check('admin')) this.router.navigate(['/home']);
    let expertName = JSON.parse(this.cookieService.get('admin')).login;
    this.projetService.getProjets(expertName).subscribe(
      (data: Projet[]) => {
        for (var key in data) {
          let proj = new Projet();
          proj.projetName = data[key].projetName;
          proj.id = data[key].id;
          proj.description = data[key].description;
          this.ate.push(proj);
        }
      },

      (error) => {
        console.log(error);
      }
    );
  }
}
