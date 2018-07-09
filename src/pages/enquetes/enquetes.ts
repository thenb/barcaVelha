import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { CONFIG } from '../../config/config_global';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the News page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-enquetes',
  templateUrl: 'enquetes.html',
})
export class EnquetesPage {

  enquetes: any;  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public loadingController: LoadingController,
    private toastCtrl: ToastController)  {      
  }

  ionViewDidLoad() {
    
    let loader = this.loadingController.create({
      content: "Carregando"
    });  
    loader.present(); 
    this.http.get(CONFIG.url_api+'getAllEnquetes')
      // Call map on the response observable to get the parsed people object
      .toPromise().then(
        data => {
          this.enquetes = data;
          loader.dismiss();
        }
      );
  }
  votar(enquete: any) { 
    let id_usuario = window.localStorage.getItem('id_usuario'); 
    let params= {
      id_usuario : id_usuario,
      id_enquete: enquete.id,
      resposta: enquete.resposta        
    };

    this.http.post(CONFIG.url_api+'replayPoll', params, 
    {
      headers: { 'Content-Type': 'application/json' }
    })
    .toPromise().then(data => {
      this.presentToast(data);
      console.log(data);
    }).catch(error => {
      console.log(error.status);
    });
  }

  presentToast(data) {
    
    let toast = this.toastCtrl.create({
      message: JSON.stringify(data),
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}