import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {CountriesProvider} from "../../providers/countries/countries";
import {PersonalProvider} from "../../providers/personal/personal";
import {TablesModulesProvider} from "../../providers/tables-modules/tables-modules";
import {LoginPage} from "../login/login";
import {DepartmentsProvider} from "../../providers/departments/departments";
import {MunicipalitiesProvider} from "../../providers/municipalities/municipalities";
import {ZonesMunicipalitiesProvider} from "../../providers/zones-municipalities/zones-municipalities";
import {QuestionsProvider} from "../../providers/questions/questions";
import {OptionsProvider} from "../../providers/options/options";
import {SourcesIndicatorsProvider} from "../../providers/sources-indicators/sources-indicators";
import {SourcesSectionsProvider} from "../../providers/sources-sections/sources-sections";
import {SectionsQuestionsProvider} from "../../providers/sections-questions/sections-questions";
import {OptionsQuestionsProvider} from "../../providers/options-questions/options-questions";
import {FamiliesProvider} from "../../providers/families/families";
import {BeneficiariesTypesProvider} from "../../providers/beneficiaries-types/beneficiaries-types";
import {GendersProvider} from "../../providers/genders/genders";
import {EthnicProvider} from "../../providers/ethnic/ethnic";
import {AppliedSourceQuestionProvider} from "../../providers/applied-source-question/applied-source-question";
import {AppliedSourceProvider} from "../../providers/applied-source/applied-source";

@Component({
  selector: 'page-loading-modules',
  templateUrl: 'loading-modules.html',
})
export class LoadingModulesPage {

    count: number = 0;

    statusButtonLogin = true;

    statusViewDivCountry: boolean = false;
    statusCountry: boolean = null;

    statusViewDivDepartament: boolean = false;
    statusDepartament: boolean = null;

    statusViewDivMunicipality: boolean = false;
    statusMunicipality: boolean = null;

    statusViewDivZoneMunicipality: boolean = false;
    statusZoneMunicipality: boolean = null;

    statusViewDivQuestion: boolean = false;
    statusQuestion: boolean = null;

    statusViewDivOption: boolean = false;
    statusOption: boolean = null;

    statusViewDivSourceIndicator: boolean = false;
    statusSourceIndicator: boolean = null;

    statusViewDivSourceSection: boolean = false;
    statusSourceSection: boolean = null;

    statusViewDivSectionQuestion: boolean = false;
    statusSectionQuestion: boolean = null;

    statusViewDivOptionQuestion: boolean = false;
    statusOptionQuestion: boolean = null;

    statusViewDivPersonal: boolean = false;
    statusPersonal: boolean = null;

    statusViewDivFamily: boolean = false;
    statusFamily: boolean = null;

    statusTypeBeneficiary: boolean = null;

    statusGender: boolean = null;

    statusEthnic: boolean = null;



    tableCountry;
    tableDepartament;
    tablePersonal;
    tableMunicipality;
    tableZoneMunicipality;
    tableQuestion;
    tableOption;
    tableSourceIndicator;
    tableSourceSection;
    tableSectionQuestion;
    tableOptionQuestion;
    tableFamily;
    tableTypeBeneficiary;
    tableGender;
    tableEthnic;


    loader;

    // ERROR AL TRAER DATOS DE LA TABLA pregunta_opcion

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              private _provider: TablesModulesProvider,
              private _country: CountriesProvider,
              private _personal: PersonalProvider,
              private _departament: DepartmentsProvider,
              private _municipality: MunicipalitiesProvider,
              private _zone_municipality: ZonesMunicipalitiesProvider,
              private _question: QuestionsProvider,
              private _option: OptionsProvider,
              private _optionQuestion: OptionsQuestionsProvider,
              private _s_indicator: SourcesIndicatorsProvider,
              private _s_section: SourcesSectionsProvider,
              private _sc_question: SectionsQuestionsProvider,
              private _family: FamiliesProvider,
              private _type_beneficiary: BeneficiariesTypesProvider,
              private _gender: GendersProvider,
              private _ethnic: EthnicProvider,
              private loadingCtrl: LoadingController,
              private _applied_source: AppliedSourceProvider,
              private _applied_source_question: AppliedSourceQuestionProvider) {
  }

  ionViewDidLoad() {
      this.presentLoadingCustom();
  }

    private generatorTablesModule(){
        this._country.createTableCountry();
        this._personal.createTablePersonal();
        this._departament.createTableDepartament();
        this._municipality.createTableMunicipalities();
        this._zone_municipality.createTableZonesMunicipalities();
        this._question.createTableQuestion();
        this._option.createTableOption();
        this._optionQuestion.createTableOptionQuestion();
        this._s_indicator.createTableSourceIndicator();
        this._s_section.createTableSourceSection();
        this._sc_question.createTableSectionQuestion();
        this._sc_question.createTableSectionQuestion();
        this._family.createTableFamily();
        this._type_beneficiary.createTableTypeBeneficiary();
        this._gender.createTableGender();
        this._ethnic.createTableEthnic();
        this._applied_source.createTableAppliedSource();
        this._applied_source_question.createTableAppliedSourceQuestion();

    }


    generateModulesTables(){

      this.count = 0;

      //----------------------------------------------------------

      this.statusViewDivCountry = true;
      this.statusCountry = null;
        this._provider.getTables("pais")
            .subscribe(
                (data) =>{
                    this.tableCountry = data;
                    console.log(this.tableCountry);
                    this._country.insertCountry(this.tableCountry.paises);

                    this._country.getAllCountries()
                        .then(resp =>{
                            this.statusCountry = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                            this.statusCountry = false;
                            this.statusButtonLogin = false;
                            alert("Error" + JSON.stringify(error));
                    });
                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusCountry = false;
                });

        //---------------------------------------------------------

        this.statusViewDivDepartament = true;
        this.statusDepartament = null;

        this._provider.getTables("depto")
            .subscribe(
                (data) =>{
                    this.tableDepartament = data;
                    this._departament.insertDepartament(this.tableDepartament.departamentos);

                    this._departament.getAllDepartaments()
                        .then(resp =>{
                            this.statusDepartament = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                            this.statusDepartament = false;
                            this.statusButtonLogin = false;
                            alert("Error" + JSON.stringify(error));
                    });


                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusDepartament = false;
                });

        //--------------------------------------------------------------

        this.statusViewDivMunicipality = true;
        this.statusMunicipality = null;

        this._provider.getTables("municipio")
            .subscribe(
                (data) =>{
                    this.tableMunicipality = data;
                    this._municipality.insertMunicipality(this.tableMunicipality.municipios);

                    this._municipality.getAllMunicipality()
                        .then(resp =>{
                            this.statusMunicipality = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusMunicipality = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });

                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusMunicipality = false;
                });

        //---------------------------------------------------------

        this.statusViewDivZoneMunicipality = true;
        this.statusZoneMunicipality = null;

        this._provider.getTables("zona_municipio")
            .subscribe(
                (data) =>{
                    this.tableZoneMunicipality = data;
                    this._zone_municipality.insertZoneMunicipality(this.tableZoneMunicipality.zonasmunicipio);

                    this._zone_municipality.getAllZoneMunicipality()
                        .then(resp =>{
                            this.statusZoneMunicipality = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusZoneMunicipality = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });


                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusZoneMunicipality = false;
                });

        //---------------------------------------------------------------------------

        this.statusViewDivQuestion = true;
        this.statusQuestion = null;

        this._provider.getTables("pregunta")
            .subscribe(
                (data) =>{
                    this.tableQuestion = data;
                    this._question.insertQuestion(this.tableQuestion.preguntas);

                    this._question.getAllQuestion()
                        .then(resp =>{
                            this.statusQuestion = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusQuestion = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });


                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusQuestion = false;
                });

        //---------------------------------------------------------------------------

        this.statusViewDivOption = true;
        this.statusOption = null;

        this._provider.getTables("opcion")
            .subscribe(
                (data) =>{
                    this.tableOption = data;
                    this._option.insertOption(this.tableOption.opciones);

                    this._option.getAllOption()
                        .then(resp =>{
                            this.statusOption = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusOption = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });


                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusOption = false;
                });

        //---------------------------------------------------------------------------

        this.statusViewDivSourceIndicator = true;
        this.statusSourceIndicator = null;

        this._provider.getTables("fuenteindicador")
            .subscribe(
                (data) =>{
                    this.tableSourceIndicator = data;
                    this._s_indicator.insertSourceIndicator(this.tableSourceIndicator.fuentesindicador);

                    this._s_indicator.getAllSourceIndicator()
                        .then(resp =>{
                            this.statusSourceIndicator = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusSourceIndicator = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });


                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusSourceIndicator = false;
                });

        //---------------------------------------------------------------------------

        this.statusViewDivSourceSection = true;
        this.statusSourceSection = null;

        this._provider.getTables("fuente_seccion")
            .subscribe(
                (data) =>{
                    this.tableSourceSection = data;
                    this._s_section.insertSourceSection(this.tableSourceSection.fuentesseccion);


                    this._s_section.getAllSourceSection()
                        .then(resp =>{
                            this.statusSourceSection = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusSourceSection = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });

                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusSourceSection = false;
                });

        //---------------------------------------------------------------------------

        this.statusViewDivSectionQuestion = true;
        this.statusSectionQuestion = null;

        this._provider.getTables("seccion_pregunta")
            .subscribe(
                (data) =>{
                    this.tableSectionQuestion = data;
                    this._sc_question.insertSectionQuestion(this.tableSectionQuestion.seccionespregunta);


                    this._sc_question.getAllSectionQuestion()
                        .then(resp =>{
                            this.statusSectionQuestion = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusSectionQuestion = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });


                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusSectionQuestion = false;
                });

        //---------------------------------------------------------------------------

        this.statusViewDivOptionQuestion = true;
        this.statusOptionQuestion = null;

        this._provider.getTables("pregunta_opcion")
            .subscribe(
                (data) =>{
                    this.tableOptionQuestion = data;
                    this._optionQuestion.insertOptionQuestion(this.tableOptionQuestion.preguntaopciones);
                    this.statusOptionQuestion = true;
                },
                (error)=>{
                    this.statusOptionQuestion = false;
                });

        //---------------------------------------------------------------------------

        this.statusViewDivPersonal = true;
        this.statusPersonal = null;

        this._provider.getTables("personal")
            .subscribe(
                (data) =>{
                    this.tablePersonal = data;
                    this._personal.insertPersonal(this.tablePersonal.personal);

                    this._personal.getAllPersonal()
                        .then(resp =>{
                            this.statusPersonal = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusPersonal = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });


                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusPersonal = false;
                });

        //-----------------------------------------------------------

        this.statusViewDivFamily = true;
        this.statusFamily = null;

        this._provider.getTables("familia")
            .subscribe(
                (data) =>{
                    this.tableFamily = data;
                    this._family.insertFamily(this.tableFamily.familias);


                    this._family.getAllFamily()
                        .then(resp =>{
                            this.statusFamily = true;
                            this.count = this.count + 1;
                        }).catch(error =>{
                        this.statusFamily = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    });


                },
                (error)=>{
                    this.statusButtonLogin = false;
                    this.statusFamily = false;
                });

        //-----------------------------------------------------------

        this._provider.getTables("tipo_beneficiario")
            .subscribe(
                (data) =>{
                    this.tableTypeBeneficiary = data;
                    this._type_beneficiary.insertTypeBeneficiary(this.tableTypeBeneficiary.tipo_beneficiarios);
                    this._type_beneficiary.getAllTypesBeneficiaries()
                        .then(resp =>{
                            this.statusTypeBeneficiary = true;
                            this.count = this.count + 1;
                    }).catch(error =>{
                        this.statusTypeBeneficiary = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    })
                },
                (error)=>{
                    this.statusButtonLogin = false;
                    alert("Error al descargar los datos del beneficiario" + JSON.stringify(error));
                });

        //-----------------------------------------------------------

        this._provider.getTables("con_sexo")
            .subscribe(
                (data) =>{
                    this.tableGender = data;
                    this._gender.insertGender(this.tableGender.proyectos);
                    this._gender.getAllGenders()
                        .then(resp =>{
                            this.statusGender = true;
                            this.count = this.count + 1;
                    }).catch(error =>{
                        this.statusGender = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    })
                },
                (error)=>{
                    this.statusButtonLogin = false;
                    alert("Error al descargar los datos de los generos.");
                });

        //-----------------------------------------------------------

        this._provider.getTables("tipo_etnia")
            .subscribe(
                (data) =>{
                    this.tableEthnic = data;
                    this._ethnic.insertEthnic(this.tableEthnic.etnias);
                    this._ethnic.getAllEthnicities()
                        .then(resp =>{
                            this.statusEthnic = true;
                            this.count = this.count + 1;
                    }).catch(error =>{
                        this.statusEthnic = false;
                        this.statusButtonLogin = false;
                        alert("Error" + JSON.stringify(error));
                    })
                },
                (error)=>{
                    this.statusButtonLogin = false;
                    alert("Error al descargar los datos de las etnias");
                });
    }


    goToLogin(){
        this.navCtrl.setRoot(LoginPage);
    }

    presentLoadingCustom() {
        let loading = this.loadingCtrl.create({
            content: 'Se configurará tu dispositivo, esto puedo tardar unos minutos, por favor espera ...',
            duration: 3000
        });

        loading.onDidDismiss(() => {
            if (this.platform.is('cordova')){
                this.generatorTablesModule();
                this.generateModulesTables();
            }
        });

        loading.present();
    }

}
