
import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

export const ProfileRoutes: Routes = [
  {
      path: '',
      children: [
        {
          path: 'form',
          component: FormComponent,
        },
        
        
  
      ],
    },
];

