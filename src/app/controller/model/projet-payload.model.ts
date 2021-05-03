import { Expert } from './expert.model';
import { Projet } from './projet.model';

export class ProjetPayload {
  projet?: Projet;
  experts?: Expert[];
  email?: string;
}
