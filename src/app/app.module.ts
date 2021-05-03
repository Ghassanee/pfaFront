import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProjetComponent } from './projet/projet.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CookieService } from 'ngx-cookie-service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateProjetComponent } from './create-projet/create-projet.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { AnsweredComponent } from './answered/answered.component';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProjetComponent,
    QuestionComponent,
    ResultComponent,
    CreateProjetComponent,
    AnsweredComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatStepperModule,
    MatChipsModule,
    MatSelectModule,
    MatDividerModule,
    MatExpansionModule,
  ],

  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
