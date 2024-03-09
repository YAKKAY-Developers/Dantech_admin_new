// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AdminService } from 'src/app/services/admin.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { first } from 'rxjs/operators';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   FormControl,
// } from '@angular/forms';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-workflow-detail',
//   templateUrl: './workflow-detail.component.html',
//   styleUrls: ['./workflow-detail.component.scss']
// })
// export class WorkflowDetailComponent {
//   rows: any[] = [];
//   form: FormGroup;
//   loading = false;
//   submitted = false;
//   result: any;


//   adminToken: any;
//   accessToken: any;

//   departmentsubscribtion: Subscription;
//   departmentResult: any;

//   filteredData: any[] = [
//     {
//       workflowid: 'WF202301',
//       worflowName: 'Offline - Tooth Support Cercon Crown & Bridges'
//     },
//     {
//       workflowid: 'WF202302',
//       worflowName: 'Online - Tooth Support Cercon Crown & Bridges'
//     },
//   ];

//   constructor(private httpClient: HttpClient, private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private adminservice: AdminService) { }

//   ngOnInit() {

//     const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
//     const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
//     this.adminToken = adminToken;
//     this.accessToken = accessToken;

//     this.departmentsubscribtion = this.adminservice
//     .getAllDepartments(this.adminToken, this.accessToken)
//     .subscribe(
//       (res: any) => {
//         this.departmentResult = res.getAllDepartments;
//         console.log(this.departmentResult);
//       },
//       (error: any) => {
//         console.log(error);
//       }
//     );
//     this.form = this.formBuilder.group(
//       {

//         stepName: [
//           '',
//           [
//             Validators.required,
//             Validators.pattern(/^([A-z]+\s*)+$/),
//             Validators.minLength(3),
//           ],
//         ],
//       }

//     );
//   }

//   get f() {
//     return this.form.controls;
//   }

//   addRow(): void {
//     this.rows.push({ step: 'step1', stepName: 'A', departmentName: '' });
//   }

//   removeRow(index: number): void {
//     this.rows.splice(index, 1);
//   }

//   onSubmit(): void {






//     const formData = this.rows.map((row, index) => ({
//       step: `step${index + 1}`,
//       stepName: row.stepName,
//       departmentName: row.departmentName
//     }));

//     // Assuming you have an API endpoint to post the data
//     this.httpClient.post('your-api-endpoint', { data: formData })
//       .subscribe(response => {
//         console.log('Data submitted successfully:', response);
//       });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  adminToken: any;
  accessToken: any;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.adminToken = adminToken;
    this.accessToken = accessToken;

    this.form = this.formBuilder.group({});

    this.adminService.getAllDepartments(this.adminToken, this.accessToken).subscribe(
      (res: any) => {
        this.departmentResult = res.getAllDepartments;
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
    this.form.addControl('stepName' + stepId, this.formBuilder.control('', [Validators.required, Validators.pattern(/^([A-Za-z]+\s*)+$/), Validators.minLength(3)]));
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
        stepName: stepName || '', // Handle undefined stepName
        departmentId: departmentId
      };
    });
  
    console.log(formData);

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
