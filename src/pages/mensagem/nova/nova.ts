import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,  } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

/**
 * Generated class for the Tab2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nova',
  templateUrl: 'nova.html',
})
export class NovaPage {

  nova: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public loadingController: LoadingController) {
  }

  cancelar() {  
    this.navCtrl.setRoot('MenuPage');
  }
  
}
