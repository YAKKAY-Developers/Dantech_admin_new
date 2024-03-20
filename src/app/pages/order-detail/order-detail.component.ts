
// import { Component,OnInit } from '@angular/core';
// import { Order } from '../top-orders/order-data';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ChangeDetectorRef } from '@angular/core';
// import { AdminService } from 'src/app/services/admin.service';


// @Component({
//   selector: 'app-order-detail',
//   templateUrl: './order-detail.component.html',
//   styleUrls: ['./order-detail.component.scss']
// })
// export class OrderDetailComponent  {
//   selectedService: string = '';
//   orderDate: Date | null = null;

//   assigneeForm: FormGroup;



//   orders: Array<{ service: string, orderDate: Date, task: string, taskDueDate: Date, assignee: string  }> = [];

//   plaster: any[] = ['Varun', 'Hari', 'Dhamu'];
//   qc: any[] = ['Shiva', 'Santhanam'];
//   design:any[] =['Jasvin', 'Maharoof', 'sandesh', 'athira', 'Lakshmi'];
// production:any[] =['Sridhar'];
// ceramic:any[] = ['Murugesh','ruban', 'Karthikeyan'];
// admin:any[]=['Shiva', 'Santhanam']  
// scan : any [] =['Lakshmi']
// layer : any[] = ['Murugesh', 'ruban', 'Karthikeyan']


//   showSubtasks: boolean = false;
//   newSubtask: string = '';
//   subtasks: { [task: string]: string[] } = {};
//   selectedTask: string | null = null;

//   //Auth
//   public  id : any ;
//   adminToken:any;
//   accessToken:any;
//   // Add the isNextButtonVisible property
//   isNextButtonVisible: boolean = false;
//   constructor(     private fb: FormBuilder,public router: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { 


//     this.assigneeForm = this.fb.group({
//       selectedService: ['', Validators.required],
//       orderDate: [null, Validators.required],
//       orders: this.fb.array([]), // Initialize as an empty array
//     });


//   }

//   addSubtask(task: string) {
//     // Set the selected task
//     this.selectedTask = task;
//     // Create an array of subtasks for the given task if it doesn't exist
//     if (!this.subtasks[task]) {
//       this.subtasks[task] = [];
//     }
//   }



//   submitSubtask(task: string) {
//     if (this.newSubtask.trim() !== '') {
//       // Push the subtask to the array associated with the given task
//       this.subtasks[task].push(this.newSubtask);
//       this.newSubtask = ''; // Clear the input field
//     }
//   }


// data:Order[] =[
//   {
// workOrder:'D00989',
// status: 'danger',
// woStatus: 'Yet to start',
// doctor:'Rajan',
// doctorId:'D0189',
// date:'2023-12-12',
// image: 'assets/images/users/user.svg',
// product: 'Teeth Mold',
// files: 'assets/images/files/1.jpg',
// }]




//   // Define a map of tasks and their corresponding due date offsets for each service.
//   taskMap:

//   { [service: string]: { [task: string]: number } } = {


//     Crown: {
//       'Mold': 2,
//       'Pre-production': 4,
//       'Production': 6,
//       'Doctor Approval': 8,
//       'Final Mold': 10,
//       'Delivery':12
//     },
//     Offline: {
//       'Mold Creation':1,
//       'Ditching/Die cut':1,
//       'Quality Check':1,
//      'Articulation':1,
//       'Scanning':1,
//       'Designing':1,
//       'Milling':1,
//       'Sintering':1,
//       'Layering / Trimming':1,
//       'Glazing':1,
//       'Production Check':1,
//       'Dispatch':1

//     },
//     Denture: {
//       'Mold': 2,
//       'Production': 6,
//       'Final Mold': 12,
//       'Delivery':14
//     },

//     Partials:{
//       'Mold': 2,
//       'Production': 6,
//       'Final Mold': 12,
//       'Delivery':14
//     },
//     Implants:{
//       'Mold': 2,
//       'Production': 6,
//       'Final Mold': 12,
//       'Delivery':14
//     },
//     Removable:{
//       'Mold': 2,
//       'Production': 6,
//       'Final Mold': 12,
//       'Delivery':14
//     }
//     // Add more services and tasks as needed.
//   };



//   filteredData: Order | null = null; // Initialize with an empty array


//   ngOnInit(): void {

//     this.defaultDate = this.formatDate(new Date());

//     const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
//     this.adminToken = adminToken;

//     const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
//     this.accessToken = accessToken;

//     this.activatedRoute.params.subscribe(paramsId => 
//       {
//       this.id = paramsId['id'];
//       console.log(this.id);

//     });


//     //Remove this dummy assesment and map it to get order details api.

//     if (this.data.length > 0) {
//       this.filteredData = this.data[0]; // Initialize filteredData with the first item from data
//     } // Initialize filteredData with the full data
//   }


//   switchToAssignmentTab() {
//     const assignmentTab = document.getElementById('assignment-tab');
//     if (assignmentTab) {
//       assignmentTab.click(); // Programmatically trigger a click on the "Task" tab
//     }
//   }

//   switchToTaskTab(){
//     const taskTab = document.getElementById('task-tab');
//     if (taskTab) {
//       taskTab.click(); // Programmatically trigger a click on the "Task" tab
//     }

//   }

//   switchToTaskAssignmentTab(){
//     const taskassignTab = document.getElementById('taskassign-tab');
//     if (taskassignTab) {
//       taskassignTab.click(); // Programmatically trigger a click on the "Task" tab
//     }

//   }

//   switchToOrderDetailsTab(){
//     const detailsTab = document.getElementById('details-tab');
//     if (detailsTab) {
//       detailsTab.click(); // Programmatically trigger a click on the "Task" tab
//     }

//   }

//   switchToHistoryTab(){
//     const historyTab = document.getElementById('history-tab');
//     if (historyTab) {
//       historyTab.click(); // Programmatically trigger a click on the "Task" tab
//     }

//   }

//   formatDate(date: Date): string {
//     const year = date.getFullYear();
//     const month = ('0' + (date.getMonth() + 1)).slice(-2);
//     const day = ('0' + date.getDate()).slice(-2);
//     return `${year}-${month}-${day}`;
//   }



//   addOrdertaskAssign(): void {
//     this.orders = [];

//     if (this.selectedService && this.orderDate) {
//       const tasksForService = this.taskMap[this.selectedService];
//       if (tasksForService) {
//         let accumulatedOffset = 0;

//         for (const task in tasksForService) {
//           if (tasksForService.hasOwnProperty(task)) {
//             const dueDateOffset = tasksForService[task];
//             accumulatedOffset += dueDateOffset;

//             const taskDueDate = new Date(this.orderDate);
//             taskDueDate.setDate(taskDueDate.getDate() + accumulatedOffset);

//             this.orders.push({
//               service: this.selectedService,
//               orderDate: this.orderDate,
//               task: task,
//               taskDueDate: taskDueDate,
//               assignee: '' // Initialize assignee as an empty string

//             });
//           }
//         }
//         this.isNextButtonVisible = true;
//       }

//       this.selectedService = '';
//       this.orderDate = null;

//       this.cdr.detectChanges();

//     }
//   }



//   startTask(){
//     window.alert("Task Started")
//   }

//   closeTask(){
//     window.alert("Task Closed")
//   }

//   submitForm(){}

// }



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
      

     // Initialize the form with empty values
    //  this.form = this.formBuilder.group({
     
    //    firstName: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.pattern(/^([A-z]+\s*)+$/),
    //         Validators.minLength(3),
    //       ],
    //     ],


    //  });
    

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
            console.log('Order started successfully', response);
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



