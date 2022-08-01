import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {UtilService} from "../../services/util.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent implements OnInit {


  resetModel = {email: ''};

  constructor(
    public userService: UserServiceService,
    public utilService: UtilService,
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  loading = false;

  message: any;
  type: any;
  title: any;

  async onResetPassword() {

    this.loading = true;
    //  verify
    let check = await this.utilService.validateQueryForEmptyChecks(this.resetModel);

    if (check.status == 'failed') {
      this.type = 'error';
      this.message = check['message'];
      this.title = 'Input Validation Failed'
      this.loading = false;
      return;
    }

    this.userService.onRequestPasswordReset(this.resetModel).subscribe(
      (response: any) => {
        this.type = 'success';
        this.message = response.message;
        this.title = 'Forgot Password';
        this.loading = false;

        setTimeout(async () => {
          this.router.navigate(['/reset-password']);
        }, 1000)
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'An error occurred resetting password.';
        this.title = 'Failed';
        this.loading = false;
      }
    );
  }
}
