import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SettingsServicesProvider } from "../../providers/settings/settings";
import {LoadingModulesPage} from "../loading-modules/loading-modules";
import {TablesModulesProvider} from "../../providers/tables-modules/tables-modules";

@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

    datas: any = {};

    slides:any[] = [
        {
            title: "Bienvenido!!!",
            description: "Gracias por preferir <b>E-Movil,</b>, Sistema de Captura de Datos en campo de forma offline, fácil y confiable!",
            image: "assets/imgs/ica-slidebox-img-1.png",
        },
        {
            title: "¿Qué es <b>E-Movil</b>?",
            description:    "Es una aplicación movil que permite a los usuarios a los encuestadores aplicar diferentes instrumentos " +
                            "de diagnóstico previamente diseñados por la Entidad, mediante el uso del dispositivo móvil. ",
            image: "assets/imgs/ica-slidebox-img-2.png",
        },
        {
            title: "¿Que hace <b>E-Movil</b>?",
            description:    "Registrar la identificación de Encuestados," +
                            "Desplegar instrumentos de Diagnóstico (Encuestas) a diligenciar," +
                            "Sincronización automatica con el sitio web www.asirsabacolombia.com de la informacioón recolectada.",
            image: "assets/imgs/ica-slidebox-img-3.png",
        }
    ];

    constructor(public navCtrl: NavController,
                private _settings: SettingsServicesProvider,
                private _provider: TablesModulesProvider) {
        this.getTable();
    }

    skip_tutorial(){

        this._settings.settings.show_tutorial = false;
        this._settings.saveStorage();

        this.navCtrl.setRoot(LoadingModulesPage);
    }


    getTable() {
        this._provider.getTables("tipo_beneficiario")
            .subscribe(
                (data) => {
                    this.datas = data;

                    console.log(this.datas);

                },
                (error) => {
                    alert(JSON.stringify(error));
                });
    }
}
