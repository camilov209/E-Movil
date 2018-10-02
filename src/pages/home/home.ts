import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FamiliesProvider} from "../../providers/families/families";
import {SourcesIndicatorsProvider} from "../../providers/sources-indicators/sources-indicators";
import {TabPollsPage} from "../tab-polls/tab-polls";
import {TabFamiliesPage} from "../tab-families/tab-families";
import {SuperTabs, SuperTabsController} from "ionic2-super-tabs";
import {InsertFamilyPage} from "../insert-family/insert-family";
import {AppliedSourceProvider} from "../../providers/applied-source/applied-source";
import {AppliedSourceQuestionProvider} from "../../providers/applied-source-question/applied-source-question";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


    page1: any = TabPollsPage;
    page2: any = TabFamiliesPage;

    showToolbarButtons: boolean = null;

    selectedTabIndexDefault = 0;


    @ViewChild(SuperTabs) superTabs: SuperTabs;


    constructor(public navCtrl: NavController,
                public _s_indicator: SourcesIndicatorsProvider,
                public _family: FamiliesProvider,
                private navParams: NavParams) {
    }

    ionViewDidLoad(){

    }

    /*ionViewDidEnter(){
        this.showToolbarButtons = this.superTabs.getActiveTab().tabId === 'pollTab';
        if (this.navParams.get('id') !== undefined){
            this.content.resize();
            this.selectedTabIndexDefault = this.navParams.get('id');
        }else {
            this.content.resize();
            this.selectedTabIndexDefault = 0;
        }
    }*/

    eventTab(event){
        this.showToolbarButtons = event === 'pollTab';
    }

    goToInsertFamily(){
        this.navCtrl.push(InsertFamilyPage);
    }
}
