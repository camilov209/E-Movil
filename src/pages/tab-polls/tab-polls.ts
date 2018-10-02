
import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams, VirtualScroll} from 'ionic-angular';
import {SourcesIndicatorsProvider} from "../../providers/sources-indicators/sources-indicators";
import {SourcesSectionsProvider} from "../../providers/sources-sections/sources-sections";
import {RecordsPage} from "../records/records";
import {AppliedSourceQuestionProvider} from "../../providers/applied-source-question/applied-source-question";
import {AppliedSourceProvider} from "../../providers/applied-source/applied-source";
import {FormControl} from "@angular/forms";
import {ColorsProvider} from "../../providers/colors/colors";

@Component({
  selector: 'page-tab-polls',
  templateUrl: 'tab-polls.html',
})
export class TabPollsPage {
    @ViewChild(VirtualScroll) verseList: VirtualScroll;

  dataSourceIndicator = [];
  dataSearchSourceIndicator = [];

  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;

  rootNavCtrl: NavController;
  status: boolean = false;

  count: string;

  constructor(public navCtrl: NavController,
              public _s_indicator: SourcesIndicatorsProvider,
              public _s_section: SourcesSectionsProvider,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public _applied_source: AppliedSourceProvider,
              public _applied_source_question: AppliedSourceQuestionProvider,
              public _color: ColorsProvider) {

      this.rootNavCtrl = this.navParams.get('rootNavCtrl');
      this.searchControl = new FormControl();
  }

    ionViewDidEnter() {
        return this._s_indicator.getAllSourceIndicator()
            .then(sIndicators => {
                this.status = true;
                this.verseList.resize();
                this.dataSourceIndicator = sIndicators;
                this.dataSearchSourceIndicator = sIndicators;
            })
            .catch( error => {
                this.status = true;
                alert(JSON.stringify(error));
            });
    }

    ionViewDidLoad(){
        this.verseList.resize();
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
            this.searching = false;
            this.setFilteredItems();
        });

    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'No pudimos cargar los datos por favor intentalo mas tarde.',
            buttons: ['Aceptar']
        });
        alert.present();
    }

    viewSourcesSection(id){
        this.rootNavCtrl.push(RecordsPage, {idfuente: id});
    }

    filterItems(searchTerm){
        return this.dataSearchSourceIndicator.filter((item) => {
            return item.nombrefuente.toLowerCase().indexOf(
                searchTerm.toLowerCase()) > -1;
        });
    }

    onSearchInput(){
        this.searching = true;
    }

    setFilteredItems() {
        this.dataSourceIndicator = this.filterItems(this.searchTerm);
    }

    getLetterFirst(name: string){
        return name.charAt(0);
    }
}

