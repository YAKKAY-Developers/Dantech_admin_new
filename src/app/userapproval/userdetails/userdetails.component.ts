import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { userapprovaldata, approvallist } from '../userapproval-data';
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

function calculatePercentageCompletion(obj: any, doc: any): string {
  let totalFields = 0;
  let filledFields = 0;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      totalFields++;

      // Check if the key is "image" and the value is "assests/images/users/user.svg"
      if (key === 'image' && obj[key] === 'assets/images/users/user.svg') {
        // Reduce the filledFields count by 1
        filledFields--;
      } else if (obj[key] !== null) {
        filledFields++;
      }
    }
  }

  if (doc) {
    filledFields++;
  }

  filledFields--;

  return String(
    totalFields === 0
      ? 0
      : Number(((filledFields / totalFields) * 100).toFixed(0))
  );
}

function convertNullValues(data: any) {
  const convertedData = {};

  for (const key in data) {
    if (data[key] === null) {
      // Check the type of the original value and assign the appropriate replacement
      convertedData[key] = typeof data[key] === 'number' ? 0 : 'None';
    } else {
      convertedData[key] = data[key];
    }
  }

  return convertedData;
}

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
})
export class UserdetailsComponent {
  form: FormGroup;
  reject_form: FormGroup;
  loading = false;
  submitted = false;
  submiiterdform: any;
  result: any;

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
  doc_count: any;
  // check prescence
  gst_no = false;
  img_uploaded = false;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private adminservice: AdminService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.userToken = paramsId['id'];
      this.userId = this.userToken;

      //user details
      this.userDetailsSubscription = this.adminservice
        .getUserDetails(this.userId)
        .subscribe(
          (res: any) => {
            this.UserDetails = res;
            // console.log('My details', this.UserDetails['profile']);
            const userObject = this.UserDetails['profile'];
            const percentageCompletion: string = calculatePercentageCompletion(
              userObject,
              this.doc_count
            );
            userObject.profilecompletionpercentage = percentageCompletion;
            this.userdata = convertNullValues(userObject);
            this.user_data = [this.userdata];
            console.log(this.user_data);
          },
          (error: any) => {
            console.log('Error fetching user details:', error);
          }
        );
    });

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
      name: ['', [Validators.required, Validators.max(1)]],
      email: ['', [Validators.required, Validators.max(1)]],
      image: ['', [Validators.required, Validators.max(1)]],
      address: ['', [Validators.required, Validators.max(1)]],
      phonenumber: ['', [Validators.required, Validators.max(1)]],
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
      .approveuser(this.userId)
      .pipe(first())
      .subscribe({
        next: () => {},
        error: (error) => {
          // this.alertService.error(error);
          this.loading = false;
        },
      });

    this.router.navigate(['/det/userapproval/approvedusers']);
  }

  Reject() {
    this.submitted = true;

    if (this.reject_form.invalid) {
      return;
    }
    this.adminservice
      .rejectuser(this.userId, this.reject_form.value)
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
