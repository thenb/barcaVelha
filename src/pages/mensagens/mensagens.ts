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
  curtindo: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public loadingController: LoadingController) {
  this.curtindo= false;
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Carregando"
    }); 
    loader.present();
    this.getAllMensagems()
    loader.dismiss();
  }

  curtir(mensagem: any) {  
    if(mensagem.curtido){
      mensagem.curtido = false;
    }else{
      mensagem.curtido = true;
    }
    let id_usuario = window.localStorage.getItem('id_usuario'); 
    let params= {
      id_usuario : id_usuario,
      id_mensagem: mensagem.id,
      curtido: mensagem.curtido        
    };
    let loader = this.loadingController.create({
      content: "Carregando"
    }); 
    loader.present();
    
    this.http.post(CONFIG.url_api+'curtirMsg', params, 
    {
      headers: { 'Content-Type': 'application/json' }
    })
    .toPromise().then(data => {
      loader.dismiss();
      this.getAllMensagems()
    }).catch(error => {
      console.log(error.status);
    });
  }

  getAllMensagems() {
    let id_usuario = window.localStorage.getItem('id_usuario');     
    let params= {
      id_usuario : id_usuario            
    };
    this.http.post(CONFIG.url_api+'getAllMsgs', params, 
    {
      headers: { 'Content-Type': 'application/json' }
    })
    .toPromise().then(data => {
      this.msgs = data;     
    }).catch(error => {
      console.log(error.status);
    });
  }



}