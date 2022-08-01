import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {RequestPasswordResetComponent} from "./auth/request-password-reset/request-password-reset.component";
import {PasswordResetComponent} from "./auth/password-reset/password-reset.component";
import {UserComponent} from "./user/user.component";
import {AuthGuard} from "./services/auth-guard.services";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: RequestPasswordResetComponent},
  {path: 'reset-password', component: PasswordResetComponent},
  {
    path: 'user',
    component: UserComponent,
    loadChildren: () => import("./user/user.module").then(m => m.UserModule),
    canLoad: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
