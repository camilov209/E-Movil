import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TablesModulesProvider {

    constructor(public http: HttpClient) {
        console.log('Hello LoginUserProvider Provider');
    }

    getTables(table: string){

        return this.http.post('http://www.asirsabacolombia.com/asircapacitacion/wsRest/obtenerInformacionEncuestas.php', ({tables : table}));
    }

}