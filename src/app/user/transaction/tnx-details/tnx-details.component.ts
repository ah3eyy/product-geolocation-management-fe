import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../../services/user-service.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-tnx-details',
  templateUrl: './tnx-details.component.html',
  styleUrls: ['./tnx-details.component.css']
})
export class TnxDetailsComponent implements OnInit {

  loading = false;

  network = false;
  transaction_id: string | undefined;

  constructor(
    public userService: UserServiceService,
    public activateRoute: ActivatedRoute,
    public location: Location
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.activateRoute.params.subscribe(e => {
      this.transaction_id = e['ref'];
    })
    this.onFetchTransactionDetails();
  }

  onBack() {
    this.location.back();
  }

  transactions: any;
  epin:any;
  education: any;

  onFetchTransactionDetails() {
    this.loading = true;
    this.network = false;
    this.userService.transactionDetails({tid: this.transaction_id}).subscribe(
      (response: any) => {
        this.loading = false;
        this.transactions = response.data;

        if (this.transactions.transaction.education_record)
          this.education = JSON.parse(this.transactions.transaction.education_record);

        if (this.transactions.transaction.epin)
          this.epin = JSON.parse(this.transactions.transaction.epin);

      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }

  print_value = false;

}
