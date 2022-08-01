import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from "../notification/notification.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FlutterwaveModule} from "flutterwave-angular-v3";
import {OnboardingComponent} from "../user/onboarding/onboarding.component";
import {environment} from "../../environments/environment";


@NgModule({
  declarations: [
    NotificationComponent,
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    NotificationComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OnboardingComponent
  ]
})
export class SharedModuleModule {
}
