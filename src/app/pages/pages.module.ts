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
import { WorkflowsComponent } from './workflows/workflows.component';
import { WorkflowDetailComponent } from './workflow-detail/workflow-detail.component';
import { DepartmentComponent } from './department/department.component';
import { WorkflowStepComponent } from './workflow-step/workflow-step.component';
import { EditWorkflowstepsComponent } from './edit-workflowsteps/edit-workflowsteps.component';
import { AllDepartmentComponent } from './all-department/all-department.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { CompletedOrderComponent } from './completed-order/completed-order.component';


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
        path: 'completedorder',
        component: CompletedOrderComponent,
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
        path: 'workflow',
        component:WorkflowsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'workflowdetail/:id',
        component:WorkflowDetailComponent,
        canActivate: [authGuard],
      },

      {
        path: 'addDept',
        component:DepartmentComponent,
        canActivate: [authGuard],
      },

      {
        path: 'workflowstep/:id',
        component:WorkflowStepComponent,
        canActivate: [authGuard],
      },


      {
        path: 'editStep/:id',
        component:EditWorkflowstepsComponent,
        canActivate: [authGuard],
      },


      {
        path: 'allDept',
        component:AllDepartmentComponent,
        canActivate: [authGuard],
      },


      {
        path: 'departmentDetail/:id',
        component:DepartmentDetailComponent,
        canActivate: [authGuard],
      },

      {
        path:'form/:id',
        component:OrderFormComponent
      }




      
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
    WorkflowsComponent,
    WorkflowDetailComponent,
    DepartmentComponent,
    WorkflowStepComponent,
    EditWorkflowstepsComponent,
    AllDepartmentComponent,
    DepartmentDetailComponent,
    OrderFormComponent,
    CompletedOrderComponent,
  
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PagesModule {}
