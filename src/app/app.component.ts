import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { HttpClient} from '@angular/common/http';
import { CONFIG } from '../config/config_global';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { Firebase } from '@ionic-native/firebase';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  
  //Essa linha ativa o login do auth0
  //rootPage: any = 'LoginPage';
  rootPage: any = 'MenuPage';

  constructor(public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      private device: Device,
      private http: HttpClient,
      private smartAudioProvider: SmartAudioProvider,
      private firebase: Firebase
    ) {        
    this.initializeApp();  
  }

  initializeApp() {
    //var token = window.localStorage.getItem('id_token');
    //var expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));   
    //if(token!=null || (Date.now() < expiresAt)){
    //  this.rootPage = 'MenuPage';
    //}

    

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();      

      let params= {
        token : this.device.uuid        
      };

      this.http.post(CONFIG.url_api+'getId', params, 
        {
          headers: { 'Content-Type': 'application/json' }
        })
        .toPromise().then(data => {          
          let token_usuario = JSON.stringify(data[0].token);     
          let id_usuario = JSON.stringify(data[0].id);
          window.localStorage.setItem('token_usuario', token_usuario);
          window.localStorage.setItem('id_usuario', id_usuario);
        }).catch(error => {
          console.log(error.status);
        }); 

        this.http.get(CONFIG.url_twitch_api,  
        {
          headers: { 'Content-Type': 'application/json', 'Accept' : 'application/vnd.twitchtv.v5+json', 'Client-ID': CONFIG.id_client_twitch }
        })
        .toPromise().then(data => {          
          console.log("AAAAAAAAAAAAAAAAAA: " + data[0]);
          let status_twitch = data[0].stream; 
          window.localStorage.setItem('status_twitch', status_twitch);  
                 
        }).catch(error => {
          console.log(error.status);
        }); 


      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }

      this.smartAudioProvider.preload('howl', 'assets/audio/howl.mp3');

      this.firebase.getToken()
      .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));
    
      this.firebase.onTokenRefresh()
        .subscribe((token: string) => console.log(`Got a new token ${token}`));

      });
  }
}
