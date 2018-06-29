import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule} from '@angular/common/http';
import { MenuPage } from '../pages/menu/menu';
import { MyApp } from './app.component';
import {InAppBrowser } from '@ionic-native/in-app-browser'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    MyApp     
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    InAppBrowser,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
