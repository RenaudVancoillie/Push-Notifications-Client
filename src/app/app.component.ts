import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = "BLRQpb3GpmIRbkMXU1qymYQ3iQcnWm018Mbv_aCYKSRd1gsUlEmTjzaIJ-vNC1raPYvheLFUYc24HIKyIggxeOs";

  title: string = "Push Notifications Client";
  operation: string = "Subscribe";

}
