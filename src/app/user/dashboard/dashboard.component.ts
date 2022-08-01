import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../../services/user-service.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public userService: UserServiceService,
    public utilService: UtilService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.dashboard();
  }

  data: any;


  loading = false;
  network = false;

  dashboard() {
    this.loading = true;
    this.network = false;
    this.userService.dashboard({}).subscribe(
      (response: any) => {
        this.loading = false;
        this.data = response.data;
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }

  onViewDetails(data: any) {
    this.router.navigate([`/user/product-details/${data.id}`])
  }

}
