import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { authGuard } from '../helpers/auth.guard';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
        // canActivate: [authGuard],
      },
      {
        path: 'user/register',
        component: UserregisterComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
