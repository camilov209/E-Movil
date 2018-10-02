import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Platform} from "ionic-angular";

@Injectable()
export class SettingsServicesProvider {

    settings = {
        show_tutorial : true,
        id_personal: null,
        firtname_user: "",
        lastname_user: ""
    };

  constructor(private platform : Platform,
              private storage: Storage) {
      console.log('Hello SettingsProvider Provider');
  }

  loadStorage(){

      let promise = new Promise((resolve, reject)=>{

          if (this.platform.is('cordova')){

              //Dispostivo
                this.storage.ready().then(()=>{
                    this.storage.get('setting')
                        .then(settings =>{
                            if (settings){
                                this.settings = settings;
                            }
                            resolve();
                        })
                })
          }else {
              //Escritorio
              if (localStorage.getItem('setting')){
                  this.settings = JSON.parse(localStorage.getItem('setting'));
              }
              resolve();
          }


      });

      return promise;
  }

  saveStorage(){
      if (this.platform.is('cordova')){
          this.storage.ready()
              .then(()=>{
                    this.storage.set('setting', this.settings);
              });
      }else {
          localStorage.setItem('setting', JSON.stringify(this.settings));
      }
  }

}
