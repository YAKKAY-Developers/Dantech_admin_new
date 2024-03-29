import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-workflow-step',
  templateUrl: './workflow-step.component.html',
  styleUrls: ['./workflow-step.component.scss']
})
export class WorkflowStepComponent implements OnInit {
  rows: any[] = [];
  form: FormGroup;
  submitted = false;
  activatedRoute: any;
  workflowToken:any;
  loading: boolean;
  length:any;

  adminToken:any;
  accessToken:any;
  result: any;
  workflowName: any;
  stepresult: any;
  filteredData: any;
  sortcolumn: string = '';
  sortDirection: string = 'asc';

  constructor(private formBuilder: FormBuilder,  
    private route: ActivatedRoute,
    private router: Router,
    private adminservice : AdminService ) { }

  ngOnInit() {


    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
this.adminToken = adminToken;
this.accessToken = accessToken;




   // Retrieve token from route parameters
   this.route.params.subscribe(params => {
    this.workflowToken = params['id'];
    // Now you can use this.workflowToken in your component logic
    console.log("workflowToken", this.workflowToken);
  });


  this.adminservice.getAllSteps(this.adminToken, this.accessToken, this.workflowToken).subscribe(res=>{
    this.stepresult = res.getSteps;
    this.filteredData = this.stepresult ;
    this.workflowName = res.worflowName;
    console.log(this.stepresult)
  })


     
    // Initialize the form with empty values
    this.form = this.formBuilder.group({});
  }

  get f() {
    return this.form.controls;
  }

  // addRow(): void {


     
  
  //   // Add a new row to the form and rows array
  //   const stepId = this.rows.length;
  //   this.rows.push({
  //     stepId: stepId + 0,
  //     stepName: '',
  //     stepDuration: '',
  //     isPrimary: false // Initialize isPrimary as false
  //   });

  //   // Initialize form controls for the new row
  //   this.form.addControl(`stepName${stepId}`, this.formBuilder.control('', [Validators.required, Validators.minLength(3)]));
  //   this.form.addControl(`stepDuration${stepId}`, this.formBuilder.control(''));
  //   this.form.addControl(`isPrimary${stepId}`, this.formBuilder.control(false));
  // }

  addRow(): void {
    // Add a new row to the form and rows array
    const stepId = this.rows.length;
    const stepNumber = 'Step ' + (stepId + 1); // Generate step number for the new row
    this.rows.push({
        stepId: stepId + 0,
        stepNumber: stepNumber,
        stepName: '',
        stepDuration: '',
        isPrimary: false // Initialize isPrimary as false
    });

    // Initialize form controls for the new row
    this.form.addControl(`stepName${stepId}`, this.formBuilder.control('', [Validators.required, Validators.minLength(3)]));
    this.form.addControl(`stepNumber${stepId}`, this.formBuilder.control(stepNumber)); // Set stepNumber in form control
    this.form.addControl(`stepDuration${stepId}`, this.formBuilder.control(''));
    this.form.addControl(`isPrimary${stepId}`, this.formBuilder.control(false));
}


  removeRow(index: number): void {
    // Remove the row from the form and rows array
    this.rows.splice(index, 1);
    this.form.removeControl(`stepName${index}`);
    this.form.removeControl(`stepDuration${index}`);
    this.form.removeControl(`isPrimary${index}`);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }



    const formData = this.rows.map((row, index) => ({
      // stepId: row.stepId + 1,
      stepNumber: 'Step ' + (index + 1), // Add stepNumber here
      stepName: this.form.get(`stepName${row.stepId}`)?.value,
      stepDuration: this.form.get(`stepDuration${row.stepId}`)?.value,
      isPrimary: this.form.get(`isPrimary${row.stepId}`)?.value ? "1" : "0" // Convert boolean to "1" or "0"
    }));

    console.log(formData);

 
    this.loading = true;

    this.adminservice.createStep(this.adminToken, this.accessToken, this.workflowToken, formData)
    .pipe(first())
    .subscribe({
  
      next: (res) => {
        this.result = res;
        window.confirm(this.result.message);
        this.router.navigate(['det/pages/workflowdetail/',this.workflowToken]);
      
      },
      error: (error) => {
        // this.error_message = error.error.message;
        console.log(error);

      },
    });






  }

  resetForm(): void {
    // Reset the form and clear the rows array
    this.submitted = false;
    this.form.reset();
    this.rows = [];
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
  
}
