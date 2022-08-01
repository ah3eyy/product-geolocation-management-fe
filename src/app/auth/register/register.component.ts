import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {UtilService} from "../../services/util.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeolocationService} from '@ng-web-apis/geolocation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel = {full_name: '', email: '', password: '', phone_number: '', referred_by: ''};


  // @ts-ignore
  register: FormGroup;

  loading = false;

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserServiceService,
    public utilService: UtilService,
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private readonly geolocation$: GeolocationService
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((e) => {
      this.registerModel.referred_by = e['referral']
    })
    this.geolocation$.subscribe(position => this.updateUserCurrentLocation(position));
    this.registerInit();
  }

  location: any[] = [];

  updateUserCurrentLocation(position: any) {
    let location = [
      position.coords.latitude,
      position.coords.longitude
    ]
    this.location = location;
  }

  registerInit() {
    this.register = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }


  get f() {
    return this.register.controls;
  }


  message: any;
  type: any;
  title: any;

  accept_checked = false;

  async onRegisterAccount() {
    this.loading = true;

    //  verify
    this.submitted = true;
    if (this.register.invalid) {
      this.loading = false;
      return;
    }

    this.register.value['location'] = this.location;

    this.userService.onRegister(this.register.value).subscribe(
      (response: any) => {
        this.type = 'success';
        this.message = response.message;
        this.title = 'Account Creation';
        this.authService.login(response.data.token, response.data.user);
        this.router.navigate(['/user']);
        this.loading = false;
      },
      (error) => {
        this.type = 'error';
        this.message = error.error.message || 'An error occurred creating vendor account.';
        this.title = 'Account Creation Failed';
        this.loading = false;
      }
    );


  }

}
