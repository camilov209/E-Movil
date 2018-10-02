import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {SettingsServicesProvider} from "../providers/settings/settings";

import {SQLite} from "@ionic-native/sqlite";
import {PersonalProvider} from "../providers/personal/personal";
import {CountriesProvider} from "../providers/countries/countries";
import {DepartmentsProvider} from "../providers/departments/departments";
import {MunicipalitiesProvider} from "../providers/municipalities/municipalities";
import {ZonesMunicipalitiesProvider} from "../providers/zones-municipalities/zones-municipalities";
import {QuestionsProvider} from "../providers/questions/questions";
import {OptionsProvider} from "../providers/options/options";
import {SourcesIndicatorsProvider} from "../providers/sources-indicators/sources-indicators";
import {SourcesSectionsProvider} from "../providers/sources-sections/sources-sections";
import {SectionsQuestionsProvider} from "../providers/sections-questions/sections-questions";
import {FamiliesProvider} from "../providers/families/families";
import {BeneficiariesTypesProvider} from "../providers/beneficiaries-types/beneficiaries-types";
import {GendersProvider} from "../providers/genders/genders";
import {EthnicProvider} from "../providers/ethnic/ethnic";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {IntroductionPage} from "../pages/introduction/introduction";
import {AppliedSourceProvider} from "../providers/applied-source/applied-source";
import {AppliedSourceQuestionProvider} from "../providers/applied-source-question/applied-source-question";
import {RecordsPage} from "../pages/records/records";
import {InsertFamilyPage} from "../pages/insert-family/insert-family";
import {OptionsQuestionsProvider} from "../providers/options-questions/options-questions";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private _settings: SettingsServicesProvider,
              private sqlite: SQLite,
              private _country: CountriesProvider,
              private _personal: PersonalProvider,
              private _departament: DepartmentsProvider,
              private _municipality: MunicipalitiesProvider,
              private _zone_municipality: ZonesMunicipalitiesProvider,
              private _question: QuestionsProvider,
              private _s_indicator: SourcesIndicatorsProvider,
              private _s_section: SourcesSectionsProvider,
              private _sc_question: SectionsQuestionsProvider,
              private _family: FamiliesProvider,
              private _option: OptionsProvider,
              private _optionQuestion: OptionsQuestionsProvider,
              private _type_beneficiary: BeneficiariesTypesProvider,
              private _gender: GendersProvider,
              private _ethnic: EthnicProvider,
              private _applied_source: AppliedSourceProvider,
              private _applied_source_question: AppliedSourceQuestionProvider) {

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this._settings.loadStorage()
          .then(()=>{

              this.statusBar.styleDefault();
              this.splashScreen.hide();

              this.createDatabase();

              if (this._settings.settings.show_tutorial && this._settings.settings.id_personal === null){
                  this.rootPage = IntroductionPage;
              }else if (this._settings.settings.show_tutorial === false && this._settings.settings.id_personal === null) {
                  this.rootPage = LoginPage;
              }else if (this._settings.settings.show_tutorial === false && this._settings.settings.id_personal !== null) {
                  this.rootPage = HomePage;
              }

          });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

    private createDatabase(){

        this.sqlite.create({
            name: 'emovil.db',
            location: 'default' // the location field is required
        })
            .then((db) => {
                this._country.setDatabase(db);
                this._personal.setDatabase(db);
                this._departament.setDatabase(db);
                this._municipality.setDatabase(db);
                this._zone_municipality.setDatabase(db);
                this._question.setDatabase(db);
                this._option.setDatabase(db);
                this._optionQuestion.setDatabase(db);
                this._s_indicator.setDatabase(db);
                this._s_section.setDatabase(db);
                this._sc_question.setDatabase(db);
                this._family.setDatabase(db);
                this._type_beneficiary.setDatabase(db);
                this._gender.setDatabase(db);
                this._ethnic.setDatabase(db);
                this._applied_source.setDatabase(db);
                this._applied_source_question.setDatabase(db);
            })
            .catch(error =>{
                //alert("Error en la configuración de los modulos.")
            });
    }

    getProfileUser(){

      if (this._settings.settings.id_personal !== null){
          this._personal.getProfilePersonal(this._settings.settings.id_personal)
              .then(response =>{
                  alert(JSON.stringify(response));
              })
              .catch(error =>{
                  alert("Error al obtener los datos");
              });
      }

    }

    logout(){
        this._s_section.deleteTableSourceSection();

    }

}
