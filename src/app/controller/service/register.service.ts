import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin.model';
import { Expert } from '../model/expert.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  loginAdmin(loginPayload: Admin) {
    return this.httpClient.post(
      'http://localhost:8090/api/admin/login/',
      loginPayload
    );
  }
  loginExpert(loginPayload: Expert) {
    return this.httpClient.post(
      'http://localhost:8090/api/expert/login/',
      loginPayload
    );
  }
  signupAdmin(loginPayload: Admin) {
    return this.httpClient.post(
      'http://localhost:8090/api/admin/register/',
      loginPayload
    );
  }
}
