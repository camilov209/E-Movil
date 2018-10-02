import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";


@Injectable()
export class GendersProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableGender(){
        let sql = 'CREATE TABLE IF NOT EXISTS con_sexo' +
            '(id_sexo INTEGER, ' +
            'sexo TEXT, ' +
            'CONSTRAINT id_sexo UNIQUE (id_sexo))';

        return this.db.executeSql(sql, []);
    }

    getAllGenders(){
        let sql = 'SELECT * FROM con_sexo ORDER BY sexo ASC';
        return this.db.executeSql(sql, [])
            .then(response => {
                let gender = [];
                for (let index = 0; index < response.rows.length; index++) {
                    gender.push( response.rows.item(index) );
                }
                return Promise.resolve( gender );
            })
            .catch(error => Promise.reject(error));
    }

    insertGender(gender: any[]){

        let sql = 'INSERT INTO con_sexo(' +
            'id_sexo, ' +
            'sexo) ' +
            'VALUES(?,?)';
        for (let i = 0; i < gender.length; i++){
            this.db.executeSql(sql, [gender[i].id_sexo, gender[i].sexo]);
        }
        return this.db;
    }


    deleteTableGender(){
        let sql = 'DROP TABLE IF EXISTS con_sexo;';
        return this.db.executeSql(sql, []);
    }

}
