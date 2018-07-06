import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser';

/**
 * Generated class for the Tab2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-redes-sociais',
  templateUrl: 'redes-sociais.html',
})
export class RedesSociaisPage { 

  options : InAppBrowserOptions  = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};



  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private http: HttpClient,
       public loadingController: LoadingController,
       private theInAppBrowser: InAppBrowser) {
 }

 openWebpage(url : string) {  
  let target = "_self";
  this.theInAppBrowser.create(url,target,this.options);
 }

 
}
