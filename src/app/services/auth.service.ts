import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Profileinformation } from '../models/profile';
import { doctors } from '../models/doctors';
import { Admin } from '../models/admin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;
  roleAs: any;

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  private adminSubject: BehaviorSubject<Admin>;
  public admin: Observable<Admin>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  loggedIn() {
    return !!localStorage.getItem('user');
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/api/user/login`, { email, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          // location.reload();
          return user;
        })
      );
  }

  adminlogin(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/api/admin/login`, { email, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          // location.reload();
          return user;
        })
      );
  }

  register(user: User) {
    console.log("Im in register service")
    return this.http.post(`${environment.apiUrl}/api/user/register`, user);
  }


  adminregister(user: User) {
    console.log(user);
    return this.http.post(`${environment.apiUrl}/api/admin/register`, user);
  }

  profilereg_admin(profile: Profileinformation) {
    return this.http.post(`${environment.apiUrl}/api/profile/save`, profile);
  }

  adddoctor(doc: doctors) {
    return this.http.post(`${environment.apiUrl}/api/doctor/save`, doc);
  }
}
