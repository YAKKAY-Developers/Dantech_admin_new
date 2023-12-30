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
export class AdminService {
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

  getallusers(userToken: any) {
    const body = {
      userToken: userToken,
    };
    var URL = `${environment.apiUrl}/api/admin/getallusers`;
    return this.http.post<any>(URL, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUserDetails(userToken: any) {
    const body = {
      userToken: userToken,
    };
    var URL = `${environment.apiUrl}/api/user/oneuser`;
    return this.http.post<any>(URL, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  approveuser(userToken: any, adminToken: any) {
    const body = {
      userToken: userToken,
      adminToken: adminToken,
    };
    console.log(body);
    return this.http.put(`${environment.apiUrl}/api/admin/approveuser`, body);
  }

  rejectuser(userId: any, description: any) {
    const body = {
      userToken: userId,
      description: description,
    };
    console.log(body);
    return this.http.put(`${environment.apiUrl}/api/admin/rejectuser`, body);
  }

  getallorders(userToken: any) {
    const body = {
      userToken: userToken,
    };
    return this.http.post(`${environment.apiUrl}/api/admin/getallorder`, body);
  }
}
