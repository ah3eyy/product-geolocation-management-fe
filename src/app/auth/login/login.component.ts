import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {UtilService} from "../../services/util.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel = {email: '', password: ''};

  // @ts-ignore
  login: FormGroup;

  constructor(
    public userService: UserServiceService,
    public utilService: UtilService,
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.loginInit();
  }

  loading = false;

  message: any;
  type: any;
  title: any;

  loginInit() {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.login.controls;
  }


  submitted = false

  async onLoginAccount() {
    this.loading = true;
    //  verify

    this.submitted = true;
    if (this.login.invalid) {
      this.loading = false;
      return;
    }

    this.userService.onLogin(this.login.value).subscribe(
      async (response: any) => {
        this.type = 'success';
        this.message = response.message;
        this.title = 'Access Granted';
        await this.authService.login(response.data.token, response.data.user);
        await this.authService.saveUniqueToken(response.data.unique_key);
        await this.router.navigate(['/user']);
        // @ts-ignore
        // window.location = '/user';
        // console.log('logged in successful');
        this.loading = false;
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'Opps!!! Check internet connection';
        this.title = 'Account access denied';
        this.loading = false;
      }
    );
  }
}
