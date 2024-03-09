
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: ['./workflow-detail.component.scss']
})
export class WorkflowDetailComponent implements OnInit {
  rows: any[] = [];
  form: FormGroup;
  submitted = false;
  departmentResult: any[];
  stepResult : any[];
  adminToken: any;
  accessToken: any;
  workflowToken:any
  loading: boolean;
  result: any;

  constructor(private httpClient: HttpClient, 
    private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,) { }

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


    this.form = this.formBuilder.group({});

    this.adminService.getAllDepartments(this.adminToken, this.accessToken).subscribe(
      (res: any) => {
        this.departmentResult = res.getAllDepartments;
      },
      (error: any) => {
        console.log(error);
      }
    );


    this.adminService.getAllSteps(this.adminToken, this.accessToken, this.workflowToken).subscribe(
      (res: any) => {
        this.stepResult = res.getSteps;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  addRow(): void {
    const stepId = this.rows.length; // Start index from 0
    const newRow = {
      stepId: stepId + 0, // Increment by 1 for display
      stepName: '',
      departmentId: ''
    };
    this.rows.push(newRow);
    
    // Initialize form controls for the new row
    this.form.addControl('stepName' + stepId, this.formBuilder.control('', ));
    this.form.addControl('departmentName' + stepId, this.formBuilder.control(''));
  }
  

  removeRow(index: number): void {
    this.rows.splice(index, 1);
    this.form.removeControl('stepName' + index);
    this.form.removeControl('departmentName' + index);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const formData = this.rows.map(row => {
      const stepName = this.form.get('stepName' + row.stepId)?.value;
      const departmentId = this.form.get('departmentName' + row.stepId)?.value || ''; // Handle undefined departmentId
      return {
        stepId: row.stepId + 1,
        stepName: stepName || '', // Hanzdle undefined stepName
        departmentId: departmentId
      };
    });
  
    console.log(formData);

    this.loading = true;


    this.adminService.mapDeptSteps(this.adminToken, this.accessToken, this.workflowToken, formData)
    .pipe(first())
    .subscribe({
  
      next: (res) => {
        this.result = res;
        window.confirm(this.result.message);
        
      
      },
      error: (error) => {
        // this.error_message = error.error.message;
        console.log(error);

      },
    });


    

    // this.httpClient.post('your-api-endpoint', { data: formData }).subscribe(
    //   response => {
    //     console.log('Data submitted successfully:', response);
    //   },
    //   error => {
    //     console.error('Error:', error);
    //   }
    // );




    
  }
}
