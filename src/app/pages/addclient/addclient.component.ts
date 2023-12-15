import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent {
  form: FormGroup;
  loading = false;
  submitted = false;
  result: any

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private authservice:AuthService,) {}

  // profile image
  loadFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    const image = document.getElementById('output') as HTMLImageElement;

    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      image.src = URL.createObjectURL(target.files[0]);

      // this.saveFileLocally(file);
    }
  }
  // profile image save try
  // saveFileLocally(file: File): void {
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const base64Data = (event.target as any).result;
  //     const fileName = file.name;

  //     // Save the base64 data to local storage
  //     localStorage.setItem(fileName, base64Data);

  //     console.log('File saved locally:', fileName);
  //   };

  //   // Read the file as data URL
  //   reader.readAsDataURL(file);
  // }

  ngOnInit() {

    this.form = this.formBuilder.group({
      // image: ['',[Validators.required]],
      name: ['',[Validators.required,Validators.pattern(/^[A-z]*$/),Validators.min(3)]],
      email: ['',[Validators.required,Validators.email]],
      phonenumber: ['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      alternativenumber: ['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      address: ['',[Validators.required,Validators.maxLength(50)]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]],
      pincode: ['',[Validators.required,Validators.maxLength(6),Validators.pattern("^[1-9][0-9]+$")]],
      country: ['',[Validators.required]],
      bank_acNo: ['',[Validators.required,Validators.minLength(9),Validators.maxLength(16),Validators.pattern("[0-9]+")]],
      ifsc : ['',[Validators.required,Validators.pattern("^[A-Za-z]{4}[a-zA-Z0-9]{7}$")]],
      bank_brnch: ['',[Validators.required]],
      upi_id: ['',[Validators.required,Validators.pattern("[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}")]],
      gst: ['',[Validators.required,Validators.pattern("[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}")]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authservice.profilereg_admin(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/pages/addclient']);
        },
        error: error => {
          // this.alertService.error(error);
          this.loading = false;
        }
      });


      window.location.reload()
  }


}
