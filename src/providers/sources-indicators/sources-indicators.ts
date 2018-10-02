import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";
import {ColorsProvider} from "../colors/colors";


@Injectable()
export class SourcesIndicatorsProvider {

    db: SQLiteObject = null;

    constructor(public _color: ColorsProvider) {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableSourceIndicator(){
        let sql = 'CREATE TABLE IF NOT EXISTS fuenteindicador' +
            '(idfuente INTEGER, ' +
            'nombrefuente TEXT, ' +
            'codigo INTEGER, ' +
            'tipoficha INTEGER, ' +
            'codflia INTEGER, ' +
            'codgeo INTEGER, ' +
            'fecha INTEGER, ' +
            'color TEXT, ' +
            'CONSTRAINT idfuente_uq UNIQUE (idfuente))';

        return this.db.executeSql(sql, []);
    }

    getAllSourceIndicator(){
        let sql = 'SELECT fi.*, COUNT(fa.idfuente) AS count_instrument, count(CASE WHEN fa.terminada = 1 THEN fa.terminada ELSE NULL END) AS count_polls ' +
            'FROM fuenteindicador fi ' +
            'LEFT JOIN fuente_aplicada fa ' +
            'ON fi.idfuente = fa.idfuente ' +
            'GROUP BY fi.idfuente ORDER BY fi.idfuente ASC';

        return this.db.executeSql(sql, [])
            .then(response => {
                let s_inidicators = [];
                for (let index = 0; index < response.rows.length; index++) {
                    s_inidicators.push( response.rows.item(index) );
                }
                return Promise.resolve( s_inidicators );
            })
            .catch(error => Promise.reject(error));
    }

    insertSourceIndicator(s_indicators: any[]){

        let sql = 'INSERT INTO fuenteindicador(' +
            'idfuente, ' +
            'nombrefuente, ' +
            'codigo, ' +
            'tipoficha, ' +
            'codflia, ' +
            'codgeo, ' +
            'fecha, ' +
            'color) ' +
            'VALUES(?,?,?,?,?,?,?,?)';


        for (let i = 0; i < s_indicators.length; i++){
            this.db.executeSql(sql, [parseInt(s_indicators[i].idfuente), s_indicators[i].nombrefuente,
                                            parseInt(s_indicators[i].codigo), parseInt(s_indicators[i].tipoficha),
                                            parseInt(s_indicators[i].codflia), parseInt(s_indicators[i].codgeo),
                                            parseInt(s_indicators[i].fecha), this._color.getRandomColor()]);
        }


        return this.db;
    }


    getSourceIndicatorName(idfuente){
        let sql = 'SELECT fi.nombrefuente FROM fuenteindicador fi WHERE idfuente = ?';
        return this.db.executeSql(sql, [idfuente])
            .then(response => {
                let s_indicator = [];
                for (let index = 0; index < response.rows.length; index++) {
                    s_indicator.push( response.rows.item(index) );
                }
                return Promise.resolve( s_indicator );
            })
            .catch(error => Promise.reject(error));
    }


    deleteTableSourceIndicator(){
        let sql = 'DROP TABLE IF EXISTS fuenteindicador;';
        return this.db.executeSql(sql, []);
    }
}
