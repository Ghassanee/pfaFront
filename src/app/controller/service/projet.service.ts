import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expert } from '../model/expert.model';
import { ProjetPayload } from '../model/projet-payload.model';
import { Projet } from '../model/projet.model';

@Injectable({
  providedIn: 'root',
})
export class ProjetService {
  constructor(private httpClient: HttpClient) {}

  createProjet(projetPayload: ProjetPayload) {
    return this.httpClient.post(
      'http://localhost:8090/api/projet/create/',
      projetPayload
    );
  }
  getCriteres(projetName: string) {
    return this.httpClient.get(
      `http://localhost:8090/api/projet/email/${projetName}`
    );
  }
  answerQst(expert: Expert) {
    return this.httpClient.put(
      'http://localhost:8090/api/expert/answer/',
      expert
    );
  }
  getProjets(expertName: string): Observable<Projet[]> {
    return this.httpClient.get<Projet[]>(
      `http://localhost:8090/api/admin/projets/${expertName}`
    );
  }
}
