

import { Component, OnInit } from '@angular/core';
import { Order } from '../top-orders/order-data';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common'; 


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {

  orderdatasubscribtion: Subscription;
  workflowsubscribtion : Subscription;
  order_details: any;
  workflowResult:any;
  order_data: any;
  orders_length = false;
  filteredData: any;
  sortcolumn: string = '';
  sortDirection: string = 'asc';
  orderDate: Date | null = null;

  adminToken: any;
  accessToken: any;
  orderToken:any;
  defaultDate: string;
  UserAddInfo: any;
  userInfo: any;
  selectedWorkflowToken: string | null = null;

  form: FormGroup;
  formBuilder: any;
  daysUntilDelivery: number;
  overdue: boolean;
  aDetails: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private adminservice: AdminService
  ) { }


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
      let valueA = a[column];
      let valueB = b[column];

      // Convert to string for comparison
      valueA = valueA.toString();
      valueB = valueB.toString();

      if (this.sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

  ngOnInit(): void {
    this.defaultDate = this.formatDate(new Date());
    
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');

    this.adminToken = adminToken;
    this.accessToken = accessToken;


    
 
    // Retrieve token from route parameters
    this.route.params.subscribe(params => {
      this.orderToken = params['id']; // Assign id parameter to departmentToken
      console.log("", this.orderToken);
    });
      

 

    this.orderdatasubscribtion = this.adminservice
    .getOrderDetail(this.adminToken, this.accessToken, this.orderToken)
    .subscribe(
      (res: any) => {
        this.order_details = res.userOrders;
        this.filteredData = this.order_details;
        this.userInfo = res.userDetails;
        this.UserAddInfo = res.userInfoDetails;
       
        const requiredDate = new Date(this.order_details.requiredDate);
        const currentDate = new Date();

        // Calculate the difference in days
        const differenceInTime = requiredDate.getTime() - currentDate.getTime();
        this.daysUntilDelivery = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        // Check if overdue
        this.overdue = currentDate.getTime() > requiredDate.getTime();
        console.log("Difference ", differenceInTime);
        console.log("Days left", this.daysUntilDelivery);
        console.log("Overdue", this.overdue);
      },
      (error: any) => {
        console.log(error);
      }
    );


    this.workflowsubscribtion = this.adminservice
    .getallworkflow(this.adminToken, this.accessToken)
    .subscribe(
      (res: any) => {
     this.workflowResult = res.getallworkflow;
      },
      (error: any) => {
        console.log(error);
      }
    );


    this.adminservice
    .getAorderDetails(this.adminToken, this.accessToken, this.orderToken)
    .subscribe(
      (res: any) => {
        this.aDetails = res.adminorderdetails;
      
      console.log(this.aDetails);
      
      },
      (error: any) => {
        console.log(error);
      }
    );




  }

  // Function to format date to yyyy-MM-dd format
  formatDateToInputDate(dateString: string): string {
    // Parse ISO 8601 date string and format it to yyyy-MM-dd
    return formatDate(dateString, 'yyyy-MM-dd', 'en-US');
  }



    switchToOrderDetailsTab(){
    const detailsTab = document.getElementById('details-tab');
    if (detailsTab) {
      detailsTab.click(); // Programmatically trigger a click on the "Task" tab
    }

  }

    switchToTaskAssignmentTab(){
    const taskassignTab = document.getElementById('taskassign-tab');
    if (taskassignTab) {
      taskassignTab.click(); // Programmatically trigger a click on the "Task" tab
    }

  }

    switchToAssignmentTab() {
    const assignmentTab = document.getElementById('assignment-tab');
    if (assignmentTab) {
      assignmentTab.click(); // Programmatically trigger a click on the "Task" tab
    }
  }


  switchToHistoryTab() {
    console.log(this.selectedWorkflowToken)
    if (this.adminToken && this.selectedWorkflowToken) {
   
    
      this.adminservice.startWorkflow(this.adminToken, this.accessToken, this.selectedWorkflowToken, this.orderToken)
        .subscribe(
          (response: any) => {
            // Handle response if needed
            setTimeout(() => {
              window.location.reload();
            }, 3000)
            // After starting the order, switch to the history tab
            const historyTab = document.getElementById('history-tab');
            if (historyTab) {
              historyTab.click(); // Programmatically trigger a click on the "History" tab
            }
          },
          (error: any) => {
            // Handle error if needed
            console.error('Error starting order', error);
          }
        );
    } else {

      console.error('Admin token or selected workflow token is missing');
    }
  }
  



    formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  

  onSubmit() {

    }
  }



