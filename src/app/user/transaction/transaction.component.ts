import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  user: any;

  transactions: any;

  loading = false;
  network = false;

  constructor(
    public userService: UserServiceService,
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.userTransactions();
  }

  page: any

  search_value = {value: ''};
  arr = <any>[];

  userTransactions(next_page = null) {
    let query = <any>{
      page: this.page
    }

    if (this.search_value.value) {
      query['search_value'] = this.search_value.value;
      query.page = null;
    }

    if (next_page)
      query['next_page'] = next_page;

    this.loading = true;
    this.network = false;
    this.userService.transaction(query).subscribe(
      (response: any) => {
        this.loading = false;
        this.transactions = response.transaction;

        if (this.transactions.data.length > 0)
          this.arr = Array.from(new Array(this.transactions.last_page), (x, i) => i + 1)
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }

  onViewTransactionDetails(data: any) {
    this.router.navigate([`/user/transaction-details/${data.reference}`])
  }

}
