
import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";


@Injectable()
export class MunicipalitiesProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableMunicipalities(){
        let sql = 'CREATE TABLE IF NOT EXISTS municipio' +
            '(idmunicipio INTEGER, ' +
            'nombremunicipio TEXT, ' +
            'iddepto INTEGER, ' +
            'idpais TEXT, ' +
            'CONSTRAINT idmunicipio_uq UNIQUE (idmunicipio))';

        return this.db.executeSql(sql, []);
    }

    getAllMunicipality(){
        let sql = 'SELECT * FROM municipio';
        return this.db.executeSql(sql, [])
            .then(response => {
                let municipality = [];
                for (let index = 0; index < response.rows.length; index++) {
                    municipality.push( response.rows.item(index) );
                }
                return Promise.resolve( municipality );
            })
            .catch(error => Promise.reject(error));
    }

    insertMunicipality(municipality: any[]){

        let sql = 'INSERT INTO municipio(' +
            'idmunicipio, ' +
            'nombremunicipio, ' +
            'iddepto, ' +
            'idpais) ' +
            'VALUES(?,?,?,?)';
        for (let i = 0; i < municipality.length; i++){
            this.db.executeSql(sql, [parseInt(municipality[i].idmunicipio), municipality[i].nombremunicipio,
                              parseInt(municipality[i].iddepto), municipality[i].idpais]);
        }
        return this.db;
    }

    selectGroupMunicipalities(id_departamento:number){
        let sql = 'SELECT * FROM municipio ' +
            'WHERE municipio.iddepto = ? ORDER BY nombremunicipio ASC';

        return this.db.executeSql(sql, [id_departamento])
            .then(response => {
                let group_municipaly = [];
                for (let index = 0; index < response.rows.length; index++) {
                    group_municipaly.push( response.rows.item(index) );
                }
                return Promise.resolve( group_municipaly );
            })
            .catch(error => Promise.reject(error));
    }


    deleteTableMunicipality(){
        let sql = 'DROP TABLE IF EXISTS municipio;';
        return this.db.executeSql(sql, []);
    }


}
