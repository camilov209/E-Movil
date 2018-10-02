import { Injectable } from '@angular/core';

//SQLiteObject
import { SQLiteObject } from "@ionic-native/sqlite";


@Injectable()
export class CountriesProvider {
  db: SQLiteObject = null;

  constructor() {}

  setDatabase(db: SQLiteObject){
      if (this.db === null){
          this.db = db;
      }
  }

  createTableCountry(){
      let sql = 'CREATE TABLE IF NOT EXISTS pais' +
          '(id_pais TEXT, ' +
          'nombre_pais TEXT, ' +
          'CONSTRAINT id_pais_uq UNIQUE (id_pais))';

      return this.db.executeSql(sql, []);
  }

    getAllCountries(){
        let sql = 'SELECT * FROM pais ORDER BY nombre_pais ASC';
        return this.db.executeSql(sql, [])
            .then(response => {
                let country = [];
                for (let index = 0; index < response.rows.length; index++) {
                    country.push( response.rows.item(index) );
                }
                return Promise.resolve( country );
            })
            .catch(error => Promise.reject(error));
    }

    insertCountry(country: any[]){

        let sql = 'INSERT INTO pais(' +
            'id_pais, ' +
            'nombre_pais) ' +
            'VALUES(?,?)';
        for (let i = 0; i < country.length; i++){
            this.db.executeSql(sql, [country[i].id_pais, country[i].nombre_pais]);
        }
        return this.db;
    }

    updateCountry(country: any[]){
        let sql = 'UPDATE pais SET nombre_pais=? WHERE id_pais=?';

        for (let i = 0; i < country.length; i++){
            this.db.executeSql(sql, [country[i].id_pais, country[i].nombre_pais]);
        }

        return this.db;
    }

    deleteCountry(id_pais: any){
        let sql = 'DELETE FROM pais WHERE id_pais=?';

        return this.db.executeSql(sql, [id_pais]);
    }

    deleteTableCountry(){
        let sql = 'DROP TABLE IF EXISTS pais;';
        return this.db.executeSql(sql, []);
    }


}
