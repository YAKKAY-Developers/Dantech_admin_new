import { Component, OnInit } from '@angular/core';
// import {topcard,topcards} from './top-cards-data';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  // topcards:topcard[];
  accessToken:any;
  inProgresscountSubscription: Subscription;
  completedcountSubscription: Subscription;
  rejectedCountSubscription: Subscription;
  todayCountSubscription : Subscription;
  allOrderSubscription: Subscription;
  adminToken:any;
  inProgressresult:any;
  completedResult:any;
  rejectedCount:any;
  todayCount:any
  allOrderCount:any
  todayDate = new Date()

  filteredData: any;

  constructor( public router: Router,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private adminservice: AdminService) { 

    // this.topcards=topcards;


 


  }

  ngOnInit(): void {

    // user
 
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { status } = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.accessToken = accessToken;
    this.adminToken = adminToken;


    console.log("Access Token",this.accessToken);
    console.log("Admin Token",this.adminToken);

//Order details
this.inProgresscountSubscription = this.adminservice
.getOrderInPCount(this.adminToken, this.accessToken)
.subscribe(
(res: any) => {
this.inProgressresult = res.usersWithOrderStatus;
this.filteredData = this.inProgressresult;
console.log("Response from API ",res)
console.log(this.filteredData)
},
(error: any) => {
console.log('Error fetching user details:', error);
}
);


//Order details
this.completedcountSubscription = this.adminservice
.getOrderComPCount(this.adminToken, this.accessToken)
.subscribe(
(res: any) => {
this.completedResult = res.usersWithOrderStatus;
this.filteredData = this.completedResult;
console.log("Response from API ",res)
console.log(this.filteredData)
},
(error: any) => {
console.log('Error fetching user details:', error);
}
);


//Order details
this.rejectedCountSubscription = this.adminservice
.getOrderRejPCount(this.adminToken, this.accessToken)
.subscribe(
(res: any) => {
this.rejectedCount = res.usersWithOrderStatus;
this.filteredData = this.rejectedCount;
console.log("Response from API ",res)
console.log(this.filteredData)
},
(error: any) => {
console.log('Error fetching user details:', error);
}
);


this.todayCountSubscription = this.adminservice
.getTodayOrCount(this.adminToken, this.accessToken)
.subscribe(
(res: any) => {
this.todayCount = res.todayOrderCount;
this.filteredData = this.todayCount;
console.log("Response from API ",res)
console.log(this.filteredData)
},
(error: any) => {
console.log('Error fetching user details:', error);
}
);


this.allOrderSubscription = this.adminservice
.getAllOrderCount(this.adminToken, this.accessToken)
.subscribe(
(res: any) => {
this.allOrderCount = res.totalOrderCount;
console.log("All order count ",res)
console.log(this.allOrderCount)
},
(error: any) => {
console.log('Error fetching user details:', error);
}
);





  }



}
