import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SourcesSectionsProvider} from "../../providers/sources-sections/sources-sections";
import {SourcesIndicatorsProvider} from "../../providers/sources-indicators/sources-indicators";
import {SectionPollPage} from "../section-poll/section-poll";

@Component({
  selector: 'page-polls',
  templateUrl: 'polls.html',
})
export class PollsPage {

  idfuente: number = null;
  subHeader: string = null;
  dataSourceSectionRecord = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _s_section: SourcesSectionsProvider,
              public _source_indicator: SourcesIndicatorsProvider) {
      this.idfuente = this.navParams.get("idfuente");
  }

  ionViewDidLoad() {
    this.getSourceIndicatorName();
    this.getSourceSectionRecord();
  }


    getSourceIndicatorName(){
        this._source_indicator.getSourceIndicatorName(this.idfuente)
            .then(resp =>{
                this.subHeader = resp[0].nombrefuente;
            })
            .catch(err =>{
                alert(JSON.stringify(err));
            })
    }

    getSourceSectionRecord() {
        this._s_section.getSourcesSectionRecords(this.idfuente)
          .then(resp => {
              this.dataSourceSectionRecord = resp;
          })
          .catch(err => {
              alert(err);
          });
    }

    getColorSectionRecord(){
      return "#488aff";
    }

    goToSectionPoll(id, nombre, orden){
        this.navCtrl.push(SectionPollPage, {id: id, nombre: nombre, orden: orden});
    }

  }
