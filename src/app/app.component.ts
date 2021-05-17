import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = "BLRQpb3GpmIRbkMXU1qymYQ3iQcnWm018Mbv_aCYKSRd1gsUlEmTjzaIJ-vNC1raPYvheLFUYc24HIKyIggxeOs";

  title: string = "Push Notifications Client";
  operation: string = "Subscribe";

  constructor(private swPush: SwPush) { }

  subscribeForNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(subscription => console.log(JSON.stringify(subscription)))
    .catch(error => console.error(error));
  }

}
