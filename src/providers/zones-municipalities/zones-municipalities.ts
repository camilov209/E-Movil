
import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";

/*
  Generated class for the ZoneMunicipalityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ZonesMunicipalitiesProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableZonesMunicipalities(){
        let sql = 'CREATE TABLE IF NOT EXISTS zona_municipio' +
            '(idzona INTEGER, ' +
            'codigo TEXT, ' +
            'idmunicipio INTEGER, ' +
            'nombrezona TEXT, ' +
            'idtipo_zona INTEGER, ' +
            'iddepto INTEGER, ' +
            'idpais TEXT, ' +
            'CONSTRAINT idzona_uq UNIQUE (idzona))';

        return this.db.executeSql(sql, []);
    }

    getAllZoneMunicipality(){
        let sql = 'SELECT * FROM zona_municipio';
        return this.db.executeSql(sql, [])
            .then(response => {
                let zone_municipality = [];
                for (let index = 0; index < response.rows.length; index++) {
                    zone_municipality.push( response.rows.item(index) );
                }
                return Promise.resolve( zone_municipality );
            })
            .catch(error => Promise.reject(error));
    }

    insertZoneMunicipality(zone_munipality: any[]){

        let sql = 'INSERT INTO zona_municipio(' +
            'idzona, ' +
            'codigo, ' +
            'idmunicipio, ' +
            'nombrezona, ' +
            'idtipo_zona, ' +
            'iddepto, ' +
            'idpais) ' +
            'VALUES(?,?,?,?,?,?,?)';
        for (let i = 0; i < zone_munipality.length; i++){
            this.db.executeSql(sql, [parseInt(zone_munipality[i].idzona), zone_munipality[i].codigo,
                                            parseInt(zone_munipality[i].idmunicipio), zone_munipality[i].nombrezona,
                                            parseInt(zone_munipality[i].idtipo_zona), parseInt(zone_munipality[i].iddepto,
                                            zone_munipality[i].idpais)]);
        }
        return this.db;
    }

    selectGroupZonesMunicipalities(id_municipio:number, id_tipo_zona: number){
        let sql = 'SELECT * FROM zona_municipio ' +
            'WHERE zona_municipio.idmunicipio = ? AND idtipo_zona = ? ORDER BY nombrezona ASC';

        return this.db.executeSql(sql, [id_municipio, id_tipo_zona])
            .then(response => {
                let group_zone_municipaly = [];
                if (response.rows.length !== 0){
                    for (let index = 0; index < response.rows.length; index++) {
                        group_zone_municipaly.push( response.rows.item(index) );
                    }
                    return Promise.resolve( group_zone_municipaly );
                }else {
                    return null;
                }

            })
            .catch(error => Promise.reject(error));
    }


    deleteTableZoneMunicipality(){
        let sql = 'DROP TABLE IF EXISTS municipio;';
        return this.db.executeSql(sql, []);
    }

}
