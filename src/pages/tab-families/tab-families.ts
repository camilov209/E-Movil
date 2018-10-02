import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams, VirtualScroll} from 'ionic-angular';
import {FamiliesProvider} from "../../providers/families/families";
import {UpdateFamilyPage} from "../update-family/update-family";
import {TablesModulesProvider} from "../../providers/tables-modules/tables-modules";
import {FormControl} from "@angular/forms";



@Component({
  selector: 'page-tab-families',
  templateUrl: 'tab-families.html',
})
export class TabFamiliesPage {

    @ViewChild(VirtualScroll) verseList: VirtualScroll;

  status: boolean = false;

  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;

  rootNavCtrl: NavController;

  dataFamilies = [];
  dataSearchFamily = [];

  loading;

  constructor(public navCtrl: NavController,
              public _family: FamiliesProvider,
              private alertCtrl: AlertController,
              public navParams: NavParams) {

      this.rootNavCtrl = this.navParams.get('rootNavCtrl');
      this.searchControl = new FormControl();
  }


    ionViewDidEnter() {
      this.verseList.resize();
      this.getAllFamilies();
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
            this.searching = false;
            this.setFilteredItems();
        });
    }

    getAllFamilies(){

        this._family.getAllFamily()
            .then(families => {
                this.status = true;
                this.dataFamilies = families;
                this.dataSearchFamily = families;
            })
            .catch( error => {
                this.status = true;
                this.presentAlert(error);
            });
    }

    presentAlert(error) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'No pudimos cargar los datos por favor intentalo mas tarde.' + JSON.stringify(error),
            buttons: ['Aceptar']
        });
        alert.present();
    }

    goToUpdateUser(id_family, identification, cod_family){
        this.rootNavCtrl.push(UpdateFamilyPage, {'idflia': id_family, 'identificacion': identification, 'codflia' : cod_family});
    }

    filterItems(searchTerm){
        return this.dataSearchFamily.filter((item) => {
            return item.jefehogar.toLowerCase().
                indexOf(searchTerm.toLowerCase()) > -1 ||
                item.identificacion.toLowerCase().
                indexOf(searchTerm.toLowerCase()) > -1;
        });
    }

    onSearchInput(){
        this.searching = true;
    }

    setFilteredItems() {
        this.dataFamilies = this.filterItems(this.searchTerm);
    }

    getLetterFirst(name: string){
        return name.charAt(0);
    }

}
