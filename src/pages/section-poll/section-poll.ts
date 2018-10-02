import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SectionsQuestionsProvider} from "../../providers/sections-questions/sections-questions";
import {QuestionsProvider} from "../../providers/questions/questions";

@Component({
  selector: 'page-section-poll',
  templateUrl: 'section-poll.html',
})
export class SectionPollPage {

  name: string = null;
  id: number = null;
  orden: number = null;
  dataSectionQuestion: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _sectionQuestion: SectionsQuestionsProvider,
              private _question: QuestionsProvider) {

      this.name = this.navParams.get('nombre');
      this.id = this.navParams.get('id');
  }

  ionViewDidLoad(){
      this.getQuestionsPolls();
  }


  getQuestionsPolls(){
    this._sectionQuestion.getQuestionsPoll(this.id)
        .then(resp => {

            this.orden = this.navParams.get('orden');

            for (let i = 0; i < resp.length; i++){

                this.dataSectionQuestion.push({
                    s_id_pregunta: resp[i].s_id_pregunta,
                    idpregunta: resp[i].idpregunta,
                    pregunta: resp[i].pregunta,
                    nro: resp[i].nro,
                    idtipopregunta: resp[i].idtipopregunta,
                    visualizar: resp[i].visualizar,
                    sumatoria: resp[i].sumatoria,
                    comentarios: resp[i].comentarios,
                    pre_minimo: resp[i].pre_minimo,
                    pre_maximo: resp[i].pre_maximo,
                    pre_tabla: resp[i].pre_tabla,
                    pre_columna: resp[i].pre_columna,
                    orden: resp[i].orden,
                    options: []
                });

                if (resp[i].visualizar === 2){
                    this._question.getOptionsQuestion(resp[i].idpregunta)
                        .then(resp => {

                            for (let j = 0; j < resp.length; j++){
                                this.dataSectionQuestion[i].options.push(resp[j]);
                            }

                        })
                        .catch(error => {
                            alert(JSON.stringify(error));
                        })
                }
            }
        })
        .catch(error => {
            alert(JSON.stringify(error));
        })
  }

}
