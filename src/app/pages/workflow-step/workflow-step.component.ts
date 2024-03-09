import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workflow-step',
  templateUrl: './workflow-step.component.html',
  styleUrls: ['./workflow-step.component.scss']
})
export class WorkflowStepComponent implements OnInit {
  rows: any[] = [];
  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Initialize the form with empty values
    this.form = this.formBuilder.group({});
  }

  get f() {
    return this.form.controls;
  }

  addRow(): void {
    // Add a new row to the form and rows array
    const stepId = this.rows.length;
    this.rows.push({
      stepId: stepId + 0,
      stepName: '',
      stepDuration: '',
      isPrimary: false // Initialize isPrimary as false
    });

    // Initialize form controls for the new row
    this.form.addControl(`stepName${stepId}`, this.formBuilder.control('', [Validators.required, Validators.minLength(3)]));
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

    const formData = this.rows.map(row => ({
      stepId: row.stepId + 1,
      stepName: this.form.get(`stepName${row.stepId}`)?.value,
      stepDuration: this.form.get(`stepDuration${row.stepId}`)?.value,
      isPrimary: this.form.get(`isPrimary${row.stepId}`)?.value ? "1" : "0" // Convert boolean to "1" or "0"
    }));

    console.log(formData);

    // You can handle form submission logic here
  }

  resetForm(): void {
    // Reset the form and clear the rows array
    this.submitted = false;
    this.form.reset();
    this.rows = [];
  }
}
