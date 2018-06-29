import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  
  //Essa linha ativa o login do auth0
  //rootPage: any = 'LoginPage';
  rootPage: any = 'MenuPage';

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();  
  }

  initializeApp() {
    var token = window.localStorage.getItem('id_token');
    var expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));
    if(token!=null || (Date.now() < expiresAt)){
      this.rootPage = 'MenuPage';
    }

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }
    });
  }
}
