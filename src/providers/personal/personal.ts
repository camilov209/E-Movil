import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class PersonalProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTablePersonal(){
        let sql = 'CREATE TABLE IF NOT EXISTS personal' +
            '(idpersonal INTEGER, ' +
            'identificacion TEXT, ' +
            'nombres TEXT, ' +
            'apellidos TEXT, ' +
            'telefono TEXT, ' +
            'idsede INTEGER, ' +
            'idcargo INTEGER, ' +
            'idarea INTEGER, ' +
            'usuario TEXT, ' +
            'clave TEXT, ' +
            'estado INTEGER, ' +
            'correo TEXT, ' +
            'CONSTRAINT idpersonal_uq UNIQUE (idpersonal))';

        return this.db.executeSql(sql, []);
    }

    getAllPersonal(){
        let sql = 'SELECT * FROM personal';
        return this.db.executeSql(sql, [])
            .then(response => {
                let personal = [];
                for (let index = 0; index < response.rows.length; index++) {
                    personal.push( response.rows.item(index) );
                }
                return Promise.resolve( personal );
            })
            .catch(error => Promise.reject(error));
    }

    insertPersonal(personal: any[]){

        let sql = 'INSERT INTO personal(' +
            'idpersonal, ' +
            'identificacion, ' +
            'nombres, ' +
            'apellidos, ' +
            'telefono, ' +
            'idsede, ' +
            'idcargo, ' +
            'idarea, ' +
            'usuario, ' +
            'clave, ' +
            'estado, ' +
            'correo) ' +
            'VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';


        for (let i = 0; i < personal.length; i++){
            this.db.executeSql(sql, [personal[i].idpersonal, personal[i].identificacion, personal[i].nombres,
                                            personal[i].apellidos, personal[i].telefono, parseInt(personal[i].idsede), parseInt(personal[i].idcargo),
                                            parseInt(personal[i].idarea), personal[i].usuario, personal[i].clave, parseInt(personal[i].estado),
                                            personal[i].correo]);
        }
        return this.db;
    }

    getPersonalLogin(username: string, password: string){
        let sql = 'SELECT idpersonal, estado, nombres, apellidos ' +
            'FROM personal ' +
            'WHERE usuario=?' +
            'AND ' +
            'clave=?';
        return this.db.executeSql(sql, [username, password])
            .then(response => {
                let personal = [];
                for (let index = 0; index < response.rows.length; index++) {
                    personal.push( response.rows.item(index) );
                }
                return Promise.resolve( personal );
            })
            .catch(error => Promise.reject(error));
    }

    getProfilePersonal(id_personal: number){
        let sql = 'SELECT * ' +
            'FROM personal ' +
            'WHERE idpersonal=?';
        return this.db.executeSql(sql, [id_personal])
            .then(response => {
                let personal = [];
                for (let index = 0; index < response.rows.length; index++) {
                    personal.push( response.rows.item(index) );
                }
                return Promise.resolve( personal );
            })
            .catch(error => Promise.reject(error));
    }



    deleteTablePersonal(){
        let sql = 'DROP TABLE IF EXISTS personal;';
        return this.db.executeSql(sql, []);
    }

}
