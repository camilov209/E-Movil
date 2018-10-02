import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class EthnicProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableEthnic(){
        let sql = 'CREATE TABLE IF NOT EXISTS tipo_etnia' +
            '(id_etnia INTEGER, ' +
            'etnia TEXT, ' +
            'CONSTRAINT id_etnia_uq UNIQUE (id_etnia))';

        return this.db.executeSql(sql, []);
    }

    getAllEthnicities(){
        let sql = 'SELECT * FROM tipo_etnia ORDER BY etnia ASC';
        return this.db.executeSql(sql, [])
            .then(response => {
                let ethnic = [];
                for (let index = 0; index < response.rows.length; index++) {
                    ethnic.push( response.rows.item(index) );
                }
                return Promise.resolve( ethnic );
            })
            .catch(error => Promise.reject(error));
    }

    insertEthnic(ethnic: any[]){

        let sql = 'INSERT INTO tipo_etnia(' +
            'id_etnia, ' +
            'etnia) ' +
            'VALUES(?,?)';
        for (let i = 0; i < ethnic.length; i++){
            this.db.executeSql(sql, [ethnic[i].id_etnia, ethnic[i].etnia]);
        }
        return this.db;
    }


    deleteTableEthnic(){
        let sql = 'DROP TABLE IF EXISTS tipo_etnia;';
        return this.db.executeSql(sql, []);
    }


}
