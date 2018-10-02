import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";
import {ColorsProvider} from "../colors/colors";

/*
  Generated class for the SourcesSectionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SourcesSectionsProvider {

    db: SQLiteObject = null;

    constructor(public _color: ColorsProvider) {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableSourceSection(){
        let sql = 'CREATE TABLE IF NOT EXISTS fuente_seccion' +
            '(idseccion INTEGER, ' +
            'idfuente INTEGER, ' +
            'orden DECIMAL(10,8), ' +
            'nombre TEXT, ' +
            'ancho INTEGER, ' +
            'ubicacionsiguiente INTEGER, ' +
            'grilla INTEGER, ' +
            'incluirpagina INTEGER, ' +
            'pagina INTEGER, ' +
            'sec_estado INTEGER, ' +
            'color TEXT, ' +
            'CONSTRAINT idseccion_uq UNIQUE (idseccion))';

        return this.db.executeSql(sql, []);
    }

    getAllSourceSection(){
        let sql = 'SELECT * FROM fuente_seccion';
        return this.db.executeSql(sql, [])
            .then(response => {
                let s_section = [];
                for (let index = 0; index < response.rows.length; index++) {
                    s_section.push( response.rows.item(index) );
                }
                return Promise.resolve( s_section );
            })
            .catch(error => Promise.reject(error));
    }

    insertSourceSection(s_source: any[]){

        let sql = 'INSERT INTO fuente_seccion(' +
            'idseccion, ' +
            'idfuente, ' +
            'orden, ' +
            'nombre, ' +
            'ancho, ' +
            'ubicacionsiguiente, ' +
            'grilla, ' +
            'incluirpagina, ' +
            'pagina, ' +
            'sec_estado, ' +
            'color) ' +
            'VALUES(?,?,?,?,?,?,?,?,?,?,?)';


        for (let i = 0; i < s_source.length; i++){
            this.db.executeSql(sql, [parseInt(s_source[i].idseccion), s_source[i].idfuente,
                                            parseFloat(s_source[i].orden), s_source[i].nombre,
                                            parseInt(s_source[i].ancho), parseInt(s_source[i].ubicacionsiguiente),
                                            parseInt(s_source[i].grilla), parseInt(s_source[i].incluirpagina),
                                            parseInt(s_source[i].pagina), parseInt(s_source[i].sec_estado),
                                            this._color.getRandomColor()]);
        }


        return this.db;
    }


    getSourcesSectionRecords(idfuente: number){
        let sql = 'SELECT * FROM fuente_seccion fs WHERE fs.idfuente = ? ORDER BY fs.orden ASC';
        return this.db.executeSql(sql, [idfuente])
            .then(response => {
                let s_section = [];
                for (let index = 0; index < response.rows.length; index++) {
                    s_section.push( response.rows.item(index) );
                }
                return Promise.resolve( s_section );
            })
            .catch(error => Promise.reject(error));
    }

    deleteTableSourceSection(){
        let sql = 'DROP TABLE IF EXISTS fuente_seccion';
        return this.db.executeSql(sql, []);
    }

}
