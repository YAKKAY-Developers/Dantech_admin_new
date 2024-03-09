import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { UserService } from 'src/app/services/user.service';
// import { OrderService } from 'src/app/services/order.service';
import { AdminService } from 'src/app/services/admin.service';

import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent {
  user_data: any;
  viewdatalist: any[] = [];
  adminToken:any;
  // doctor list
  docdetails: any;
  doc_count = false;
  doc_data: any;
  docDetailsSubscription: Subscription;
  //search table
  searchText: string = '';
  filteredData: any[] = [
{
  workflowid:'WF202301',
worflowName: 'Offline - Tooth Support Cercon Crown & Bridges'
},
{
  workflowid:'WF202302',
  worflowName: 'Online - Tooth Support Cercon Crown & Bridges'

},

  ];

// filteredData: any[] = [];
myWorkflow:any[]=[];

  sortcolumn: string = '';
  sortDirection: string = 'asc';
  // adddoctors form
  form: FormGroup;
  loading = false;
  submitted = false;
  resut: any;
  // authenticate user
  stat_user: string;
  userId: string;
  userType: string;
  accessToken: string;
  userToken: any;
  userdata: any;
  UserDetails: any;
  userDetailsSubscription: Subscription;
  userObject: void;
  // check prescence
  gst_no = false;
  img_uploaded = false;

  isModalVisible = false;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private adminservice : AdminService
  
  ) {}

  ngOnInit(): void {
    // user
    const { userToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { fullName } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { status } = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.accessToken = accessToken;
    this.adminToken = adminToken;


      // this.filteredData = this.doc_data.filter((item: any) =>
      this.adminservice.getallworkflow(this.adminToken, this.accessToken).subscribe(res=>{
        this.myWorkflow = res.getallworkflow;
        this.filteredData = this.myWorkflow ;
        console.log(this.myWorkflow)
      })
    

    //form
    this.form = this.formBuilder.group({
      workflow_name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  get f() {
    return this.form.controls;
  }

  

  //form submit
  onSubmit() {
    this.submitted = true;

    console.log(this.submitted)

    if (this.form.invalid) {
      console.log(this.form.controls);
      return;
    }


    this.loading = true;

    this.adminservice.createworkflow(this.adminToken, this.accessToken, this.form.value).subscribe(res=>{
      this.myWorkflow = res.getallworkflow;
      this.filteredData = this.myWorkflow ;
      console.log(this.myWorkflow)
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
   
      this.filteredData = this.myWorkflow.filter((item: any) =>

      {

        return (
          item.id.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.workflowName.toLowerCase().includes(
            this.searchText.toLowerCase()
          ) 
        )
      });
    } 
    
    else {
      this.filteredData = this.myWorkflow; // If searchText is empty, show all data
    }
  }
}
