import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {Route, RouterModule} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {BillServicesComponent} from './bill-services/bill-services.component';
import {BalanceBreakdownPipe} from "../pipe/balance-breakdown.pipe";

const route: Route[] = [
  {
    path: '',
    component: DashboardComponent
  },


  {
    path: 'product-details/:id',
    component: ProfileComponent
  },


  {
    path: 'create-product',
    component: BillServicesComponent
  },

]

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    BillServicesComponent,
    BalanceBreakdownPipe,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(route),
  ]
})
export class UserModule {
}
