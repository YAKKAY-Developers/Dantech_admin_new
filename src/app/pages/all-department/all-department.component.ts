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
  selector: 'app-all-department',
  templateUrl: './all-department.component.html',
  styleUrls: ['./all-department.component.scss']
})
export class AllDepartmentComponent {

  adminToken:any;
  accessToken:any;
  result: any;



  //search table
  searchText: string = '';
  filteredData: any[] = [];
  sortcolumn: string = '';
  sortDirection: string = 'asc';
  workflowToken:any;
  workflowName:any;

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


    
  //  // Retrieve token from route parameters
  //  this.route.params.subscribe(params => {
  //   this.workflowToken = params['id'];
  //   // Now you can use this.workflowToken in your component logic
  //   console.log("workflowToken", this.workflowToken);
  // });

     
    
    
    // this.filteredData = this.doc_data.filter((item: any) =>
    this.adminservice.getAllDepartments(this.adminToken, this.accessToken).subscribe(res=>{
      this.result = res.getAllDepartments;
      this.filteredData = this.result ;
     
      console.log(this.result)
    })

 



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
      console.log('value B:', valueB);
  
      if (column === 'isPrimary') {
        // For boolean fields, compare using the default sorting order
        return this.sortDirection === 'asc' ? (valueA ? -1 : 1) : valueA ? 1 : -1;
      } else {
        // For other fields, compare using localeCompare
        if (this.sortDirection === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      }
    });
  }
  

  
  filterData() {
    if (this.searchText) {
   
      this.filteredData = this.result.filter((item: any) => {

        return (
          item.departmentToken.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.fullName.toLowerCase().includes(
            this.searchText.toLowerCase()
          ) ||
          item.email.includes(this.searchText)  

        );
      });
    } 
    
    else {
      this.filteredData = this.result; // If searchText is empty, show all data
    }
  }
}

