import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { TopOrdersComponent } from './top-orders/top-orders.component';
import { PagesComponent } from './pages.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { TestComponent } from './test/test.component';
import { TaskComponent } from './task/task.component';
import { AddclientComponent } from './addclient/addclient.component';
import { OrdersComponent } from './orders/orders.component';
import { authGuard } from '../helpers/auth.guard';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'toporders',
        component: TopOrdersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'orderdetail/:id',
        component: OrderDetailComponent,
      },
      {
        path: 'test/:id',
        component: TestComponent,
      },
      {
        path: 'task/:id',
        component: TaskComponent,
        canActivate: [authGuard],
      },
      {
        path: 'addclient',
        component: AddclientComponent,
        canActivate: [authGuard],
      },

      {
        path: 'newuser',
        component:CreateNewUserComponent,
        canActivate: [authGuard],
      },


      {
        path: 'createworkflow',
        component:CreateWorkflowComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    OrderDetailComponent,
    TopOrdersComponent,
    PagesComponent,
    TestComponent,
    TaskComponent,
    AddclientComponent,
    OrdersComponent,
    CreateNewUserComponent,
    CreateWorkflowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PagesModule {}
