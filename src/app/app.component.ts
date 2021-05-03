import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pfaFront';
  constructor(public cookieService: CookieService, private router: Router) {}
  user: any;
  ngOnInit(): void {
    this.router.navigate(['/home']);
    this.loggedIn();
  }
  loggedIn() {
    if (this.cookieService.check('expert'))
      this.user = JSON.parse(this.cookieService.get('expert'));
    else if (this.cookieService.check('admin'))
      this.user = JSON.parse(this.cookieService.get('admin'));
  }
  logout() {
    this.cookieService.deleteAll();
    this.loggedIn();
  }
}
