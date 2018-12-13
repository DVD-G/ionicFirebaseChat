import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';

const config = {
  apiKey: "AIzaSyA8ORjRpD707Sf6MAWwCtI0FBCMCAHD9Cw",
  authDomain: "styllum-1543982422916.firebaseapp.com",
  databaseURL: "https://styllum-1543982422916.firebaseio.com",
  projectId: "styllum-1543982422916",
  storageBucket: "styllum-1543982422916.appspot.com",
};

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

