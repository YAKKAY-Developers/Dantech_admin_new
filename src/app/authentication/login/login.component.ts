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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  submitted = false;
  result: any;
  loginError: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.authservice.logout();
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    // this.alertService.clear();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authservice
      .adminlogin(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.result = res;
          
          this.router.navigate(['/det/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.loginError = true;
          const messageType = 'warning' ;
          const message = error;
          const title = 'Login';
    
        this.toasterService.showToast(message, title, messageType);
        },

        // {
        //   // this.alertService.error(error);
        //   // this.loading = false;
        // }
      });
    this.router.navigate(['/dashboard']);
  }
}
