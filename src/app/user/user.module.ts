import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {Route, RouterModule} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {WalletComponent} from './wallet/wallet.component';
import {FundAccountComponent} from './wallet/fund-account/fund-account.component';
import {ProfileComponent} from './profile/profile.component';
import {TransactionComponent} from './transaction/transaction.component';
import {TnxDetailsComponent} from './transaction/tnx-details/tnx-details.component';
import {ServicesComponent} from './services/services.component';
import {BillServicesComponent} from './bill-services/bill-services.component';
import {BillPurchaseComponent} from './bill-services/bill-purchase/bill-purchase.component';
import {OnboardingComponent} from "./onboarding/onboarding.component";
import {FlutterwaveModule} from "flutterwave-angular-v3";
import {BalanceBreakdownPipe} from "../pipe/balance-breakdown.pipe";
import { AccountUpgradeComponent } from './profile/account-upgrade/account-upgrade.component';


const route: Route[] = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'on-boarding',
    component: OnboardingComponent
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'product-details/:id',
    component: ProfileComponent
  },
  {
    path: 'transaction',
    component: TransactionComponent
  },
  {
    path: 'transaction-details/:ref',
    component: TnxDetailsComponent
  },
  {
    path: 'create-product',
    component: BillServicesComponent
  },
  {
    path: 'bill-purchase/:bill',
    component: BillPurchaseComponent
  }
]

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    WalletComponent,
    FundAccountComponent,
    ProfileComponent,
    TransactionComponent,
    TnxDetailsComponent,
    ServicesComponent,
    BillServicesComponent,
    BillPurchaseComponent,
    BalanceBreakdownPipe,
    AccountUpgradeComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(route),
    FlutterwaveModule
  ]
})
export class UserModule {
}
