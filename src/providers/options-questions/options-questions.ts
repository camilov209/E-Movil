import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";


@Injectable()
export class OptionsQuestionsProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableOptionQuestion(){
        let sql = 'CREATE TABLE IF NOT EXISTS pregunta_opcion' +
            '(idpregunta INTEGER, ' +
            'idopcion INTEGER, ' +
            'orden INTEGER)';

        return this.db.executeSql(sql, []);
    }

    getAllOptionQuestion(){
        let sql = 'SELECT * FROM pregunta_opcion';
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

    insertOptionQuestion(option_question: any[]){

        let sql = 'INSERT INTO pregunta_opcion(' +
            'idpregunta, ' +
            'idopcion, ' +
            'orden) ' +
            'VALUES(?,?,?)';


        for (let i = 0; i < option_question.length; i++){
            this.db.executeSql(sql, [parseInt(option_question[i].idpregunta), parseInt(option_question[i].idopcion),
                parseInt(option_question[i].orden)]);
        }

        return this.db;
    }


    deleteTableOptionQuestion(){
        let sql = 'DROP TABLE IF EXISTS seccion_pregunta';
        return this.db.executeSql(sql, []);
    }

}
