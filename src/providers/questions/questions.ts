import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class QuestionsProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableQuestion(){
        let sql = 'CREATE TABLE IF NOT EXISTS pregunta' +
            '(idpregunta INTEGER, ' +
            'pregunta TEXT, ' +
            'nro INTEGER, ' +
            'idtipopregunta INTEGER, ' +
            'visualizar INTEGER, ' +
            'sumatoria INTEGER, ' +
            'comentarios TEXT, ' +
            'pre_minimo TEXT, ' +
            'pre_maximo TEXT, ' +
            'pre_tabla TEXT, ' +
            'pre_columna TEXT, ' +
            'CONSTRAINT idpregunta_uq UNIQUE (idpregunta))';

        return this.db.executeSql(sql, []);
    }

    getAllQuestion(){
        let sql = 'SELECT * FROM pregunta';
        return this.db.executeSql(sql, [])
            .then(response => {
                let question = [];
                for (let index = 0; index < response.rows.length; index++) {
                    question.push( response.rows.item(index) );
                }
                return Promise.resolve( question );
            })
            .catch(error => Promise.reject(error));
    }

    insertQuestion(question: any[]){

        let sql = 'INSERT INTO pregunta(' +
            'idpregunta, ' +
            'pregunta, ' +
            'nro, ' +
            'idtipopregunta, ' +
            'visualizar, ' +
            'sumatoria, ' +
            'comentarios, ' +
            'pre_minimo, ' +
            'pre_maximo, ' +
            'pre_tabla, ' +
            'pre_columna) ' +
            'VALUES(?,?,?,?,?,?,?,?,?,?,?)';


        for (let i = 0; i < question.length; i++){
            this.db.executeSql(sql, [parseInt(question[i].idpregunta), question[i].pregunta, parseInt(question[i].nro),
                parseInt(question[i].idtipopregunta), parseInt(question[i].visualizar), parseInt(question[i].sumatoria),
                question[i].comentarios, question[i].pre_minimo, question[i].pre_maximo, question[i].pre_tabla,
                question[i].pre_columna]);
        }
        return this.db;
    }

    getOptionsQuestion(idpregunta){
        let sql = 'SELECT p.pregunta, o.etiqueta, o.idopcion ' +
            'FROM pregunta p ' +
            'JOIN pregunta_opcion po ' +
            'ON p.idpregunta = po.idpregunta ' +
            'JOIN opcion o ' +
            'ON po.idopcion = o.idopcion ' +
            'WHERE p.idpregunta = ? ' +
            'ORDER BY po.orden ASC';

        return this.db.executeSql(sql, [idpregunta])
            .then(response => {
                let option_question = [];
                for (let index = 0; index < response.rows.length; index++) {
                    option_question.push( response.rows.item(index) );
                }
                return Promise.resolve( option_question );
            })
            .catch(error => Promise.reject(error));
    }


    deleteTableQuestion(){
        let sql = 'DROP TABLE IF EXISTS pregunta;';
        return this.db.executeSql(sql, []);
    }

}
