import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  form: FormGroup;
  loading = false;
  submitted = false;
  result: any;
  //register
  register: FormGroup;
  reg_submitted = false;
  reg_loading = false;
  reg_result: any;
  passwordsMatching = false;
  loginError: boolean = false;
  RegisterError: boolean = false;
  error_message: any;

  adminToken:any;
  accessToken:any;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService, 
    private adminservice : AdminService
  ) {}

  ngOnInit() {
 
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
this.adminToken = adminToken;
this.accessToken = accessToken;


    this.register = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: [
          '',
          [
            Validators.required,
            Validators.pattern(/^([A-z]+\s*)+$/),
            Validators.minLength(3),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.pattern(/^([A-z]+\s*)+$/),
            Validators.minLength(3),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            ),
            Validators.minLength(8),
          ],
        ],

        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            ),
            Validators.minLength(8),
          ],
        ],
        
      }
      
    );
  }


  get r() {
    return this.register.controls;
  }

  onSubmit() {

    console.log("I am inside register")

    this.reg_submitted = true;
    console.log(this.register.value);

    if (this.register.invalid) {
      return;
    }
    this.reg_loading = true;
    this.adminservice.registerDepartment(this.adminToken, this.accessToken, this.register.value)
      .pipe(first())
      .subscribe({
       

        next: (res) => {
          this.result = res;
          window.confirm(this.result.message);
          this.router.navigate(['det/userapproval/pendingusers']);
        
        },
        error: (error) => {
          // this.error_message = error.error.message;
          console.log(error);

          this.RegisterError = true;
        },
      });
    
  }

  

  togglePanel(isSignUp: boolean): void {
    const container = document.getElementById('container');

    // Check if the element exists before attempting to modify its class
    if (container) {
      if (isSignUp) {
        container.classList.add('right-panel-active');
      } else {
        container.classList.remove('right-panel-active');
      }
    } else {
      console.error('Element with ID "container" not found.');
    }
  }
}
