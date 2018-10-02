import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AppliedSourceProvider} from "../../providers/applied-source/applied-source";
import {InsertAppliedSourcePage} from "../insert-applied-source/insert-applied-source";
import {SourcesIndicatorsProvider} from "../../providers/sources-indicators/sources-indicators";
import {PollsPage} from "../polls/polls";



@Component({
  selector: 'page-records',
  templateUrl: 'records.html',
})
export class RecordsPage {

  id: number = null;
  subHeader: string;
  title: string;
  status:boolean = null;

  dataAppliedSource:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _applied_source: AppliedSourceProvider,
              public _source_indicator: SourcesIndicatorsProvider) {

      this.id = navParams.get("idfuente");
      //this.subHeader = this.navParams.get("nombrefuente");
      //this.title = this.subHeader.charAt(0).toUpperCase() + this.subHeader.slice(1).toLowerCase();
  }



    ionViewDidLoad() {
      this.getSourceIndicatorName();
      this.getSourceSectionRecord();
    }

    ionViewDidEnter(){
        this.getSourceSectionRecord();
    }




    getSourceIndicatorName(){
      this._source_indicator.getSourceIndicatorName(this.id)
          .then(resp =>{
              this.subHeader = resp[0].nombrefuente;
          })
          .catch(err =>{
              alert(JSON.stringify(err));
          })
  }

  getSourceSectionRecord(){
      this._applied_source.getAllAppliedSourceGroup(this.id)
          .then(resp =>{
              this.dataAppliedSource = resp;
              this.status = resp.length !== 0;
          })
          .catch(err =>{
              alert(JSON.stringify(err));
          });
  }



  getLetterFirst(name: string){
      return name.charAt(0);
  }

  goToInsertAppliedSource(){
      this.navCtrl.push(InsertAppliedSourcePage, {idfuente: this.id});
  }

  goToPolls(){
      this.navCtrl.push(PollsPage, {idfuente: this.id});
  }

}
