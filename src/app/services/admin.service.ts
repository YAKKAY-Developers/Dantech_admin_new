import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  approveuser( adminToken: any, accessToken:any, userToken: any,): Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': `${accessToken}`
    });
  
    let body = {
      "userToken": userToken,
      "adminToken":adminToken
    };
  
    return this.http.put(`${environment.apiUrl}/api/admin/approveUser`, body, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  rejectuser(userId: any, description: any) {
    const body = {
      userToken: userId,
      description: description,
    };
    console.log(body);
    return this.http.put(`${environment.apiUrl}/api/admin/rejectuser`, body);
  }

  getallorders(adminToken: any) {
    const body = {
      adminToken: adminToken,
    };
    return this.http.post(`${environment.apiUrl}/api/admin/getallOrders`, body);
  }

  getallworkflow(adminToken: any, accessToken:any):Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': `${accessToken}`
    });
  
    let body = {
      "adminToken":adminToken
    };
  
    return this.http.post(`${environment.apiUrl}/api/workflow/getall`, body, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getAllSteps(adminToken: any, accessToken:any, workflowToken:any):Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': `${accessToken}`
    });
  
    let body = {
      "adminToken":adminToken,
      "workflowToken":workflowToken
    };
  
    return this.http.post(`${environment.apiUrl}/api/workflow/getAllSteps`, body, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }


  updateStep(adminToken: any, accessToken:any, workflowToken:any, stepCode :any, stepName: any,  stepDuration:any, isPrimary:any):Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': `${accessToken}`
    });
  
    let body = {
      "adminToken":adminToken,
      "workflowToken":workflowToken,
      "stepCode":stepCode,
      "stepDuration":stepDuration,
      "isPrimary":isPrimary,
      "stepName":stepName
    };
  
    return this.http.put(`${environment.apiUrl}/api/workflow/updateStep`, body, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
 
 
    getOrderDetail(adminToken: any, accessToken:any, orderToken:any):Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken,
        "orderToken":orderToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/getOrderDeatilsAdmin`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    getAorderDetails(adminToken: any, accessToken:any, orderToken:any):Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken,
        "orderToken":orderToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/getAdetails`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


  getAllDepartments(adminToken: any, accessToken:any):Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': `${accessToken}`
    });
  
    let body = {
      "adminToken":adminToken
    };
  
    return this.http.post(`${environment.apiUrl}/api/admin/getAllDepartments`, body, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createworkflow(adminToken: any, accessToken:any, workflowName:any):Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': `${accessToken}`
    });
  
    let body = {
      "adminToken":adminToken,
      "workflowName":workflowName
    };
  
    return this.http.post(`${environment.apiUrl}/api/workflow/createworkflow`, body, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createAddMemebers(adminToken: any, accessToken:any, departmentToken:any, assigneeName:any):Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': `${accessToken}`
    });
  
    let body = {
      "adminToken":adminToken,
      "departmentToken":departmentToken,
      "assigneeName":assigneeName
    };
  
    return this.http.post(`${environment.apiUrl}/api/admin/createAddMemebers`, body, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }


  getAllDepartmentDetails(adminToken: any, accessToken:any, departmentToken:any):Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': `${accessToken}`
    });
  
    let body = {
      "adminToken":adminToken,
      "departmentToken":departmentToken,
     
    };
  
    return this.http.post(`${environment.apiUrl}/api/admin/getAllDepartmentDetails`, body, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
    getPendingUsers(adminToken: any, accessToken:any): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/pendingUsers`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    getApprovedUsers(adminToken: any, accessToken:any): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/approvedUsers`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    getRejectedUSers(adminToken: any, accessToken:any): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/rejectedUsers`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }

    rejectUser( adminToken: any, accessToken:any, userToken: any, description:any): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "userToken": userToken,
        "adminToken":adminToken,
        "description":description
        
      };
    
      return this.http.put(`${environment.apiUrl}/api/admin/rejectUser`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }





    getOneUserAdmin( adminToken: any, accessToken:any, userToken: any,): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "userToken": userToken,
        "adminToken":adminToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/getOneUserAdmin`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    getOrderInPCount(adminToken: any, accessToken:any): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/getOrderInPCount`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    getOrderRejPCount(adminToken: any, accessToken:any): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/getOrderRejPCount`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    getOrderComPCount(adminToken: any, accessToken:any): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/getOrderComPCount`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    getTodayOrCount(adminToken: any, accessToken:any): Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/getTodayOrCount`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


      getAllOrderCount(adminToken: any, accessToken:any): Observable<any> {
        let headers = new HttpHeaders({
          'x-access-token': `${accessToken}`
        });
      
        let body = {
          "adminToken":adminToken
        };
      
        return this.http.post(`${environment.apiUrl}/api/admin/getAllOrderCount`, body, { headers })
          .pipe(map((res: any) => {
            return res;
          }));
      }



    registerDepartment(adminToken: any, accessToken:any, departmentDetails:any):Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken,
        "departmentDetails":departmentDetails
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/registerDepartment`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    createStep(adminToken: any, accessToken:any, workflowToken:any, steps: any):Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken,
        "workflowToken":workflowToken,
        "steps":steps
      };
    
      return this.http.post(`${environment.apiUrl}/api/workflow/createStep`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }

    mapDeptSteps(adminToken: any, accessToken:any, workflowToken:any, formData: any):Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken,
        "workflowToken":workflowToken,
        "formData":formData
      };
    
      return this.http.post(`${environment.apiUrl}/api/workflow/mapDeptSteps`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }


    startWorkflow(adminToken: any, accessToken:any, workflowToken:any,orderToken:any):Observable<any> {
      let headers = new HttpHeaders({
        'x-access-token': `${accessToken}`
      });
    
      let body = {
        "adminToken":adminToken,
        "workflowToken":workflowToken,
        "orderToken":orderToken
       
      };
    
      return this.http.post(`${environment.apiUrl}/api/admin/startWorkflow`, body, { headers })
        .pipe(map((res: any) => {
          return res;
        }));
    }






}



