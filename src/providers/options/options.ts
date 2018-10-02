import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";


@Injectable()
export class OptionsProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableOption(){
        let sql = 'CREATE TABLE IF NOT EXISTS opcion' +
            '(idopcion INTEGER, ' +
            'idtipopregunta INTEGER, ' +
            'etiqueta TEXT, ' +
            'numerica INTEGER)';

        return this.db.executeSql(sql, []);
    }

    getAllOption(){
        let sql = 'SELECT * FROM opcion';
        return this.db.executeSql(sql, [])
            .then(response => {
                let option = [];
                for (let index = 0; index < response.rows.length; index++) {
                    option.push( response.rows.item(index) );
                }
                return Promise.resolve( option );
            })
            .catch(error => Promise.reject(error));
    }

    insertOption(option: any[]){

        let sql = 'INSERT INTO opcion(' +
            'idopcion, ' +
            'idtipopregunta, ' +
            'etiqueta, ' +
            'numerica) ' +
            'VALUES(?,?,?,?)';


        for (let i = 0; i < option.length; i++){
            this.db.executeSql(sql, [parseInt(option[i].idopcion), parseInt(option[i].idtipopregunta), option[i].etiqueta,
                parseInt(option[i].numerica)]);
        }
        return this.db;
    }


    deleteTableOption(){
        let sql = 'DROP TABLE IF EXISTS opcion;';
        return this.db.executeSql(sql, []);
    }

}
