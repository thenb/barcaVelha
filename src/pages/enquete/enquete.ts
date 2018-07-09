import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { CONFIG } from '../../config/config_global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the Tab2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-enquete',
  templateUrl: 'enquete.html',
})
export class EnquetePage {

  private enquete : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private http: HttpClient, public loadingController: LoadingController,
    private toastCtrl: ToastController,  private formBuilder: FormBuilder) {

      this.enquete = this.formBuilder.group({
        descricao: ['', Validators.required],
        data_fim: ['', Validators.required],
        opcao_1: [''],
        opcao_2: [''],
        opcao_3: [''],
        opcao_4: ['']
      });
  }

  cancelar() {  
    this.navCtrl.setRoot('MenuPage');
  }

  criarEnquete(){

    if(!this.enquete.valid){
      this.presentToast("Campo descrição e Data fim obrigatório");
    } else if (this.verificarOpcoes()){
      this.presentToast("No minimo duas opções inseridas");
    }else{
      this.http.post(CONFIG.url_api+'newPoll', this.enquete, 
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

  verificarOpcoes(){
    var opcoesSelecionadas = 0;
    if(this.enquete.controls['opcao_1'].value != null && this.enquete.controls['opcao_1'].value.replace(/ /g,'') != ''){
      opcoesSelecionadas++;
    }
    
    if(this.enquete.controls['opcao_2'].value != null && this.enquete.controls['opcao_2'].value.replace(/ /g,'') != ''){
      opcoesSelecionadas++;
    }
    
    if(this.enquete.controls['opcao_3'].value != null && this.enquete.controls['opcao_3'].value.replace(/ /g,'') != ''){
      opcoesSelecionadas++;
    }
    
    if(this.enquete.controls['opcao_4'].value != null && this.enquete.controls['opcao_4'].value.replace(/ /g,'') != ''){
      opcoesSelecionadas++;
    }

    if(opcoesSelecionadas > 1){
      return false;
    }else{
      return true;
    }
  }

}
