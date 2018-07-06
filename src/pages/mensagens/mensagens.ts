import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { CONFIG } from '../../config/config_global';

/**
 * Generated class for the News page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html',
})
export class MensagensPage {

  msgs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Carregando"
    });  
    this.http.get(CONFIG.url_api+'getAllMsgs')
      // Call map on the response observable to get the parsed people object
      .toPromise().then(
        data => {
          this.msgs = data;
          loader.dismiss();
        }
      );
  }
}