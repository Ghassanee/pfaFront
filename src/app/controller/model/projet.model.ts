import { Admin } from './admin.model';
import { Critere } from './critere.model';

export class Projet {
  id?: number;
  projetName?: string;
  description?: string;
  admin?: Admin;
  criteres?: Critere[];
}
