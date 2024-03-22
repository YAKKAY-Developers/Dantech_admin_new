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
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-edit-workflowsteps',
  templateUrl: './edit-workflowsteps.component.html',
  styleUrls: ['./edit-workflowsteps.component.scss']
})
export class EditWorkflowstepsComponent {
 
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
    private adminservice : AdminService,
    private toasterService: ToasterService
   
  ) {}

  ngOnInit(): void {
    // user
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
   this.accessToken = accessToken;
    this.adminToken = adminToken;


    
   // Retrieve token from route parameters
   this.route.params.subscribe(params => {
    this.workflowToken = params['id'];
    // Now you can use this.workflowToken in your component logic
    console.log("workflowToken", this.workflowToken);
  });

     
    
    
    // this.filteredData = this.doc_data.filter((item: any) =>
    this.adminservice.getAllSteps(this.adminToken, this.accessToken, this.workflowToken).subscribe(res=>{
      this.result = res.getSteps;
      this.filteredData = this.result ;
      this.workflowName = res.worflowName;
      console.log(this.workflowName)
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
          item.stepToken.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.stepName.toLowerCase().includes(
            this.searchText.toLowerCase()
          ) ||
          item.stepDuration.includes(this.searchText)  ||

          item.isPrimary.includes(this.searchText)

        );
      });
    } 
    
    else {
      this.filteredData = this.result; // If searchText is empty, show all data
    }
  }


  onEdit(step: any) {
    step.isEdit = true;
  }

  // onDelete(step: any) {
  //   // Set editing state to true for the selected consultant
  // window.alert("Are you sure you want to delete this Consultant?")
  // const messageType = 'warning';
  //       const message = "Delete request has been sent to Admin for Approval";
  //       const title = 'Consultant delete';
  //       this.toasterService.showToast(message, title, messageType);
  // }


  onSave(step: any) {
   
    let stepCode = step.stepCode;
    let stepName = step.stepName;
    let stepDuration = step.stepDuration;
    let isPrimary = step.isPrimary;

    console.log(stepCode);

    this.adminservice.updateStep(this.adminToken, this.accessToken, this.workflowToken,stepCode, stepName,  stepDuration, isPrimary).subscribe(
      (res: any) => {
        const messageType = 'success';
        const message = 'Step updates Succesfully';
        const title = 'Step update';
        this.toasterService.showToast(message, title, messageType);
        setTimeout(() => {
          window.location.reload();
        }, 3000); 

        // Handle success
        // const index = this.filteredData.findIndex((s: any) => s.id === step.id);
        // if (index !== -1) {
        //   this.filteredData[index] = res.updatedStep;
        //   this.filteredData[index].isEdit = false;
        // }
      },
      (error: any) => {
        console.error('Error updating step details:', error);
        // Handle error
      }
    );
  }

  onCancel(step: any) {
    const index = this.filteredData.findIndex((s: any) => s.id === step.id);
    if (index !== -1) {
      this.filteredData[index].isEdit = false;
    }
  }
  
}

