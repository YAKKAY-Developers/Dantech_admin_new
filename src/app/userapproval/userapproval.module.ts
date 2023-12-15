import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserapprovalRoutingModule } from './userapproval-routing.module';
import { ApprovedusersComponent } from './approvedusers/approvedusers.component';
import { PendingusersComponent } from './pendingusers/pendingusers.component';
import { RejectedusersComponent } from './rejectedusers/rejectedusers.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [],
})
export class UserapprovalModule {}
