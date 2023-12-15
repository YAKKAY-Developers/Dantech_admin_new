import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AuthenticationRoutes } from './authentication.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserregisterComponent } from './userregister/userregister.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
   
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [

  
    LoginComponent,
        RegisterComponent,
        UserregisterComponent
  ],
})
export class AuthenticationModule {}
