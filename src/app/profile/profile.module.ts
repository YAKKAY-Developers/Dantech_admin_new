import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile-routing.module';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    FormsModule
  ]
})
export class ProfileModule { }
