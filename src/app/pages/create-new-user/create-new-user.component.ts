import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToasterService } from 'src/app/services/toaster.service';


@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent {
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit() {
  

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
        // address: ['', [Validators.required, Validators.maxLength(100)]],
        mobileNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{10}')],
        ],

        registerNumber:['', [Validators.required]],
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
        // confirmpassword: [
        //   '',
        //   [
        //     Validators.required,
        //     Validators.pattern(
        //       /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        //     ),
        //     Validators.minLength(8),
        //   ],
        // ],
      }
      // {
      //   validators: this.password.bind(this),
      // }
    );
  }

  // convenience getter for easy access to form fields
  // get f() {
  //   return this.form.controls;
  // }
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
    this.authservice
      .register(this.register.value)
      .pipe(first())
      .subscribe({
        // next: () => {
        //   // this.alertService.success('Registration successful', { keepAfterRouteChange: true });
        //   this.router.navigate(['/det/auth/login'], { relativeTo: this.route });
        //   window.location.reload();
        // },

        next: (res) => {
          this.result = res;
          const messageType = 'success';
          const message = this.result.message;
          const title = 'User added Successfylly';
          this.toasterService.showToast(message, title, messageType);
          this.router.navigate(['det/userapproval/pendingusers']);
       
        },
        error: (error) => {
          // this.error_message = error.error.message;
          console.log(error);

          const messageType = 'warning' ;
          const message = error;
          const title = 'Login';
    
        this.toasterService.showToast(message, title, messageType);
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
