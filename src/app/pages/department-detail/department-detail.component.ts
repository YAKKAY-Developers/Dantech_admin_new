import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';


import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent {

  assigneeSubscription: Subscription;
  //search table
  searchText: string = '';
  filteredData: any[] = [];
  sortcolumn: string = '';
  sortDirection: string = 'asc';
  // adddoctors form
  form: FormGroup;
  loading = false;
  submitted = false;
  result: any;

  // authenticate user


  accessToken: string;
  adminToken:any;
  departmentToken:any;




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
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.accessToken = accessToken;
    this.adminToken = adminToken;
  
    // Retrieve token from route parameters
    this.route.params.subscribe(params => {
      this.departmentToken = params['id']; // Assign id parameter to departmentToken
      console.log("departmentToken", this.departmentToken);
      
      //Get all consultant details
      this.assigneeSubscription = this.adminservice.getAllDepartmentDetails(this.adminToken, this.accessToken, this.departmentToken)
        .pipe(first())
        .subscribe({
          next: (res) => {
            this.result = res.getAllDepartmentDetails;
            this.filteredData = this.result;
            console.log(this.filteredData)
          },
          error: (error) => {
            console.log('Error fetching doc details:', error.error)
          }
        });
    });
  
    // form
    this.form = this.formBuilder.group({
      assigneeName: ['', [Validators.required, Validators.minLength(3)]],
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
    this.adminservice
      .createAddMemebers(this.adminToken, this.accessToken, this.departmentToken, this.f['assigneeName'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          setTimeout(() => {
            window.location.reload();
          }, 3000); 
        },
        error: (error) => {
          this.loading = false;
          console.log(error)
        },
      });
  }



  sortColumn(column: string) {

    
    console.log('Sorting column:', column);


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

      console.log('value A:', valueA);
      console.log('value B:', valueA);

      if (this.sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

  filterData() {
    if (this.searchText) {
   
      this.filteredData = this.result.filter((item: any) => {

        return (
          item.assigneeToken.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.assigneeName.toLowerCase().includes(
            this.searchText.toLowerCase()
          ) 
        
        );
      });
    } 
    
    else {
      this.filteredData = this.result; // If searchText is empty, show all data
    }
  }
}
