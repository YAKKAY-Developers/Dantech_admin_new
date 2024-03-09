import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';




@Component({
  selector: 'app-rejectedusers',
  templateUrl: './rejectedusers.component.html',
  styleUrls: ['./rejectedusers.component.scss'],
})
export class RejectedusersComponent {
  
   //api results
   result: any
   basicInfo: any;
   bankInfo: any
   response: any;
   consultantDetails: any;
   consultantCount: any;
   fullName:any
   accessToken:any
   adminToken:any;

    // authenticate user
  userdata: any;
  UserDetails: any;
  userDetailsSubscription: Subscription;

//search table
searchText: string = '';
filteredData: any[] = [];
sortcolumn: string = '';
  sortDirection: string = 'asc';

  constructor(
   
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private http: HttpClient,
    private adminservice:AdminService

  ) {}


  ngOnInit() {

    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { fullName } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { status } = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.accessToken = accessToken;
    this.adminToken = adminToken;



 //Get user details:
 this.userDetailsSubscription = this.adminservice.getRejectedUSers(this.adminToken, this.accessToken)
 .pipe(first())
 .subscribe({
   next: (res) => {
     this.response = res.users;
     this.filteredData = this.response
     console.log( this.response)
   },
   error: (error) => {
     console.log(error.error)
   }
 })



  }

  sortColumn(column: string) {
    // Check if the column is already sorted
    if (this.sortcolumn === column) {
      // If the same column is clicked again, toggle the sorting order
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, set the sorting column and direction
      this.sortcolumn = column;
      this.sortDirection = 'asc'; // Default to ascending order
    }

    // Sort the filtered data based on the chosen column and direction
    this.filteredData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (this.sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

  filterData() {
    if (this.searchText) {
   
      this.filteredData = this.response.filter((item: any) => {

        return (
          item.userToken.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.fullName.toLowerCase().includes(
            this.searchText.toLowerCase()
          ) ||
          item.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.mobileNumber.toLowerCase().includes(
            this.searchText.toLowerCase()
          )

        );
      });
    } 
    
    else {
      this.filteredData = this.response; // If searchText is empty, show all data
    }
  }
}