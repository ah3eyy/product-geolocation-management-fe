import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../../services/user-service.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  current_tap = 'email';

  user: any;

  constructor(public authService: AuthService, public activatedRoute: ActivatedRoute, public userService: UserServiceService,
              public utilService: UtilService,
              public router: Router
  ) {
  }

  message: any;
  type: any;
  title: any;

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.activatedRoute.queryParams.subscribe((e) => {
      if (e['step'])
        this.current_tap = e['step'];
    });


    this.onSetCurrentTap();
  }


  onSetCurrentTap() {

    if (this.user.is_email_verified && this.current_tap == 'email') {
      this.current_tap = 'phone';
    }

    if (this.user.is_phone_verified && this.current_tap == 'phone') {
      this.current_tap = 'pin';
    }

    if (this.current_tap == 'bvn' && !this.user.is_bvn_verified) {
      this.current_tap = 'bvn';
    }

    if (this.user.user_pin && this.current_tap == 'pin') {
      this.router.navigate(['/user']);
    }

  }


  resend_verification_query = {medium: ''};

  resend_loader = false;

  onResendEmailVerification() {
    this.resend_loader = true;
    this.resend_verification_query.medium = this.current_tap;
    this.userService.onResendVerificationCode(this.resend_verification_query).subscribe(
      (response: any) => {
        this.type = 'success';
        this.message = response.message;
        this.title = 'Resend verification code';
        this.resend_loader = false;
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'An error occurred creating vendor account.';
        this.title = 'Resend Verification Code';
        this.resend_loader = false;
      }
    );
  }

  verify_email_loader = false;
  verify_email_query = {code: ''};

  async onVerifyEmailAddress() {
    this.verify_email_loader = true;

    let check = await this.utilService.validateQueryForEmptyChecks(this.verify_email_query);

    if (check.status == 'failed') {
      this.type = 'error';
      this.message = check['message'];
      this.title = 'Input Validation Failed'
      this.verify_email_loader = false;
      return;
    }
    this.userService.emailVerification(this.verify_email_query).subscribe(
      (response: any) => {
        this.type = 'success';
        this.message = response.message;
        this.title = 'Email Verified';
        this.verify_email_loader = false;
        this.current_tap = 'phone';
        this.authService.saveUser(response.data.user);
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'An error occurred verifying email address.';
        this.title = 'verification failed';
        this.verify_email_loader = false;
      }
    );
  }

  verify_phone_loader = false;
  verify_phone_query = {code: ''};

  async onVerifyPhoneNumber() {
    this.verify_phone_loader = true;

    let check = await this.utilService.validateQueryForEmptyChecks(this.verify_phone_query);

    if (check.status == 'failed') {
      this.type = 'error';
      this.message = check['message'];
      this.title = 'Input Validation Failed'
      this.verify_phone_loader = false;
      return;
    }
    this.userService.phoneVerification(this.verify_phone_query).subscribe(
      (response: any) => {
        this.type = 'ccc';
        this.message = response.message;
        this.title = 'Phone Number Verified';
        this.verify_phone_loader = false;
        this.current_tap = 'pin';
        this.authService.saveUser(response.data.user);
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'An error occurred verifying phone number.';
        this.title = 'verification failed';
        this.verify_phone_loader = false;
      }
    );
  }

  set_pin_loader = false;
  set_pin_query = {pin: '', confirm_pin: ''};

  async onSetPin() {
    this.set_pin_loader = true;

    let check = await this.utilService.validateQueryForEmptyChecks(this.set_pin_query);

    if (this.set_pin_query.pin.length > 3 || this.set_pin_query.pin.length < 3) {
      this.type = 'error';
      this.message = 'Pin can not be less or greater than 4 characters';
      this.title = 'Pin Set'
      this.set_pin_loader = false;
      return;
    }

    if (this.set_pin_query.pin != this.set_pin_query.confirm_pin) {
      this.type = 'error';
      this.message = 'Pin does not match';
      this.title = 'Pin Set'
      this.set_pin_loader = false;
      return;
    }

    if (check.status == 'failed') {
      this.type = 'error';
      this.message = check['message'];
      this.title = 'Input Validation Failed'
      this.set_pin_loader = false;
      return;
    }
    this.userService.setPin(this.set_pin_query).subscribe(
      (response: any) => {
        this.type = 'success';
        this.message = response.message;
        this.title = 'Transaction pin set successfully';
        this.set_pin_loader = false;
        this.authService.saveUser(response.data.user);
        this.router.navigate(['/user'])
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'An error occurred setting pin.';
        this.title = 'transaction pin failed';
        this.set_pin_loader = false;
      }
    );
  }

  bvn_verification_loader = false;
  bvn_verification_query = {bvn: ''};

  on_proceed_to_confirm = false;

  onProceedToConfirm(){
    this.on_proceed_to_confirm = !this.on_proceed_to_confirm;
  }

  async onBVNVerification() {
    this.bvn_verification_loader = true;

    //  verify
    let check = await this.utilService.validateQueryForEmptyChecks(this.bvn_verification_query);

    if (check.status == 'failed') {
      this.type = 'error';
      this.message = check['message'];
      this.title = 'Input Validation Failed'
      this.bvn_verification_loader = false;
      return;

    }

    this.userService.bvnVerification(this.bvn_verification_query).subscribe(
      (response: any) => {
        this.type = 'success';
        this.message = response.message;
        this.title = 'BVN Verification';
        this.bvn_verification_loader = false;
        this.bvn_verification_query = {bvn: ''};
        this.authService.saveUser(response.data.user);
        this.router.navigate(['/user']);
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'An error occurred verifying BVN.';
        this.title = 'BVN Verification';
        this.bvn_verification_loader = false;
      })
  }

}
