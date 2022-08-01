import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {debounceTime, map, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-bill-services',
  templateUrl: './bill-services.component.html',
  styleUrls: ['./bill-services.component.css']
})
export class BillServicesComponent implements OnInit, OnChanges {

  @Input() inherit = false;

  user: any;

  bills: any;

  loading = false;
  network = false;

  cardColors: any;


  message: any;
  type: any;
  title: any;

  constructor(
    public userService: UserServiceService,
    public authService: AuthService,
    public router: Router
  ) {
  }

  results$: Observable<any> | undefined;
  subject = new Subject()

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.cardColors = this.userService.serviceBGColors();

  }

  product_create = {name: "", address: "", location: [], available_radius: "", price: "", images: []};

  ngOnChanges() {
    this.inherit = this.inherit;
  }

  suggestedLocation: any[] = [];
  searchLoader = false;
  searchFailed = false;

  onChangeAddress(event: any) {
    let searchText = event.target.value;
    if (!searchText)
      this.suggestedLocation = [];

    this.onSearchAddress(searchText)
  }

  searchCall: any;

  selected_address: any;

  onSearchAddress(searchText: String) {
    if (this.searchCall)
      this.searchCall.unsubscribe();

    let address = searchText;
    this.searchLoader = true;
    this.searchFailed = false;

    this.searchCall = this.userService.searchAddress(address).subscribe(
      (response: any) => {
        this.searchLoader = false;
        this.searchFailed = false;
        this.suggestedLocation = response.data;
        console.log(response);
      },
      (error) => {
        this.searchLoader = false;
        this.searchFailed = true;
      }
    );
  }

  onSelectAddress(location: any) {
    this.selected_address = location;
    this.product_create.address = location.formattedAddress;
    let latitude = location.latitude;
    let longitude = location.longitude;
    this.product_create.location = <any>[
      latitude,
      longitude
    ];
    this.suggestedLocation = [];
  }

  onUploadSubscribe: any;

  onUploadLoader = false;
  onUploadFailed = false;

  availableFiles: any[] = []

  onImageSelected(event: any) {
    let file = event.target.files[0];

    let formData = new FormData();
    formData.append('file', file);

    this.onUploadLoader = true;
    this.onUploadFailed = false;
    let index = this.availableFiles.length;
    let fileItem = {index: index, url: '', id: '', failed: false, loading: true};
    this.availableFiles = [...this.availableFiles, fileItem];

    this.onUploadSubscribe = this.userService.uploadFile(formData).subscribe(
      (response: any) => {

        this.availableFiles[index]['url'] = response.data.url;
        this.availableFiles[index]['id'] = response.data.public_id;
        this.availableFiles[index]['failed'] = false;
        this.availableFiles[index]['loading'] = false;

      },
      (error) => {
        this.availableFiles[index]['failed'] = true;
        this.availableFiles[index]['loading'] = false;
      }
    );
  }


  removeImage(image: any, index: any) {

    let removeItem = this.availableFiles[index];

    delete this.availableFiles[index];

    this.availableFiles = this.availableFiles.filter(e => e != null || e != undefined);

    if (removeItem.id)
      this.destroyOnCloudinary(removeItem.id);
  }

  destroyOnCloudinary(id: any) {
    this.userService.destroyFile(id).subscribe(
      (response: any) => {

      },
      (error) => {

      }
    );
  }

  billList() {
    this.loading = true;
    this.network = false;
    this.userService.allBills({}).subscribe(
      (response: any) => {
        this.loading = false;
        this.bills = response.data;
      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }


  onSelectBill(data: any) {
    this.router.navigate([`/user/bill-purchase/${data.name}`]);
  }


  onCreateProduct() {

    this.loading = true;

    for (let i = 0; i < this.availableFiles.length; i++) {

      if (!this.availableFiles[i]['failed'] && !this.availableFiles[i]['loading']) {
        let url = this.availableFiles[i]['url'];
        let id = this.availableFiles[i]['id'];
        // @ts-ignore
        this.product_create.images = [...this.product_create.images, {url, id}];
      } else {
        return;
      }
    }

    this.userService.createProduct(this.product_create).subscribe(
      (response: any) => {
        this.loading = false;
        this.type = 'success';
        this.message = 'Product Created Successfully';
        this.title = 'Product';

        setTimeout(() => {
          location.reload();
        }, 3000)

      },
      (error) => {
        this.loading = false;
        this.type = 'error';
        this.message = error.error.message || 'An error occurred processing purchase';
        this.title = 'Product'
      }
    );
  }

}
