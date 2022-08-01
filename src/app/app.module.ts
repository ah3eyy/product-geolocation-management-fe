import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {RequestPasswordResetComponent} from './auth/request-password-reset/request-password-reset.component';
import {PasswordResetComponent} from './auth/password-reset/password-reset.component';
import {NotificationComponent} from './notification/notification.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModuleModule} from "./shared-module/shared-module.module";
import {AuthService} from "./services/auth.service";
import {AuthHttpInterceptor} from "./services/auth-http-interceptor";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        RequestPasswordResetComponent,
        PasswordResetComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModuleModule
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
