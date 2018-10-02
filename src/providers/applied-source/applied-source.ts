
import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";


@Injectable()
export class AppliedSourceProvider {

    db: SQLiteObject = null;

    constructor() {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableAppliedSource(){

        let sql = 'CREATE TABLE IF NOT EXISTS fuente_aplicada ' +
            '(idfuente_aplicada INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'idfuente INTEGER, ' +
            'idproyecto INTEGER, ' +
            'fecha DATE, ' +
            'codgeo TEXT, ' +
            'indicador_vigencia INTEGER, ' +
            'id_pais TEXT, ' +
            'idmunicipio INTEGER, ' +
            'idcorregimiento INTEGER, ' +
            'idcuenca INTEGER, ' +
            'idbarrio INTEGER, ' +
            'iddepto INTEGER, ' +
            'idflia INTEGER, ' +
            'idfuncionario INTEGER, ' +
            'digitalizacion DATE, ' +
            'terminada INTEGER, ' +
            'idfuente_aplicada_pda INTEGER, ' +
            'idtipo_beneficiario INTEGER, ' +
            'latitud TEXT, ' +
            'longitud TEXT, ' +
            'es_copia TEXT, ' +
            'id_copia INT, ' +
            'CONSTRAINT idfuente_aplicada UNIQUE (idfuente_aplicada))';

        return this.db.executeSql(sql, []);
    }

    getAllAppliedSource(){
        let sql = 'SELECT * FROM fuente_aplicada';
        return this.db.executeSql(sql, [])
            .then(response => {
                let applied_source = [];
                for (let index = 0; index < response.rows.length; index++) {
                    applied_source.push( response.rows.item(index) );
                }
                return Promise.resolve( applied_source );
            })
            .catch(error => Promise.reject(error));
    }

    getAllAppliedSourceGroup(idfuente: number){
        let sql = 'SELECT id_pais, m.nombremunicipio, d.nombre, p.nombres, p.apellidos, fa.digitalizacion FROM fuente_aplicada fa ' +
            'INNER JOIN municipio m ' +
            'ON fa.idmunicipio = m.idmunicipio ' +
            'INNER JOIN depto d ' +
            'ON m.iddepto = d.iddepto ' +
            'INNER JOIN personal p ' +
            'ON fa.idfuncionario = p.idpersonal ' +
            'WHERE fa.idfuente = ?';
        return this.db.executeSql(sql, [idfuente])
            .then(response => {
                let applied_source_group = [];
                for (let index = 0; index < response.rows.length; index++) {
                    applied_source_group.push( response.rows.item(index) );
                }
                return Promise.resolve( applied_source_group );
            })
            .catch(error => Promise.reject(error));
    }

    insertAppliedSource(idfuente: number, idproyecto: number, fecha: string, codgeo: string,
                        idindicadorvigencia: number, idpais: string, idmunicipio: number, idcorregimiento: number,
                        idcuenca: number, idbarrio: number, iddepto: number, idflia: number, idfuncionario: number,
                        digitalizacion: string, terminada: number, idfuenteaplicadapda: number, idtipobeneficiario: number,
                        latitud: string, longitud: string, escopia: string, idcopia: number){

        let sql = 'INSERT INTO fuente_aplicada( ' +
            'idfuente, ' +
            'idproyecto, ' +
            'fecha, ' +
            'codgeo, ' +
            'indicador_vigencia, ' +
            'id_pais, ' +
            'idmunicipio, ' +
            'idcorregimiento, ' +
            'idcuenca, ' +
            'idbarrio, ' +
            'iddepto, ' +
            'idflia, ' +
            'idfuncionario, ' +
            'digitalizacion, ' +
            'terminada, ' +
            'idfuente_aplicada_pda, ' +
            'idtipo_beneficiario, ' +
            'latitud, ' +
            'longitud, ' +
            'es_copia, ' +
            'id_copia) ' +
            'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

            return this.db.executeSql(sql, [idfuente, idproyecto, fecha, codgeo, idindicadorvigencia,
                                            idpais, idmunicipio, idcorregimiento, idcuenca, idbarrio, iddepto, idflia,
                                            idfuncionario, digitalizacion, terminada, idfuenteaplicadapda, idtipobeneficiario,
                                            latitud, longitud, escopia, idcopia])
                .then(resp =>{
                    return Promise.resolve(resp);
                })
                .catch(err =>{
                    alert(JSON.stringify(err));
                });

    }

    deleteTableAppliedSource(){
        let sql = 'DROP TABLE IF EXISTS fuente_aplicada;';
        return this.db.executeSql(sql, []);
    }



}
