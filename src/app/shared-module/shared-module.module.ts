import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from "../notification/notification.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FlutterwaveModule} from "flutterwave-angular-v3";
import {environment} from "../../environments/environment";


@NgModule({
  declarations: [
    NotificationComponent
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
    HttpClientModule
  ]
})
export class SharedModuleModule {
}
