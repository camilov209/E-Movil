import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";


@Injectable()
export class SectionsQuestionsProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableSectionQuestion(){
        let sql = 'CREATE TABLE IF NOT EXISTS seccion_pregunta' +
            '(idseccion INTEGER, ' +
            'idpregunta INTEGER, ' +
            'orden INTEGER, ' +
            'obligatoria INTEGER, ' +
            'ancho INTEGER, ' +
            'numerico INTEGER, ' +
            'sumatoria INTEGER, ' +
            'alineacion TEXT, ' +
            'depende_fuenteseccion TEXT, ' +
            'depende_seccionpregunta TEXT, ' +
            'depende_opcion TEXT, ' +
            'depende_valor TEXT, ' +
            'depende_operador TEXT, ' +
            'tipo_dependencia INTEGER, ' +
            'previsualizar INTEGER, ' +
            'id_seccion_ope INTEGER, ' +
            'preguntas_ope TEXT, ' +
            'operador_ope TEXT, ' +
            'secpre_estado INTEGER, ' +
            'id_seccionpregunta INTEGER, ' +
            'formula TEXT)';

        return this.db.executeSql(sql, []);
    }

    getAllSectionQuestion(){
        let sql = 'SELECT * FROM seccion_pregunta';
        return this.db.executeSql(sql, [])
            .then(response => {
                let sc_question = [];
                for (let index = 0; index < response.rows.length; index++) {
                    sc_question.push( response.rows.item(index) );
                }
                return Promise.resolve( sc_question );
            })
            .catch(error => Promise.reject(error));
    }

    insertSectionQuestion(sc_question: any[]){

        let sql = 'INSERT INTO seccion_pregunta(' +
            'idseccion, ' +
            'idpregunta, ' +
            'orden, ' +
            'obligatoria, ' +
            'ancho, ' +
            'numerico, ' +
            'sumatoria, ' +
            'alineacion, ' +
            'depende_fuenteseccion, ' +
            'depende_seccionpregunta, ' +
            'depende_opcion, ' +
            'depende_valor, ' +
            'depende_operador, ' +
            'tipo_dependencia, ' +
            'previsualizar, ' +
            'id_seccion_ope, ' +
            'preguntas_ope, ' +
            'operador_ope, ' +
            'secpre_estado, ' +
            'id_seccionpregunta, ' +
            'formula) ' +
            'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';


        for (let i = 0; i < sc_question.length; i++){
            this.db.executeSql(sql, [parseInt(sc_question[i].idseccion), sc_question[i].idpregunta,
                                            parseInt(sc_question[i].orden), sc_question[i].obligatoria,
                                            parseInt(sc_question[i].ancho), parseInt(sc_question[i].numerico),
                                            parseInt(sc_question[i].sumatoria), sc_question[i].alineacion,
                                            sc_question[i].depende_fuenteseccion, sc_question[i].depende_seccionpregunta,
                                            sc_question[i].depende_opcion, sc_question[i].depende_valor,
                                            sc_question[i].depende_operador, parseInt(sc_question[i].tipo_dependencia),
                                            parseInt(sc_question[i].previsualizar), parseInt(sc_question[i].id_seccion_ope),
                                            sc_question[i].preguntas_ope, sc_question[i].operador_ope,
                                            parseInt(sc_question[i].secpre_estado), parseInt(sc_question[i].id_seccionpregunta),
                                            sc_question[i].formula]);
        }

        return this.db;
    }


    getQuestionsPoll(idseccion){
        let sql =  'SELECT sp.idpregunta AS s_id_pregunta, p.*, sp.orden ' +
            'FROM seccion_pregunta sp ' +
            'JOIN pregunta p ' +
            'ON sp.idpregunta = p.idpregunta ' +
            'WHERE sp.idseccion = ? ' +
            'ORDER BY sp.orden ASC';

        return this.db.executeSql(sql, [idseccion])
            .then(response => {
                let questions_poll = [];
                for (let index = 0; index < response.rows.length; index++) {
                    questions_poll.push( response.rows.item(index) );
                }
                return Promise.resolve( questions_poll );
            })
            .catch(error => Promise.reject(error));

    }


    deleteTableSectionQuestion(){
        let sql = 'DROP TABLE IF EXISTS seccion_pregunta';
        return this.db.executeSql(sql, []);
    }



}
