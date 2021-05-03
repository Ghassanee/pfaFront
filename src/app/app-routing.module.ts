import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnsweredComponent } from './answered/answered.component';
import { CreateProjetComponent } from './create-projet/create-projet.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjetComponent } from './projet/projet.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create-projet', component: CreateProjetComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'answered', component: AnsweredComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projet', component: ProjetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
