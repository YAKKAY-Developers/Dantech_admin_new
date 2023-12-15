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

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'toporders',
        component: TopOrdersComponent,
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
      },
      {
        path: 'addclient',
        component: AddclientComponent,
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PagesModule {}
