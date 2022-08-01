import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserServiceService} from "../../services/user-service.service";
import {UtilService} from "../../services/util.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;


  loading = false;

  message: any;
  type: any;
  title: any;


  referral_link: any;

  constructor(
    public authService: AuthService,
    public userService: UserServiceService,
    public utilService: UtilService,
    public dom: DomSanitizer,
    public activated: ActivatedRoute
  ) {
  }

  product_id: any;

  ngOnInit(): void {
    // this.user = this.authService.getUser();
    // @ts-ignore
    this.product_id = <any>this.activated.params['value'].id;
    this.product();
    this.comments();
  }

  network = false;

  secretManager: any;

  details: any;

  product() {
    this.loading = true;
    this.network = false;

    this.userService.products(this.product_id).subscribe(
      (response: any) => {

        this.loading = false;
        this.network = false;

        this.details = response.data;
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );

  }

  commentDetails: any[] = [];

  comments() {
    this.loading = true;
    this.network = false;

    this.userService.comments(this.product_id).subscribe(
      (response: any) => {

        this.loading = false;
        this.network = false;

        this.commentDetails = response.data;
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }

  create_comment = {comments: '', product_id: '', parent_comment: ''};

  create_comment_loader = false;

  createComments() {

    if (!this.create_comment.comments)
      return;

    this.create_comment_loader = true;

    this.create_comment.product_id = this.product_id

    this.userService.createComments(this.create_comment).subscribe(
      (response: any) => {

        this.create_comment_loader = false;

        this.create_comment = {comments: '', product_id: '', parent_comment: ''};
        this.comments();
      },
      (error) => {
        this.create_comment_loader = false;
      }
    );
  }

  replyComment(parent_comment: any) {
    if (!this.create_comment.comments)
      return;


    this.create_comment_loader = true;

    // this.create_comment.product_id = this.product_id

    this.create_comment['parent_comment'] = <any>parent_comment;

    this.userService.createComments(this.create_comment).subscribe(
      (response: any) => {

        this.create_comment_loader = false;

        this.create_comment = {comments: '', product_id: '', parent_comment: ''};
        this.comments();
      },
      (error) => {
        this.create_comment_loader = false;
      }
    );
  }


}
