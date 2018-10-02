import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class BeneficiariesTypesProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableTypeBeneficiary(){
        let sql = 'CREATE TABLE IF NOT EXISTS tipo_beneficiario' +
            '(idtipo_beneficiario INTEGER, ' +
            'nombre TEXT, ' +
            'CONSTRAINT idtipo_beneficiario_uq UNIQUE (idtipo_beneficiario))';

        return this.db.executeSql(sql, []);
    }

    getAllTypesBeneficiaries(){
        let sql = 'SELECT * FROM tipo_beneficiario ORDER BY nombre ASC';
        return this.db.executeSql(sql, [])
            .then(response => {
                let type_beneficiary = [];
                for (let index = 0; index < response.rows.length; index++) {
                    type_beneficiary.push( response.rows.item(index) );
                }
                return Promise.resolve( type_beneficiary );
            })
            .catch(error => Promise.reject(error));
    }

    insertTypeBeneficiary(type_beneficiary: any[]){

        let sql = 'INSERT INTO tipo_beneficiario(' +
            'idtipo_beneficiario, ' +
            'nombre) ' +
            'VALUES(?,?)';
        for (let i = 0; i < type_beneficiary.length; i++){
            this.db.executeSql(sql, [type_beneficiary[i].idtipo_beneficiario, type_beneficiary[i].nombre]);
        }
        return this.db;
    }


    deleteTableCountry(){
        let sql = 'DROP TABLE IF EXISTS tipo_beneficiario;';
        return this.db.executeSql(sql, []);
    }

}
