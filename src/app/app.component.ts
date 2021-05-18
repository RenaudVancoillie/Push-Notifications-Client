import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Notification } from './interfaces/notification';

import { NotificationService } from './services/notifications/notification.service';
import { PushSubscriptionService } from './services/pushSubscriptions/push-subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = "BLRQpb3GpmIRbkMXU1qymYQ3iQcnWm018Mbv_aCYKSRd1gsUlEmTjzaIJ-vNC1raPYvheLFUYc24HIKyIggxeOs";

  title: string = "Push Notifications Client";
  operation: string = "Subscribe";

  constructor(private swPush: SwPush, 
              private pushSubscriptionService: PushSubscriptionService, 
              private notificationService: NotificationService) { }

  subscribeForNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(subscription => this.pushSubscriptionService.addPushSubscription(subscription).subscribe())
    .catch(error => console.error(error));
  }

  sendNotifications() {
    const notification: Notification = {
      title: 'Angular Notification',
      body: 'Notification body!',
      icon: 'assets/images/exclamation-mark.png',
      vibrate: [100, 50, 100],
      data: {
        dataOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [{
        action: 'explore',
        title: 'Go to the site!',
        icon: 'assets/images/arrow.png'
      }]
    };

    this.notificationService.sendNotification(notification).subscribe(notification => console.log(notification));
  }

}
