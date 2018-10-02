import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class DepartmentsProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableDepartament(){
        let sql = 'CREATE TABLE IF NOT EXISTS depto' +
            '(iddepto INTEGER, ' +
            'nombre TEXT, ' +
            'idpais TEXT, ' +
            'CONSTRAINT iddepto_uq UNIQUE (iddepto))';

        return this.db.executeSql(sql, []);
    }

    getAllDepartaments(){
        let sql = 'SELECT * FROM depto';
        return this.db.executeSql(sql, [])
            .then(response => {
                let departament = [];
                for (let index = 0; index < response.rows.length; index++) {
                    departament.push( response.rows.item(index) );
                }
                return Promise.resolve( departament );
            })
            .catch(error => Promise.reject(error));
    }

    insertDepartament(departament: any[]){

        let sql = 'INSERT INTO depto(' +
            'iddepto, ' +
            'nombre, ' +
            'idpais) ' +
            'VALUES(?,?,?)';
        for (let i = 0; i < departament.length; i++){
            this.db.executeSql(sql, [parseInt(departament[i].iddepto), departament[i].nombre, departament[i].idpais]);
        }
        return this.db;
    }

    selectGroupDepartaments(id_pais:string){
        let sql = 'SELECT * FROM depto ' +
            'WHERE depto.idpais = ? ORDER BY nombre ASC';

        return this.db.executeSql(sql, [id_pais])
            .then(response => {
                let group_departament = [];
                for (let index = 0; index < response.rows.length; index++) {
                    group_departament.push( response.rows.item(index) );
                }
                return Promise.resolve( group_departament );
            })
            .catch(error => Promise.reject(error));
    }


    deleteTableDepartament(){
        let sql = 'DROP TABLE IF EXISTS iddepto;';
        return this.db.executeSql(sql, []);
    }



}
