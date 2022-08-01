import {Component, Input, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
import {UserServiceService} from "../../../services/user-service.service";
import {AuthService} from "../../../services/auth.service";
import {environment} from "../../../../environments/environment";

declare var MonnifySDK: any;
declare var FlutterwaveCheckout: any;

@Component({
  selector: 'app-fund-account',
  templateUrl: './fund-account.component.html',
  styleUrls: ['./fund-account.component.css']
})
export class FundAccountComponent implements OnInit, OnChanges {

  @Input() modal_type: any;
  @Input() card_info: any;
  @Output() closeModal = new EventEmitter();

  fund_account_query = {amount: '', transaction_id: ''};
  user: any;

  message: any;
  type: any;
  title: any;

  constructor(
    public userService: UserServiceService,
    public authService: AuthService,
    // public flutterwave:Flutterwave
  ) {
  }

  ngOnInit(): void {
    // this.user = this.authService.getUser();
    this.profile();
  }

  loading = true;
  network = false;

  profile() {
    this.loading = true;
    this.network = false;

    this.userService.profile({}).subscribe(
      (response: any) => {

        this.loading = false;
        this.network = false;

        this.user = response.user;

        this.customerDetails = {
          name: this.user.full_name,
          email: this.user.email,
          phone_number: this.user.phone_number
        }

        this.meta = {'consumer_id': this.user.phone_number}
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );

  }


  ngOnChanges() {
    this.modal_type = this.modal_type;
    this.card_info = this.card_info;
  }

  onCloseModal() {
    this.closeModal.emit({close: true});
  }

  //use your PUBLIC_KEY here
  publicKey = environment.flutterwave_pubkey;

  customerDetails = {name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}

  customizations = {
    title: 'Customization Title',
    description: 'Customization Description',
    logo: 'https://flutterwave.com/images/logo-colored.svg'
  }

  meta = {'consumer_id': '7898'}

  onFlutterMakePayment() {
    const modal = FlutterwaveCheckout({
      public_key: environment.flutterwave_pubkey,
      tx_ref: `REF-${this.generateReference()}`,
      amount: this.fund_account_query.amount,
      currency: "NGN",
      payment_options: "card",
      meta: this.meta,
      customer: this.customerDetails,
      callback: (response: any) => {
        modal.close();
        this.makePaymentCallback(response);
      },
      onclose: (err: any) => {
        modal.close();
      }
    });
  }

  makePaymentCallback(response: any): void {
    let query = {
      transaction_id: response.transaction_id,
      amount: this.fund_account_query.amount
    }

    this.fundWallet(query);
  }

  closedPaymentModal(): void {
    this.type = 'error';
    this.message = 'Payment closed';
    this.title = 'Account Funding'
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

  convertToFloat(amount: any) {
    return parseFloat(amount);
  }

  fund_query = {};

  fund_loader = false;

  //
  fundWallet(query: any) {
    this.fund_loader = true;
    this.userService.fundWallet(query).subscribe(
      (response: any) => {
        this.fund_loader = false;
        this.type = 'success';
        this.message = 'Account funded successfully';
        this.title = 'Account Funding'
        this.fund_account_query.amount = '';
      },
      (error) => {
        this.fund_loader = false;
        this.type = 'error';
        this.message = error.error.mes;
        this.title = 'Account Funding'
      }
    );
  }

  fundSavedCard() {
    let query = {
      card_id: this.card_info.id,
      type: 'card',
      amount: this.fund_account_query.amount
    }

    this.fundWallet(query);
  }


//  monnify implementation
  onPayWithMonnify() {
    MonnifySDK.initialize({
      amount: this.fund_account_query.amount,
      currency: "NGN",
      reference: '' + Math.floor((Math.random() * 1000000000) + 1),
      customerName: this.user.full_name,
      customerEmail: this.user.email,
      apiKey: environment.monnify_key,
      contractCode: environment.monnify_contract,
      paymentDescription: "Fund IbroLinks Account",
      isTestMode: true,
      metadata: {
        "name": "Account Funding",
        "amount": this.fund_account_query.amount
      },
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
      onComplete: (response: any) => {
        //Implement what happens when transaction is completed.
        console.log(response);

        if (!response.status && response.authorizedAmount == 0)
          return;

        let query = {
          amount: this.fund_account_query.amount,
          payment_medium: 'monnify',
          data: response,
          transaction_id: response.transactionReference,
        }

        this.fundWallet(query);

      },
      onClose: function (data: any) {
        //Implement what should happen when the modal is closed here
        console.log(data);
      }
    });
  }

}
