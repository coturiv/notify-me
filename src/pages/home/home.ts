import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import * as moment from 'moment';

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  timeText: string;
  timeNotify: Date;

  constructor(
    public navCtrl: NavController, 
    public platform: Platform,
    public localNotifications: LocalNotifications
  ) {
    this.timeText = moment(new Date()).format();
    this.timeNotify = new Date();
  }

  timeChange(time) {
    this.timeNotify = new Date();
    this.timeNotify.setHours(time.hour, time.minute, 0);
  }

  onEnable() {
    this.onCancel().then(() => {
      this.localNotifications.schedule({
        id: 101,
        title: 'Notify...',
        text: 'Hi, this is test notification.',
        // sound: this.platform.is('android')? 'file://sound.mp3': 'file://beep.caf',
        at: this.timeNotify,
        every: 'week'
      });
      console.log('Notification has been set successfully...');
    });
  }

  onCancel() {
    return this.platform.ready().then(() => {
      return this.localNotifications.cancelAll();
    })
  }

}
