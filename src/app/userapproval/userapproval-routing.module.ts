import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApprovedusersComponent } from './approvedusers/approvedusers.component';
import { PendingusersComponent } from './pendingusers/pendingusers.component';
import { RejectedusersComponent } from './rejectedusers/rejectedusers.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { authGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'approvedusers',
        component: ApprovedusersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'pendingusers',
        component: PendingusersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'rejectedusers',
        component: RejectedusersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'checklist/:id',
        component: ChecklistComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ApprovedusersComponent,
    PendingusersComponent,
    RejectedusersComponent,
    ChecklistComponent,
  ],
})
export class UserapprovalRoutingModule {}
