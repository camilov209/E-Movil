import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {PersonalProvider} from "../../providers/personal/personal";

//MD5
import { Md5 } from "ts-md5";

//Provider
import {SettingsServicesProvider} from "../../providers/settings/settings";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  dataLogin = {};

  loading;

  constructor(public navCtrl: NavController,
              private _personal: PersonalProvider,
              private toastCtrl: ToastController,
              private _settings: SettingsServicesProvider,
              private loadingCtrl: LoadingController) {
  }

  login(dataLogin){
      let password = (Md5.hashStr(dataLogin.password));
      this.getPersonalLogin(dataLogin.username, password);
  }


  private getPersonalLogin(username: string, password: any){

      this.presentLoadingCustom();

      this._personal.getPersonalLogin(username, password)
          .then(personal => {
              if (personal.length === 1 && personal[0].estado === 1){

                  this.dismissLoadingCustom();

                  this._settings.settings.id_personal = personal[0].idpersonal;
                  this._settings.settings.firtname_user = personal[0].nombres;
                  this._settings.settings.lastname_user = personal[0].apellidos;
                  this._settings.saveStorage();

                  this.navCtrl.setRoot(HomePage);
              }else if (personal.length === 1 && personal[0].estado === 0) {
                  this.dismissLoadingCustom();
                  this.presentToast("Tu cuenta se encuentra inactiva, por favor comunícate con el administrador.");
              }else {
                  this.dismissLoadingCustom();
                  this.presentToast("Usuario y/o contraseña incorrecto(s).");
              }
          })
          .catch( error => {
              alert(JSON.stringify(error));
          });
  }

    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión, por favor espere ...'
        });

        this.loading.present();
    }

    dismissLoadingCustom(){
        this.loading.dismiss();
    }



}
