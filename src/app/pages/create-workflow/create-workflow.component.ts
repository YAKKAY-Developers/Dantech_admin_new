import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

export function fileExtensionValidator(allowedExtensions: string[]) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value as File;
    if (!file) {
      return null; // If there's no file, return no error
    }
    
    let extension = file.name.split('.').pop();
    extension = extension ? extension.toLowerCase() : '';

    if (!allowedExtensions.includes(extension)) {
      return { invalidExtension: true };
    }

    return null;
  };
}


@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['./create-workflow.component.scss']
})
export class CreateWorkflowComponent {
  orderDetails!: FormGroup;
  productDetails!: FormGroup;
  fileDetails!: FormGroup;
  order_step = false;
  product_step = false;
  file_step = false;
  step = 1;
  selectedFile: File | null = null; // Store the selected file
  
  
  productOptions = {
    Crown: [1, 2, 3, 4, 5],
    Denture: [6, 7],
  };

  
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.orderDetails = this.formBuilder.group({
      patientName: ['', Validators.required],
      doctorName: [''],
      orderDate: [''],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.productDetails = this.formBuilder.group({
      product: ['', Validators.required],
      productDetail:['']
    });

    this.fileDetails = this.formBuilder.group({
      file: [
        null,
        [Validators.required, fileExtensionValidator(['pdf', 'doc', 'docx'])],
      ],
    });
  }




  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  
  
  
  

  get order() {
    return this.orderDetails.controls;
  }

  get file() {
    return this.fileDetails.controls;
  }

  get product() {
    return this.productDetails.controls;
  }


  
 

  next() {
    if (this.step === 1 && this.orderDetails.valid) {
      this.step++;
    } else if (this.step === 2 && this.productDetails.valid) {
      this.step++;
    }
  }

  previous() {
    if (this.step === 2) {
      this.step--;
    } else if (this.step === 3) {
      this.step--;
    }
  }

  submit() {
    if (this.step === 3 && this.selectedFile) {
      // You have the selected file in this.selectedFile
      // Handle the file submission logic here
      window.alert('File submitted');
    }
  }
}
