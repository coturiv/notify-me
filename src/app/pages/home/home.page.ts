import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  repeat: 'daily' | 'friday' = 'friday';
  notifyAt: string;

  isCordova: boolean;

  constructor(private platform: Platform, private localNotifications: LocalNotifications) {
    this.notifyAt = new Date().toISOString();
    this.isCordova = this.platform.is('cordova');
  }

  onSchedule() {
    const timeAt = new Date(this.notifyAt);
    const hour = timeAt.getHours();
    const minute = timeAt.getMinutes();

    const title = 'Notify...';
    const text = 'Hi, this is test notification.';
    // const sound = this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf';

    if (this.isCordova) {
      switch (this.repeat) {
          case 'daily':

            const notifications: ILocalNotification[] = Array(7).fill(0).map((_, idx) => {
                return { title, text, trigger: { every: {weekday: idx + 1, hour, minute} }
              };
            });

            this.localNotifications.schedule(notifications);
            break;
          case 'friday':

            const notification: ILocalNotification = { title, text, trigger: { every: {weekday: 5, hour, minute} } };

            this.localNotifications.schedule(notification);
            break;
          default:

            this.localNotifications.schedule({ title, text, trigger: { at: timeAt } });
            break;
        }
    }
  }

  onCancel() {
    if (this.isCordova) {
      this.localNotifications.cancelAll();
    }
  }

}
