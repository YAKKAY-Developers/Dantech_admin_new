import { Component } from '@angular/core';
import { clinicdat, clinicdata } from './checklist-data';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit {
  form: FormGroup;
  reject_form: FormGroup;
  loading = false;
  submitted = false;
  submiiterdform: any;
  result: any;

  clinicdetails: clinicdata[];
  clinicdatalist: any[] = [];
  searchText: string = '';
  filteredData: any[] = [];
  sortcolumn: string = '';
  sortDirection: string = 'asc';

  // user details
  user_data: any;
  user_datas: any;
  user_details: any;
  user_status: any;
  userdatasubscribtion: Subscription;
  response:any;
  user:any;
  basicInfo:any
  // authenticate user

  accessToken: string;
  userDetailsSubscription: Subscription;
  adminToken: any;
  userToken:any;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private adminservice: AdminService
  ) {
    this.clinicdetails = clinicdat;
  }

  ngOnInit(): void {
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.accessToken = accessToken;
    this.adminToken = adminToken;

      // Retrieve token from URL path parameters
  this.route.params.subscribe(params => {
    this.userToken = params['id'];
    console.log("UserToken", this.userToken);
    // Now you can use this.userToken in your component logic
  });



      //user details
   //Get user details:
 this.userDetailsSubscription = this.adminservice.getOneUserAdmin(this.adminToken, this.accessToken, this.userToken)
 .pipe(first())
 .subscribe({
   next: (res) => {
     this.response = res.userDetails;
     this.user = res.userDetails.user;
     this.basicInfo = res.userDetails.basicInfo;
     this.filteredData = this.user
     console.log( this.response)
   },
   error: (error) => {
     console.log(error.error)
   }
 })

    $(document).ready(function () {
      $('.check-btn').on('click', function () {
        // Disable the check button
        $(this).prop('disabled', true);
        // Enable the cancel button
        $('.cancel-btn').prop('disabled', false);
      });

      $('.cancel-btn').on('click', function () {
        // Disable the cancel button
        $(this).prop('disabled', true);
        // Enable the check button
        $('.check-btn').prop('disabled', false);
      });
    });





    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.max(1)]],
      email: ['', [Validators.required, Validators.max(1)]],
      // image: ['', [Validators.required, Validators.max(1)]],
      address: ['', [Validators.required, Validators.max(1)]],
      mobileNumber: ['', [Validators.required, Validators.max(1)]],
    });

    this.reject_form = this.formBuilder.group({
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(10),
        ],
      ],
    });
  }

  get f() {
    return this.form.controls;
  }
  get r() {
    return this.reject_form.controls;
  }

  onSubmit() {
    this.submiiterdform = true;
    if (this.form.invalid) {
      return;
    }

    this.adminservice
      .approveuser(this.adminToken, this.accessToken, this.userToken)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("User status updated succesfully")
        },
        error: (error) => {
          // this.alertService.error(error);
          this.loading = false;
        },
      });

    this.router.navigate(['/det/userapproval/approvedusers']);
  }

  Reject() {
    this.submitted = true;

    console.log(this.form.value);

    if (this.reject_form.invalid) {
      return;
    }
    this.adminservice
      .rejectUser(this.adminToken, this.accessToken, this.userToken, this.reject_form.get('description').value)
      .pipe(first())
      .subscribe({
        next: () => {},
        error: (error) => {
          // this.alertService.error(error);
          this.loading = false;
        },
      });

    this.router.navigate(['/det/userapproval/rejectedusers']);
  }
}
