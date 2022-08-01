import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = environment.url;

  constructor(public _httpClient: HttpClient) {
  }

  banks() {
    return [
      {
        "Id": 132,
        "Code": "560",
        "Name": "Page MFBank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 133,
        "Code": "304",
        "Name": "Stanbic Mobile Money",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 134,
        "Code": "308",
        "Name": "FortisMobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 135,
        "Code": "328",
        "Name": "TagPay",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 136,
        "Code": "309",
        "Name": "FBNMobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 137,
        "Code": "011",
        "Name": "First Bank of Nigeria",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "FBNINGLA",
        "branches": null
      },
      {
        "Id": 138,
        "Code": "326",
        "Name": "Sterling Mobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 139,
        "Code": "990",
        "Name": "Omoluabi Mortgage Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 140,
        "Code": "311",
        "Name": "ReadyCash (Parkway)",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 141,
        "Code": "057",
        "Name": "Zenith Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "ZEIBNGLA",
        "branches": null
      },
      {
        "Id": 142,
        "Code": "068",
        "Name": "Standard Chartered Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "SCBLNGLA",
        "branches": null
      },
      {
        "Id": 143,
        "Code": "306",
        "Name": "eTranzact",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 144,
        "Code": "070",
        "Name": "Fidelity Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 145,
        "Code": "023",
        "Name": "CitiBank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "CITINGLA",
        "branches": null
      },
      {
        "Id": 146,
        "Code": "215",
        "Name": "Unity Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "ICITNGLA",
        "branches": null
      },
      {
        "Id": 147,
        "Code": "323",
        "Name": "Access Money",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 148,
        "Code": "302",
        "Name": "Eartholeum",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 149,
        "Code": "324",
        "Name": "Hedonmark",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 150,
        "Code": "325",
        "Name": "MoneyBox",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 151,
        "Code": "301",
        "Name": "JAIZ Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "JAIZNGLA",
        "branches": null
      },
      {
        "Id": 152,
        "Code": "050",
        "Name": "Ecobank Plc",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "ECOCNGLA",
        "branches": null
      },
      {
        "Id": 153,
        "Code": "307",
        "Name": "EcoMobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 154,
        "Code": "318",
        "Name": "Fidelity Mobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 155,
        "Code": "319",
        "Name": "TeasyMobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 156,
        "Code": "999",
        "Name": "NIP Virtual Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 157,
        "Code": "320",
        "Name": "VTNetworks",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 158,
        "Code": "221",
        "Name": "Stanbic IBTC Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 159,
        "Code": "501",
        "Name": "Fortis Microfinance Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 160,
        "Code": "329",
        "Name": "PayAttitude Online",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 161,
        "Code": "322",
        "Name": "ZenithMobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 162,
        "Code": "303",
        "Name": "ChamsMobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 163,
        "Code": "403",
        "Name": "SafeTrust Mortgage Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 164,
        "Code": "551",
        "Name": "Covenant Microfinance Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 165,
        "Code": "415",
        "Name": "Imperial Homes Mortgage Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 166,
        "Code": "552",
        "Name": "NPF MicroFinance Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 167,
        "Code": "526",
        "Name": "Parralex",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 168,
        "Code": "035",
        "Name": "Wema Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "WEMANGLA",
        "branches": null
      },
      {
        "Id": 169,
        "Code": "084",
        "Name": "Enterprise Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 170,
        "Code": "063",
        "Name": "Diamond Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 171,
        "Code": "305",
        "Name": "Paycom",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 172,
        "Code": "100",
        "Name": "SunTrust Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 173,
        "Code": "317",
        "Name": "Cellulant",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 174,
        "Code": "401",
        "Name": "ASO Savings and & Loans",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 175,
        "Code": "030",
        "Name": "Heritage",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "HBCLNGLA",
        "branches": null
      },
      {
        "Id": 176,
        "Code": "402",
        "Name": "Jubilee Life Mortgage Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 177,
        "Code": "058",
        "Name": "GTBank Plc",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "GTBINGLA",
        "branches": null
      },
      {
        "Id": 178,
        "Code": "032",
        "Name": "Union Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "UBNINGLA",
        "branches": null
      },
      {
        "Id": 179,
        "Code": "232",
        "Name": "Sterling Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "NAMENGLA",
        "branches": null
      },
      {
        "Id": 180,
        "Code": "076",
        "Name": "Skye Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 181,
        "Code": "082",
        "Name": "Keystone Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "PLNINGLA",
        "branches": null
      },
      {
        "Id": 182,
        "Code": "327",
        "Name": "Pagatech",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 183,
        "Code": "559",
        "Name": "Coronation Merchant Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 184,
        "Code": "601",
        "Name": "FSDH",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "FSDHNGLA",
        "branches": null
      },
      {
        "Id": 185,
        "Code": "313",
        "Name": "Mkudi",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 186,
        "Code": "214",
        "Name": "First City Monument Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "FCMBNGLA",
        "branches": null
      },
      {
        "Id": 187,
        "Code": "314",
        "Name": "FET",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 188,
        "Code": "523",
        "Name": "Trustbond",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 189,
        "Code": "315",
        "Name": "GTMobile",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 190,
        "Code": "033",
        "Name": "United Bank for Africa",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "UNAFNGLA",
        "branches": null
      },
      {
        "Id": 191,
        "Code": "044",
        "Name": "Access Bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": null,
        "SwiftCode": "ABNGBGLA",
        "branches": null
      },
      {
        "Id": 567,
        "Code": "90115",
        "Name": "TCF MFB",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      },
      {
        "Id": 1413,
        "Code": "090175",
        "Name": "HighStreet MFB bank",
        "IsMobileVerified": null,
        "IsMicroFinanceBank": true,
        "SwiftCode": null,
        "branches": null
      }
    ];
  }

  serviceBGColors() {
    return {
      'airtime': 'bg-primary',
      'data': 'bg-success',
      'electricity': 'bg-dark',
      'fund_transfer': 'bg-dark',
      'cable': 'bg-warning',
      'data_e_pin': 'bg-warning',
      'airtime_to_cash': 'bg-danger',
      'airtime_e_pin': 'bg-success'
    }
  }

  onLogin(data: any) {
    return this._httpClient.post(`${this.url}auth/login`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  onRegister(data: any) {
    return this._httpClient.post(`${this.url}auth/register`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  onRequestPasswordReset(data: any) {
    return this._httpClient.post(`${this.url}auth/forgot-password`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  profile(data: any) {
    return this._httpClient.get(`${this.url}auth/profile`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getDownLine(data: any) {
    return this._httpClient.get(`${this.url}user/downline`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  onResetPassword(data: any) {
    return this._httpClient.post(`${this.url}auth/reset-password`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  onResendVerificationCode(data: any) {
    return this._httpClient.post(`${this.url}user/resend-verification-code`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  emailVerification(data: any) {
    return this._httpClient.post(`${this.url}user/verify-email`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  phoneVerification(data: any) {
    return this._httpClient.post(`${this.url}user/verify-phone-number`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  setPin(data: any) {
    return this._httpClient.post(`${this.url}user/set-user-pin`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  dashboard(data: any) {
    return this._httpClient.get(`${this.url}products/`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  wallets(data: any) {
    return this._httpClient.post(`${this.url}user/user-wallet-cards`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  fundWallet(data: any) {
    return this._httpClient.post(`${this.url}user/fund-wallet`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  requestResetPinCode(data: any) {
    return this._httpClient.post(`${this.url}user/request-pin-reset-code`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  resetPin(data: any) {
    return this._httpClient.post(`${this.url}user/update-pin`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  resetPassword(data: any) {
    return this._httpClient.post(`${this.url}user/update-password`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  bvnVerification(data: any) {
    return this._httpClient.post(`${this.url}user/verify-bvn`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  transaction(data: any) {
    let url = data.next_page || `${this.url}user/transactions`;
    return this._httpClient.post(`${url}`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  transactionDetails(data: any) {
    return this._httpClient.post(`${this.url}user/transaction-details`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  products(id: any) {
    return this._httpClient.get(`${this.url}products/details/${id}`, {}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  comments(id: any) {
    return this._httpClient.get(`${this.url}products/comments/${id}`, {}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  createComments(data: any) {
    return this._httpClient.post(`${this.url}products/create-comment`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  searchNoAuth(address: any) {
    return this._httpClient.get(`${this.url}products/search?address=${address}`, {}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  searchAddress(address: any) {
    return this._httpClient.get(`${this.url}products/search/${address}`, {}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  destroyFile(id: any) {
    return this._httpClient.delete(`${this.url}products/delete-image/${id}`, {}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  uploadFile(formData: any) {
    return this._httpClient.post(`${this.url}products/upload-file`, formData).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  createProduct(data: any) {
    return this._httpClient.post(`${this.url}products/create`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  allBills(data: any) {
    return this._httpClient.post(`${this.url}user/services`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  billDetails(data: any) {
    return this._httpClient.post(`${this.url}user/service-details`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  verifyMerchant(data: any) {
    return this._httpClient.post(`${this.url}user/verify-merchant`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  initializePurchase(data: any) {
    return this._httpClient.post(`${this.url}user/initialize-purchase`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  purchaseAirtime(data: any) {
    return this._httpClient.post(`${this.url}user/airtime-purchase`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  purchaseData(data: any) {
    return this._httpClient.post(`${this.url}user/data-purchase`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  purchaseCable(data: any) {
    return this._httpClient.post(`${this.url}user/cable-purchase`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  purchaseElectricity(data: any) {
    return this._httpClient.post(`${this.url}user/electricity-purchase`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  purchaseEducational(data: any) {
    return this._httpClient.post(`${this.url}user/education-purchase`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  purchaseAirtimeToCash(data: any) {
    return this._httpClient.post(`${this.url}user/airtime-to-cash-purchase`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  purchaseAirtimeEPinPurchase(data: any) {
    return this._httpClient.post(`${this.url}user/purchase-epin`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  purchaseDataEPinPurchase(data: any) {
    return this._httpClient.post(`${this.url}user/purchase-epin`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  upgradePlan(data: any) {
    return this._httpClient.post(`${this.url}user/upgrade-plan`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  generateToken(data: any) {
    return this._httpClient.post(`${this.url}user/generate-api-key`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  saveCallBackUrl(data: any) {
    return this._httpClient.post(`${this.url}user/save-call-back-url`, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


}
