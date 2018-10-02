import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentsProvider} from "../../providers/departments/departments";
import {CountriesProvider} from "../../providers/countries/countries";
import {ZonesMunicipalitiesProvider} from "../../providers/zones-municipalities/zones-municipalities";
import {FamiliesProvider} from "../../providers/families/families";
import {MunicipalitiesProvider} from "../../providers/municipalities/municipalities";
import swal from "sweetalert";
import {AppliedSourceProvider} from "../../providers/applied-source/applied-source";
import {PersonalProvider} from "../../providers/personal/personal";
import {SettingsServicesProvider} from "../../providers/settings/settings";
import {GeopositionProvider} from "../../providers/geoposition/geoposition";
import {Diagnostic} from "@ionic-native/diagnostic";

@Component({
  selector: 'page-insert-applied-source',
  templateUrl: 'insert-applied-source.html',
})
export class InsertAppliedSourcePage {

    errorPais: boolean = null;
    errorDepartamento: boolean = null;
    errorMunicipio: boolean = null;
    errorTBeneficiario: boolean = null;

    alertPosition;

    selectOptionsCountry = {
        title: 'Pais: ',
        subTitle: 'Campo requerido, por favor selecciona un pais.',
    };

    selectOptionsDepartment = {
        title: 'Departamento: ',
        subTitle: 'Campo requerido, por favor selecciona un departamento.',
    };

    selectOptionsMunicipality = {
        title: 'Municipio: ',
        subTitle: 'Campo requerido, por favor selecciona un municipio.',
    };

    selectOptionsBeneficiaryType = {
        title: 'Tipo de Beneficiario: ',
        subTitle: 'Campo requerido, por favor selecciona un tipo de beneficiario.',
    };

    loading;

    myForm: FormGroup;
    cities: any = [];
    departaments: any = [];
    munipalities: any = [];
    zona_corregimiento: any = [];
    zona_barrio: any = [];
    zona_vereda: any = [];



    funcionario = null;
    digitalizacion = null;
    pais = null;
    departamento = null;
    municipio = null;
    corregimiento = null;
    vereda = null;
    barrio = null;
    codgeo = null;
    latitud = null;
    longitud = null;


    idfuente: number = null;

    personal = null;

  constructor(public navCtrl: NavController,
              navParams: NavParams,
              public formBuilder: FormBuilder,
              private _family: FamiliesProvider,
              private _personal: PersonalProvider,
              private _settings: SettingsServicesProvider,
              private _country: CountriesProvider,
              private _departament: DepartmentsProvider,
              private _municipaly: MunicipalitiesProvider,
              private _zonemunicipaly: ZonesMunicipalitiesProvider,
              private  loadingCtrl: LoadingController,
              private _applied_source: AppliedSourceProvider,
              private diagnostic: Diagnostic,
              private _geoposition: GeopositionProvider,
              public alertCtrl: AlertController) {

      this.myForm = this.createMyForm();

      this.idfuente = navParams.get('idfuente');

      this.getEnablePosition();
  }




  ionViewDidLoad() {
      this.presentLoadingDefault();
      this.getAllTablesSelected();

      this._geoposition.startLocation()
          .then(resp =>{

              this.dismissLoadingDefault();
              this.latitud = resp.coords.latitude;
              this.longitud = resp.coords.longitude;

          })
          .catch(err => {
              this.dismissLoadingDefault();
              alert("Se ha detectado un error al cargar tu posicion actual, codigo error: " + JSON.stringify(err));
          });

  }

    private createMyForm(){
        return this.formBuilder.group({
            funcionario: ['', [Validators.required, Validators.minLength(10)]],
            digitalizacion: ['', Validators.required],
            pais: ['',  Validators.required],
            departamento: ['',  Validators.required],
            municipio: ['',  Validators.required],
            corregimiento: [''],
            barrio: [''],
            vereda: [''],
            codgeo: [''],
            latitud: [''],
            longitud: ['']
        });
    }

    getAllTablesSelected(){

        this._country.getAllCountries()
            .then(resp => {
                this.cities = resp;
            })
            .catch(error =>{
                this.dismissLoadingDefault();
            });

        this._personal.getProfilePersonal(this._settings.settings.id_personal)
            .then(resp =>{
                this.personal = resp[0].nombres + " " + resp[0].apellidos + " (" + resp[0].identificacion + ")";
            })
            .catch(err =>{
                this.dismissLoadingDefault();
            });

    }

    changeGroupDepartament(ev){
        this._departament.selectGroupDepartaments(ev)
            .then(resp => {
                this.departaments = resp;
            })
            .catch(error =>{
                alert("Obtuvimos un error al generar los departamentos. " + JSON.stringify(error));
            })
    }

    changeGroupMunicipalities(ev){
        this._municipaly.selectGroupMunicipalities(ev)
            .then(resp => {
                this.munipalities = resp;
            })
            .catch(error =>{
                alert("Obtuvimos un error al generar los municipios. " + JSON.stringify(error));
            })
    }

    changeGroupZonesMunicipalitiesCorregimiento(ev) {

        this._zonemunicipaly.selectGroupZonesMunicipalities(ev, 1)
            .then(resp => {
                this.zona_corregimiento = resp;
            })
            .catch(error => {
                alert("Obtuvimos un error al generar los corregimientos. " + JSON.stringify(error));
            });
    }

    changeGroupZonesMunicipalitiesVereda(ev) {

        this._zonemunicipaly.selectGroupZonesMunicipalities(ev, 2)
            .then(resp => {
                this.zona_vereda = resp;
            })
            .catch(error => {
                alert("Obtuvimos un error al generar los barrrios. " + JSON.stringify(error));
            });
    }

    changeGroupZonesMunicipalitiesBarrio(ev) {

        this._zonemunicipaly.selectGroupZonesMunicipalities(ev, 3)
            .then(resp => {
                this.zona_barrio = resp;
            })
            .catch(error =>{
                alert("Obtuvimos un error al generar las veredas. " + JSON.stringify(error));
            });
    }

    eventCheck(ev){
        switch (ev.selectOptions.title){

            case 'Pais: ':
                this.errorPais = ev._value !== '';
                break;
            case 'Departamento: ':
                this.errorDepartamento = ev._value !== '';
                break;
            case 'Municipio: ':
                this.errorMunicipio = ev._value !== '';
                break;
            case 'Tipo de Beneficiario: ':
                this.errorTBeneficiario = ev._value !== '';
                break;
        }
    }


    saveData(){

        this.presentLoadingDefault();

        this.funcionario = this.myForm.value.funcionario;
        this.digitalizacion = this.myForm.value.digitalizacion;
        this.pais = this.myForm.value.pais;
        this.departamento = this.myForm.value.departamento;
        this.municipio = this.myForm.value.municipio;
        this.corregimiento = this.myForm.value.corregimiento;
        this.barrio = this.myForm.value.barrio;
        this.vereda = this.myForm.value.vereda;
        this.codgeo = this.myForm.value.codgeo;
        /*this.latitud = "2.999999";
        this.longitud = "78.999999";*/

        if (this.corregimiento === ''){
            this.corregimiento = null;
        }else if (this.barrio === ''){
            this.barrio = null;
        }else if (this.vereda = ''){
            this.vereda = null;
        }


        this._applied_source.insertAppliedSource(this.idfuente, null, null,
                                                null, null, this.pais, this.municipio, this.corregimiento,
                                                this.vereda, this.barrio, this.departamento, null, this._settings.settings.id_personal,
                                                this.digitalizacion, 0, 0, null, this.latitud,
                                                this.longitud, null, null)
            .then(resp => {
                this.dismissLoadingDefault();

                swal("Perfecto!", "Los datos se han guardado correctamente! ", "success")
                    .then(resp =>{
                        this.navCtrl.pop();
                    });

        }, error =>{
            this.dismissLoadingDefault();
            swal("Fallo!", "Hemos tenido un error al guardar los datos, por favor inténtalo mas tarde!. " +
                "\n *Codigo del error: " + error.message +
                "\n Si el problema persiste por favor comuníquese con el administrador.", "error"
            );
        })
            .catch(error => {
                alert(JSON.stringify(error));
            })
    }

    /*generateRandom(min, max){
        return Math.floor(Math.random() * (max - min)) + min;

    }*/
    
    getEnablePosition(){

        this.diagnostic.isLocationEnabled().then(available => {
                if(!available){
                    this.alertPosition = this.alertCtrl.create({
                        title: '¡Ubicación desactivada!',
                        subTitle: 'Por favor activa el servicio de ubicación.',
                        buttons: [
                            {
                                text: 'Aceptar',
                                handler: data => {
                                    this.diagnostic.switchToLocationSettings();
                                }
                            }
                        ]});
                    this.alertPosition.present();

                }
            },
            error => {
                alert(JSON.stringify(error));
            }
        ).catch(error => {
            alert("No habilitaste tu ubicación");
        });
    }

    presentLoadingDefault() {

        this.loading = this.loadingCtrl.create({
            content: 'Cargando datos necesarios y buscando tu ubicación actual, por favor espera...'
        });

        this.loading.present();
    }

    dismissLoadingDefault(){
        this.loading.dismiss();
    }
}
