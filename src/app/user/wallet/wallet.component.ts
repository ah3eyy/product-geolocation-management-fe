import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {


  user: any;

  wallet: any;

  loading = false;
  network = false;

  virtual_account: any;
  virtual_alternative_account: any;

  constructor(
    public userService: UserServiceService,
    public authService: AuthService,
  ) {
  }

  virtual_account_list = [];

  ngOnInit(): void {
    this.user = this.authService.getUser();

    if (!this.user)
      this.profile();

    if (this.user) {
      this.setVirtualAccountSetUp();
    }

    this.userWallet();

  }

  setVirtualAccountSetUp() {

    if (this.user.virtual_account)
      this.virtual_account = JSON.parse(this.user.virtual_account);

    if (this.user.virtual_account_alternate)
      this.virtual_alternative_account = JSON.parse(this.user.virtual_account_alternate);

    // @ts-ignore
    this.virtual_account_list = [...this.virtual_account_list, this.virtual_account, this.virtual_alternative_account];

    console.log(this.virtual_account_list);

  }

  profile() {
    this.loading = true;
    this.network = false;

    this.userService.profile({}).subscribe(
      (response: any) => {

        this.user = response.user;

        console.log(this.user);

        this.setVirtualAccountSetUp();

        this.loading = false;
        this.network = false;
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );

  }


  userWallet() {
    this.loading = true;
    this.network = false;
    this.userService.wallets({}).subscribe(
      (response: any) => {
        this.loading = false;
        this.wallet = response.data;
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }


  onCloseGeneralFunding() {
    this.select_funding = false;
    this.fund_wallet_modal = false;
  }


  selected_funding_method: any;
  select_funding = false;

  onSelectFundingMethod(event: any) {
    this.selected_funding_method = event;
    this.select_funding = true;
  }


  fund_wallet_modal = false;
  fund_wallet_model_type: any;
  card_selected: any;

  onSelectFundWallet(model_type: any, card_selected: any = null) {
    this.fund_wallet_modal = !this.fund_wallet_modal;
    this.fund_wallet_model_type = model_type;
    if (card_selected)
      this.card_selected = card_selected;
  }

  onCloseModal() {
    this.fund_wallet_modal = !this.fund_wallet_modal;
    this.userWallet();
  }

  onCopyValue(value: any) {
    let listener = (e: ClipboardEvent) => {
      // @ts-ignore
      e.clipboardData.setData('text/plain', (value));
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

}
