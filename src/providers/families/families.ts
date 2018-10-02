
import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";
import {ColorsProvider} from "../colors/colors";


@Injectable()
export class FamiliesProvider {

    db: SQLiteObject = null;
    count: number = 0;
    error: number = 0;

    constructor(public _color: ColorsProvider) {}

    setDatabase(db: SQLiteObject){
        if (this.db === null){
            this.db = db;
        }
    }

    createTableFamily(){
        let sql = 'CREATE TABLE IF NOT EXISTS familia' +
            '(codigoflia TEXT, ' +
            'idflia INTEGER, ' +
            'jefehogar TEXT, ' +
            'identificacion TEXT, ' +
            'integrantes INTEGER, ' +
            'idpais TEXT, ' +
            'iddepto INTEGER, ' +
            'idmunicipio INTEGER, ' +
            'idcorregimiento INTEGER, ' +
            'idcuenca INTEGER, ' +
            'idbarrio INTEGER, ' +
            'idtipo_beneficiario INTEGER, ' +
            'id_sexo INTEGER, ' +
            'id_etnia INTEGER, ' +
            'color TEXT)';

        return this.db.executeSql(sql, []);
    }

    getAllFamily(){
        let sql = 'SELECT f.idflia, f.codigoflia, f.jefehogar, f.identificacion, d.nombre, m.nombremunicipio, p.nombre_pais, f.color ' +
            'FROM familia f ' +
            'INNER JOIN municipio m ' +
            'ON f.idmunicipio = m.idmunicipio ' +
            'INNER JOIN depto d ' +
            'ON m.iddepto = d.iddepto ' +
            'INNER JOIN pais p ' +
            'ON d.idpais = p.id_pais ' +
            'ORDER BY f.jefehogar ASC';
        return this.db.executeSql(sql, [])
            .then(response => {
                let family = [];
                for (let index = 0; index < response.rows.length; index++) {
                    family.push( response.rows.item(index) );
                }
                return Promise.resolve( family );
            })
            .catch(error => Promise.reject(error));
    }


    getGroupFamily(codigofamilia: number, identificacion: number){
        let sql = 'SELECT * FROM familia f ' +
            'WHERE f.idflia = ? AND f.identificacion = ?';

        return this.db.executeSql(sql, [codigofamilia, identificacion])
            .then(response => {
                let group_family = [];
                for (let index = 0; index < response.rows.length; index++) {
                    group_family.push( response.rows.item(index) );
                }
                return Promise.resolve( group_family );
            })
            .catch(error => Promise.reject(error));
    }

    insertFamily(family: any[]){

        let sql = 'INSERT INTO familia(' +
            'codigoflia, ' +
            'idflia, ' +
            'jefehogar, ' +
            'identificacion, ' +
            'integrantes, ' +
            'idpais, ' +
            'iddepto, ' +
            'idmunicipio, ' +
            'idcorregimiento, ' +
            'idcuenca, ' +
            'idbarrio, ' +
            'idtipo_beneficiario, ' +
            'id_sexo, ' +
            'id_etnia, ' +
            'color) ' +
            'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';


        for (let i = 0; i < family.length; i++){
            this.db.executeSql(sql, [family[i].codigoflia, family[i].idflia,
                family[i].jefehogar, family[i].identificacion,
                parseInt(family[i].integrantes), family[i].idpais,
                parseInt(family[i].iddepto), parseInt(family[i].idmunicipio),
                parseInt(family[i].idcorregimiento), parseInt(family[i].idcuenca),
                parseInt(family[i].idbarrio), parseInt(family[i].idtipo_beneficiario),
                parseInt(family[i].id_sexo), parseInt(family[i].id_etnia), this._color.getRandomColor()])

        }

        return this.db;

    }

    updateFamily(idpais: string, iddepto: number, idmunicipio: number, idcorregimiento: number, idbarrio: number, idcuenca: number, idtipo_beneficiario: number, jefehogar: string, identificacion: string, id_sexo: number, id_etnia: number, integrantes: number, idflia: number, codigoflia: string) {

        let sql = "UPDATE familia " +
            "SET idpais = ?, " +
            "iddepto = ?, " +
            "idmunicipio = ?, " +
            "idcorregimiento = ?, " +
            "idbarrio = ?, " +
            "idcuenca = ?, " +
            "idtipo_beneficiario = ?, " +
            "jefehogar = ?, " +
            "identificacion = ?, " +
            "id_sexo = ?, " +
            "id_etnia = ?, " +
            "integrantes = ? " +
            "WHERE idflia = ? AND codigoflia = ?";

        this.db.executeSql(sql, [idpais, iddepto, idmunicipio, idcorregimiento, idbarrio, idcuenca, idtipo_beneficiario, jefehogar, identificacion, id_sexo, id_etnia, integrantes, idflia, codigoflia])
            .then(resp =>{
                alert("Datos modificados correctamente");
            })
            .catch(error=>{
                alert(JSON.stringify(error));
            })
    }


    deleteTableFamily(){
        let sql = 'DROP TABLE IF EXISTS familia';
        return this.db.executeSql(sql, []);
    }
	
	insertFamilyOnly(idpais: string, iddepto: number, idmunicipio: number, idcorregimiento: number, idbarrio: number, idcuenca: number, idtipo_beneficiario: number, jefehogar: string, identificacion: string, id_sexo: number, id_etnia: number, integrantes: number, codigoflia: string){


        let sqlIdFlia = 'SELECT f.idflia FROM familia f ORDER BY f.idflia DESC LIMIT 1';

        return this.db.executeSql(sqlIdFlia, [])
            .then(response => {
                let group_family = [];
                for (let index = 0; index < response.rows.length; index++) {
                    group_family.push( response.rows.item(index) );
                }

                let sql = 'INSERT INTO familia(' +
                    'codigoflia, ' +
                    'idflia, ' +
                    'jefehogar, ' +
                    'identificacion, ' +
                    'integrantes, ' +
                    'idpais, ' +
                    'iddepto, ' +
                    'idmunicipio, ' +
                    'idcorregimiento, ' +
                    'idcuenca, ' +
                    'idbarrio, ' +
                    'idtipo_beneficiario, ' +
                    'id_sexo, ' +
                    'id_etnia) ' +
                    'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

                return this.db.executeSql(sql, [codigoflia, parseInt(group_family[0].idflia) + 1, jefehogar, identificacion, integrantes, idpais, iddepto, idmunicipio, idcorregimiento, idcuenca, idbarrio, idtipo_beneficiario, id_sexo, id_etnia])
                    .then(resp =>{
                        return Promise.resolve(resp);
                    })
                    .catch(error=>{
                        return Promise.reject(error);
                    })
            })
            .catch(error => Promise.reject(error));





	}



}
