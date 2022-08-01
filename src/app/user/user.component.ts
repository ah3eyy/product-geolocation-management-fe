import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UserServiceService} from "../services/user-service.service";
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  date: any;

  user: any;

  is_mobile = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    public userService: UserServiceService,
    public deviceIndicator: DeviceDetectorService
  ) {
  }

  current_date: any;

  ngOnInit(): void {
    // this.user = this.authService.getUser();
    this.date = new Date().getFullYear();

    this.current_date = new Date();
    if (this.deviceIndicator.isDesktop()) {
      this.toggle_aside = true;
    }

    if (this.deviceIndicator.isMobile())
      this.is_mobile = true;

    this.profile();
  }

  network = false;

  profile() {

    this.userService.profile({}).subscribe(
      (response: any) => {

        this.user = response.data;
        console.log(response);

      },
      (error) => {

      }
    );

  }


  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  profile_show = false;

  onToggleShow() {
    this.profile_show = !this.profile_show;
  }

  toggle_aside_shadow = false;

  toggle_aside = false;

  onToggleAside() {
    this.toggle_aside = !this.toggle_aside;
    this.toggle_aside_shadow = !this.toggle_aside_shadow;
  }

}
