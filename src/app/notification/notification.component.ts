import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnChanges {

  @Input() type: string | undefined;

  @Input() message: string | undefined;

  @Input() title: string | undefined

  show = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {

    setTimeout(() => {

    }, 2000)
  }

}
