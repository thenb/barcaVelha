import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,  } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { CONFIG } from '../../../config/config_global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONTENT } from '../../../assets/content/content';

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

  private mensagem: FormGroup; 

  constructor(public navCtrl: NavController,  public navParams: NavParams, 
    private http: HttpClient,  public loadingController: LoadingController,
    private toastCtrl: ToastController,  private formBuilder: FormBuilder) 
    {
      this.mensagem = this.formBuilder.group({
        on_fire : [false],
        data_evento: ['', Validators.required],
        descricao: ['', Validators.required]
      });
    }

  cancelar() {  
    this.navCtrl.setRoot('MenuPage');
  }
  
  enviarMensagem(){


    if(!this.mensagem.valid){
      this.presentToast(CONTENT.Mensagem.erroCampoObrigatorio);
    }else{
      this.http.post(CONFIG.url_api+'newMsg', this.mensagem, 
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
