import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public loadingController: LoadingController) {
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
}
