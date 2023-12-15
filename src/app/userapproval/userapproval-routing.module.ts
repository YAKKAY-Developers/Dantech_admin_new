import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApprovedusersComponent } from './approvedusers/approvedusers.component';
import { PendingusersComponent } from './pendingusers/pendingusers.component';
import { RejectedusersComponent } from './rejectedusers/rejectedusers.component';
import { ChecklistComponent } from './checklist/checklist.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'approvedusers',
        component: ApprovedusersComponent,
      },
      {
        path: 'pendingusers',
        component: PendingusersComponent,
      },
      {
        path: 'rejectedusers',
        component: RejectedusersComponent,
      },
      {
        path: 'checklist/:id',
        component: ChecklistComponent,
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
