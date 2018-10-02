import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MunicipalitiesProvider} from "../../providers/municipalities/municipalities";
import {EthnicProvider} from "../../providers/ethnic/ethnic";
import {CountriesProvider} from "../../providers/countries/countries";
import {BeneficiariesTypesProvider} from "../../providers/beneficiaries-types/beneficiaries-types";
import {ZonesMunicipalitiesProvider} from "../../providers/zones-municipalities/zones-municipalities";
import {GendersProvider} from "../../providers/genders/genders";
import {FamiliesProvider} from "../../providers/families/families";
import {DepartmentsProvider} from "../../providers/departments/departments";
import { Geolocation } from '@ionic-native/geolocation';

import swal from 'sweetalert';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-insert-family',
  templateUrl: 'insert-family.html',
})
export class InsertFamilyPage {

    errorPais: boolean = null;
    errorDepartamento: boolean = null;
    errorMunicipio: boolean = null;
    errorTBeneficiario: boolean = null;

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
    genders: any = [];
    ethnicities: any = [];
    cities: any = [];
    departaments: any = [];
    munipalities: any = [];
    beneficiaries_types: any = [];
    zona_corregimiento: any = [];
    zona_barrio: any = [];
    zona_vereda: any = [];



    jefeHogar = null;
    identificacion = null;
    integrantes = null;
    pais = null;
    departamento = null;
    municipio = null;
    corregimiento = null;
    vereda = null;
    barrio = null;
    tipo_beneficiario = null;
    genero = null;
    etnia = null;

    idflia: number = null;
    codFlia: string = null;
    identificationFamily = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _family: FamiliesProvider,
              private _country: CountriesProvider,
              private _departament: DepartmentsProvider,
              private _municipaly: MunicipalitiesProvider,
              private _zonemunicipaly: ZonesMunicipalitiesProvider,
              private _gender: GendersProvider,
              private _ethnic: EthnicProvider,
              private _beneficiary_types: BeneficiariesTypesProvider,
              private  loadingCtrl: LoadingController) {
      this.myForm = this.createMyForm();
  }

    ionViewDidLoad(){
        this.presentLoadingDefault();
        this.getAllTablesSelected();

    }

    private createMyForm(){
        return this.formBuilder.group({
            jefehogar: ['', [Validators.required, Validators.minLength(10)]],
            identificacion: ['', [Validators.required, Validators.minLength(8)]],
            genero: [''],
            etnia: [''],
            integrantes: [''],
            pais: ['',  Validators.required],
            departamento: ['',  Validators.required],
            municipio: ['',  Validators.required],
            corregimiento: [''],
            barrio: [''],
            vereda: [''],
            tipobeneficiario: ['',  Validators.required]
        });
    }

    getAllTablesSelected(){

        this._gender.getAllGenders()
            .then(resp =>{
                this.genders = resp;
            })
            .catch(error => {
                this.dismissLoadingDefault();

            });

        this._ethnic.getAllEthnicities()
            .then(resp =>{
                this.ethnicities = resp;
            })
            .catch(error => {
                this.dismissLoadingDefault();

            });

        this._country.getAllCountries()
            .then(resp => {
                this.cities = resp;
            })
            .catch(error =>{
                this.dismissLoadingDefault();
            });

        this._beneficiary_types.getAllTypesBeneficiaries()
            .then(resp => {
                this.beneficiaries_types = resp;
            })
            .catch(error =>{
                this.dismissLoadingDefault();
            });

        this.dismissLoadingDefault();
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

    changeBeneficiaryType(ev){
        this.tipo_beneficiario = parseInt(ev);
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

        this.jefeHogar = this.myForm.value.jefehogar;
        this.identificacion = this.myForm.value.identificacion;
        this.integrantes = this.myForm.value.integrantes;
        this.pais = this.myForm.value.pais;
        this.departamento = this.myForm.value.departamento;
        this.municipio = this.myForm.value.municipio;
        this.corregimiento = this.myForm.value.corregimiento;
        this.barrio = this.myForm.value.barrio;
        this.vereda = this.myForm.value.vereda;
        this.tipo_beneficiario = this.myForm.value.tipobeneficiario;
        this.genero = this.myForm.value.genero;
        this.etnia = this.myForm.value.etnia;
		
		if (this.corregimiento === ''){
			this.corregimiento = null;
		}else if (this.barrio === ''){
			this.barrio = null;
		}else if (this.vereda = ''){
			this.vereda = null;
		}else if(this.genero === ''){
			this.genero = null;
		}else if(this.etnia === ''){
			this.etnia = null;
		}else if(this.integrantes === ''){
			this.integrantes = null;
		}


		this._family.insertFamilyOnly(this.pais, this.departamento,
            this.municipio, this.corregimiento,
            this.barrio, this.vereda,
            this.tipo_beneficiario, this.jefeHogar,
            this.identificacion, this.genero,
            this.etnia, this.integrantes, this.generateRandom(10000, 99999) + ""
        ).then(resp => {
            this.dismissLoadingDefault();
            swal("Perfecto!", "Los datos se han guardado correctamente! ", "success")
                .then(resp =>{
                    this.navCtrl.setRoot(HomePage);
                });

        }, error =>{
            this.dismissLoadingDefault();
            swal("Fallo!", "Hemos tenido un error al guardar los datos, por favor inténtalo mas tarde!. " +
                "\n *Codigo del error: " + error.message +
                "\n Si el problema persiste por favor comuníquese con el administrador.", "error"
            );
        });

    }

    generateRandom(min, max){
       return Math.floor(Math.random() * (max - min)) + min;

    }

    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Se estan cargando los datos, por favor espera ...'
        });

        this.loading.present();
    }

    dismissLoadingDefault(){
        this.loading.dismiss();
    }
}
