
import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";


@Injectable()
export class AppliedSourceQuestionProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableAppliedSourceQuestion(){
        let sql = 'CREATE TABLE IF NOT EXISTS fuente_aplicada_pregunta ' +
            '(idfuente_aplicada_pregunta INTEGER PRIMARY KEY, ' +
            'idfuente_aplicada INTEGER, ' +
            'idpregunta INTEGER, ' +
            'idrespuesta INTEGER, ' +
            'textorespuesta TEXT, ' +
            'nombrearchivo TEXT, ' +
            'archivo TEXT, ' +
            'registro INTEGER, ' +
            'idseccion INTEGER, ' +
            'CONSTRAINT idfuente_aplicada_pregunta UNIQUE (idfuente_aplicada_pregunta))';

        return this.db.executeSql(sql, []);
    }

    getAllAppliedSourceQuestion(){
        let sql = 'SELECT * FROM fuente_aplicada_pregunta';
        return this.db.executeSql(sql, [])
            .then(response => {
                let applied_source_question = [];
                for (let index = 0; index < response.rows.length; index++) {
                    applied_source_question.push( response.rows.item(index) );
                }
                return Promise.resolve( applied_source_question );
            })
            .catch(error => Promise.reject(error));
    }

    insertAppliedSourceQuestion(applied_source: any[]){

        let sql = 'INSERT INTO fuente_aplicada_pregunta(' +
            'idfuente_aplicada_pregunta, ' +
            'idfuente_aplicada, ' +
            'idpregunta, ' +
            'idrespuesta, ' +
            'textorespuesta, ' +
            'nombrearchivo, ' +
            'archivo, ' +
            'registro, ' +
            'idseccion)' +
            'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        for (let i = 0; i < applied_source.length; i++){
            this.db.executeSql(sql, []);
        }
        return this.db;
    }


    deleteTableAppliedSource(){
        let sql = 'DROP TABLE IF EXISTS fuente_aplicada_pregunta;';
        return this.db.executeSql(sql, []);
    }

}
