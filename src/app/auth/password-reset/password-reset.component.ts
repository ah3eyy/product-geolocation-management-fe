import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {UtilService} from "../../services/util.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetModel = {password: '', confirm_password: '', code: ''};

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

    this.userService.onResetPassword(this.resetModel).subscribe(
      (response: any) => {
        this.type = 'success';
        this.message = response.message;
        this.title = 'Reset Password';
        this.loading = false;

        setTimeout(async () => {
          this.router.navigate(['/']);
        }, 1000)
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'An error occurred resetting password.';
        this.title = 'Reset Password Failed';
        this.loading = false;
      }
    );
  }
}
