import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../../../services/user-service.service";
import {AuthService} from "../../../services/auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-bill-purchase',
  templateUrl: './bill-purchase.component.html',
  styleUrls: ['./bill-purchase.component.css']
})
export class BillPurchaseComponent implements OnInit {

  service_type: any;

  user: any;

  bills: any;

  loading = false;
  network = false;


  message: any;
  type: any;
  title: any;

  electricity_payment_type = ['prepaid', 'postpaid'];
  airtime_to_cash_payment_type = ['pin', 'share_n_sell'];

  initialize_query = {
    service_type: '',
    biller_number: '',
    amount: '',
    service_id: '',
    sub_service_id: '',
    package_id: '',
    type: '',
    duration: '',
    addon: '',
    addon_duration: ''
  }

  cardColors: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserServiceService,
    public router: Router,
    public authService: AuthService,
    public location: Location
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((e) => {
      this.service_type = e['bill']
    });
    this.initialize_query.service_type = this.service_type
    this.cardColors = this.userService.serviceBGColors();
    this.serviceDetails();
  }

  onBack() {

    if (this.preview)
      this.preview = !this.preview;

    if (!this.preview)
      this.location.back();

  }

  serviceDetails() {
    this.loading = true;
    this.network = false;
    this.userService.billDetails({service_id: this.service_type}).subscribe(
      (response: any) => {
        this.loading = false;
        this.bills = response.data;
        this.bills.data_grouped = [];
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }

  preview = false;

  // this.type = 'error';
  // this.message = check['message'];
  // this.title = 'Input Validation Failed'

  initialize_loader = false;

  initialize_data: any;

  data = {};

  onInitializePurchase() {

    this.initialize_loader = true;

    this.userService.initializePurchase(this.initialize_query).subscribe(
      (response: any) => {
        this.initialize_loader = false;
        this.initialize_data = response.data;
        this.initialize_loader = false;
        this.type = 'success';
        this.message = 'Purchase initialize. Proceed to confirm purchase';
        this.title = 'Purchase Initialization'
        this.preview = true;
        this.setSelectedServiceType();
      },
      (error) => {
        this.initialize_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred initializing purchase';
        this.title = 'Purchase initialization'
      }
    );
  }

  selected_sub_service: any;

  setSelectedServiceType() {
    for (let i = 0; i < this.bills.sub_services.length; i++) {
      if (this.bills.sub_services[i]['id'] == this.initialize_query.sub_service_id)
        this.selected_sub_service = this.bills.sub_services[i];
    }
  }

  onCancelPurchase() {
    this.preview = !this.preview;
  }

  purchase_service_loader = false;

  purchaseService() {
    this.purchase_service_loader = true;
    switch (this.service_type) {
      case 'airtime':
        this.onPurchaseAirtime();
        break;
      case 'data':
        this.onPurchaseData();
        break;
      case 'electricity':
        this.onElectricityPurchase();
        break;
      case 'education':
        this.onPurchaseEducationalScratchCard();
        break;
      case 'airtime_to_cash':
        this.onAirtimeToCashQuery();
        break;
      case 'airtime_e_pin':
        this.onAirtimeEpinPurchase();
        break;
      case 'data_e_pin':
        this.onDataEpinPurchase();
        break;
      case 'cable':
        this.onPurchaseCable();
        break;
    }

  }

  airtime_query = {
    sub_service_id: '',
    amount: '',
    phone_number: '',
    pin: ''
  }

  onPurchaseAirtime() {
    this.airtime_query = {
      sub_service_id: this.initialize_query.sub_service_id,
      amount: this.initialize_query.amount,
      phone_number: this.initialize_query.biller_number,
      pin: this.airtime_query.pin
    }
    this.userService.purchaseAirtime(this.airtime_query).subscribe(
      (response: any) => {
        this.purchase_service_loader = false;
        this.type = 'success';
        this.message = 'Airtime purchased successfully';
        this.title = 'Airtime'
        this.preview = true;
        this.router.navigate([`/user/transaction-details/${response.data.transaction.reference}`]);
      },
      (error) => {
        this.purchase_service_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred purchasing airtime';
        this.title = 'Purchase Airtime'
      }
    );
  }

//  data process
  plan: any;

  all_selected_packages = [];

  selected_plan: any;

  onSelectCurrentPlan() {

    if (!this.plan || this.plan.length == 0)
      return;

    for (let i = 0; i < this.plan.length; i++) {
      if (this.plan[i]['id'] == this.initialize_query.package_id)
        this.selected_plan = this.plan[i];
    }

  }

  onChangeDataNetwork(event: any) {

    this.setSelectedServiceType();

    this.bills.data_grouped = this.selected_sub_service.groupings;

    this.all_selected_packages = this.selected_sub_service.packages;

  }

  onChangeGroupData(event: any) {
    this.plan = [];
    for (let i = 0; i < this.all_selected_packages.length; i++) {
      if (event.target.value == 'null')
        if (!this.all_selected_packages[i]['group_by'])
          this.plan = [...this.plan, this.all_selected_packages[i]];

      if (this.all_selected_packages[i]['group_by'] == event.target.value)
        this.plan = [...this.plan, this.all_selected_packages[i]];
    }
  }

  onSelectPlanPackage() {
    this.onSelectCurrentPlan();
    this.initialize_query.amount = this.selected_plan.amount;
  }

  data_query = {
    package_id: '',
    phone_number: '',
    pin: ''
  }

  onPurchaseData() {
    this.data_query = {
      package_id: this.initialize_query.package_id,
      phone_number: this.initialize_query.biller_number,
      pin: this.airtime_query.pin
    }
    this.userService.purchaseData(this.data_query).subscribe(
      (response: any) => {
        // this.purchase_service_loader = false;
        this.type = 'success';
        this.message = 'Data purchased successfully';
        this.title = 'Data Purchase'
        this.preview = true;
        this.router.navigate([`/user/transaction-details/${response.data.transaction.reference}`]);
      },
      (error) => {
        this.purchase_service_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred purchasing airtime';
        this.title = 'Purchase Data'
      }
    );
  }


//  electricity process
  discos: any;

  all_selected_discos = [];

  selected_discos: any;

  onChangeGroupState(event: any) {
    this.discos = [];
    this.all_selected_discos = this.bills['sub_services'];
    for (let i = 0; i < this.all_selected_discos.length; i++) {
      if (event.target.value == 'null')
        if (!this.all_selected_discos[i]['group_by'])
          this.discos = [...this.discos, this.all_selected_packages[i]];

      // @ts-ignore
      if (this.all_selected_discos[i]['group_by'].split(',').includes(event.target.value))
        this.discos = [...this.discos, this.all_selected_discos[i]];
    }
  }

  onSelectCurrentDisco() {

    if (!this.discos || this.discos.length == 0)
      return;

    for (let i = 0; i < this.discos.length; i++) {
      if (this.discos[i]['id'] == this.initialize_query.sub_service_id)
        this.selected_discos = this.plan[i];
    }

  }

  onSelectDiscoPackage() {
  }

  electricity_query = {
    service_id: '',
    meter_number: '',
    type: '',
    pin: '',
    amount: ''
  }

  onElectricityPurchase() {
    this.electricity_query = {
      service_id: this.initialize_query.sub_service_id,
      meter_number: this.initialize_query.biller_number,
      type: this.initialize_query.type,
      pin: this.airtime_query.pin,
      amount: this.initialize_query.amount
    }

    this.userService.purchaseElectricity(this.electricity_query).subscribe(
      (response: any) => {
        this.purchase_service_loader = false;
        this.type = 'success';
        this.message = 'Electricity purchased successfully';
        this.title = 'Electricity Purchase'
        this.preview = true;
        this.router.navigate([`/user/transaction-details/${response.data.transaction.reference}`]);
      },
      (error) => {
        this.purchase_service_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred purchasing electricity';
        this.title = 'Electricity Purchase'
      }
    );
  }

//  educational purchase

  onEducationPackageSelected() {

    if (!this.plan || this.plan.length == 0)
      return;

    for (let i = 0; i < this.plan.length; i++) {
      if (this.plan[i]['id'] == this.initialize_query.package_id) {
        this.selected_plan = this.plan[i];
        this.initialize_query.amount = this.selected_plan.amount;
      }
    }
  }

  onChangeEducationService(event: any) {

    this.setSelectedServiceType();

    this.plan = this.selected_sub_service.packages;

  }

  educational_query = {
    package_id: '',
    pin: ''
  }

  onPurchaseEducationalScratchCard() {
    this.educational_query = {
      package_id: this.initialize_query.package_id,
      pin: this.airtime_query.pin
    }
    this.userService.purchaseData(this.educational_query).subscribe(
      (response: any) => {
        this.purchase_service_loader = false;
        this.type = 'success';
        this.message = 'Scratch card purchased successfully';
        this.title = 'Education Card Purchase'
        this.preview = true;
        this.router.navigate([`/user/transaction-details/${response.data.transaction.reference}`]);
      },
      (error) => {
        this.purchase_service_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred purchasing scratch card';
        this.title = 'Education Card Purchase'
      }
    );
  }

//  airtime to case

  airtime_to_cash_query = {amount: ""}

  onCalculateAmountToCredit(event: any) {

    let user = this.authService.getUser().account_level || this.authService.getUser().current_level;
    this.setSelectedServiceType();

    let deduction_percentage = this.selected_sub_service[`${user}_discount`];

    let percentage = deduction_percentage / 100;

    let value = percentage * parseFloat(this.initialize_query.amount);

    this.airtime_query.amount = (parseFloat(this.initialize_query.amount) - value).toString();

  }

  airtime_to_case_query = {
    sub_service_id: '',
    biller_number: '',
    type: '',
    pin: '',
    amount: ''
  }

  onAirtimeToCashQuery() {
    this.airtime_to_case_query = {
      sub_service_id: this.initialize_query.sub_service_id,
      biller_number: this.initialize_query.biller_number,
      type: this.initialize_query.type,
      pin: this.airtime_query.pin,
      amount: this.initialize_query.amount
    }

    this.userService.purchaseAirtimeToCash(this.airtime_to_case_query).subscribe(
      (response: any) => {
        this.purchase_service_loader = false;
        this.type = 'success';
        this.message = 'Purchase request submitted and account would be credited on confirmation';
        this.title = 'Airtime To Cash Purchase'
        this.preview = true;
        this.router.navigate([`/user/transaction-details/${response.data.transaction.reference}`]);
      },
      (error) => {
        this.purchase_service_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred processing request for purchase';
        this.title = 'Airtime To Cash Purchase'
      }
    );
  }

//  airtime to cash ends

//  airtime epin case
  airtime_epin_query = {
    sub_service_id: '',
    amount: '',
    pin: ''
  };

  onAirtimeEpinPurchase() {
    this.airtime_epin_query = {
      sub_service_id: this.initialize_query.sub_service_id,
      pin: this.airtime_query.pin,
      amount: this.initialize_query.amount
    }

    this.userService.purchaseAirtimeEPinPurchase(this.airtime_epin_query).subscribe(
      (response: any) => {
        this.purchase_service_loader = false;
        this.type = 'success';
        this.message = 'Purchase successfully';
        this.title = 'Airtime Epin Purchase'
        this.preview = true;
        this.router.navigate([`/user/transaction-details/${response.data.transaction.reference}`]);
      },
      (error) => {
        this.purchase_service_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred processing request for purchase';
        this.title = 'Airtime To Cash Purchase'
      }
    );
  }

//  end airtime purchase


//  data epin case
  data_epin_query = {
    sub_service_id: '',
    amount: '',
    pin: ''
  };

  onDataEpinPurchase() {
    this.data_epin_query = {
      sub_service_id: this.initialize_query.sub_service_id,
      pin: this.airtime_query.pin,
      amount: this.initialize_query.amount
    }

    this.userService.purchaseDataEPinPurchase(this.data_epin_query).subscribe(
      (response: any) => {
        this.purchase_service_loader = false;
        this.type = 'success';
        this.message = 'Purchase successful';
        this.title = 'Data Epin Purchase'
        this.preview = true;
        this.router.navigate([`/user/transaction-details/${response.data.transaction.reference}`]);
      },
      (error) => {
        this.purchase_service_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred processing request for purchase';
        this.title = 'Data EPin Purchase'
      }
    );
  }

//  end data purchase


//  start cable purchase

  onSelectCurrentCablePlan() {

    if (!this.cablePlan || this.cablePlan.length == 0)
      return;

    for (let i = 0; i < this.cablePlan.length; i++) {
      if (this.cablePlan[i]['id'] == this.initialize_query.package_id)
        this.selected_plan = this.cablePlan[i];
    }

  }

  duration_amount: any = [];

  addons: any = [];

  onChangeSelectCurrentPackage(event: any) {
    this.onSelectCurrentCablePlan();

    this.initialize_query.amount = this.selected_plan.amount;

    let extra_mediums = this.selected_plan['extra_mediums']

    if (extra_mediums.length > 0) {

      if (extra_mediums[0]['data'])
        this.duration_amount = JSON.parse(extra_mediums[0]['data']);

      if (extra_mediums[0]['addon_data'])
        this.addons = JSON.parse(extra_mediums[0]['addon_data']);

    }
  }

  selected_duration: any

  onSetAmountForCable(event: any) {
    this.selected_duration = this.duration_amount[event.target.value];

    if (this.selected_duration)
      this.initialize_query.amount = this.selected_duration.price;
  }

  addon_duration: any = [];
  selected_addon: any;

  onSelectAddonDuration(event: any) {
    this.selected_addon = this.addons[event.target.value];
    console.log(this.selected_addon)
    if (this.selected_addon)
      this.addon_duration = this.selected_addon.availablePricingOptions;
  }

  onSelectCurrentCable() {
    for (let i = 0; i < this.bills.sub_services.length; i++) {
      if (this.bills.sub_services[i]['id'] == this.initialize_query.sub_service_id)
        this.selected_sub_service = this.bills.sub_services[i];
    }
  }

  cablePlan: any = [];

  onChangeCableSelectNetwork(event: any) {
    this.onSelectCurrentCable();
    this.cablePlan = this.selected_sub_service.packages;
  }


  verifying_loader = false;
  verified_status_failed = false;
  verify_data: any;

  confirm_upgrade_top_up = false;

  confirmUpgradeTopUp() {
    this.confirm_upgrade_top_up = !this.confirm_upgrade_top_up;

    this.initialize_query.amount = this.verify_data.renewal_amount;
  }

  onChangeVerifyMerchant(event: any) {

    this.verifying_loader = true;
    this.userService.verifyMerchant(this.initialize_query).subscribe(
      (response: any) => {
        this.verifying_loader = false;
        this.verify_data = response.data.extra_info;
        this.verified_status_failed = false;
      },
      (error) => {
        this.verifying_loader = false;
        this.verified_status_failed = true;
      }
    );
  }

  cable_query: any = {};

  onPurchaseCable() {
    this.cable_query = {
      package_id: this.initialize_query.package_id,
      smart_card_number: this.initialize_query.biller_number,
      pin: this.airtime_query.pin,
      addons: this.selected_addon,
      duration: this.selected_duration,
      addon_duration: this.addon_duration[this.initialize_query.addon_duration],
      amount: this.initialize_query.amount,
      renew_data: this.verify_data,
      subscription_type: this.confirm_upgrade_top_up ? 'renew' : 'change'
    }

    if (this.cable_query.subscription_type == 'change') {
      this.cable_query.renew_data['addon_duration_selected'] = this.cable_query.addon_duration;
      this.cable_query.renew_data['duration'] = this.cable_query.duration;
      this.cable_query.renew_data['addon'] = this.cable_query.addons
    }

    this.userService.purchaseCable(this.cable_query).subscribe(
      (response: any) => {
        this.purchase_service_loader = false;
        this.type = 'success';
        this.message = 'Data purchased successfully';
        this.title = 'Data Purchase'
        this.preview = true;
        this.router.navigate([`/user/transaction-details/${response.data.transaction.reference}`]);
      },
      (error) => {
        this.purchase_service_loader = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred purchasing airtime';
        this.title = 'Purchase Data'
      }
    );
  }

//  end cable purchase
}
