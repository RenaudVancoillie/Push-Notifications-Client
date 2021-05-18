import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Notification } from './interfaces/notification';

import { KeyService } from './services/keys/key.service';
import { NotificationService } from './services/notifications/notification.service';
import { PushSubscriptionService } from './services/pushSubscriptions/push-subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string = "Push Notifications Client";
  message: string = "Notification!";

  constructor(private swPush: SwPush, 
              private keyService: KeyService,
              private pushSubscriptionService: PushSubscriptionService, 
              private notificationService: NotificationService) { }

  subscribeForNotifications() {
    this.keyService.getVapidPublicKey().subscribe(key => {
      this.swPush.requestSubscription({
        serverPublicKey: key.publicKey
      }).then(subscription => this.pushSubscriptionService.addPushSubscription(subscription).subscribe(subscription => console.log(subscription)))
      .catch(error => console.error(error));
    });
  }

  sendNotifications() {
    const notification: Notification = {
      title: 'Angular Notification',
      body: this.message, // INPUT VALIDATION REQUIRED! 
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
