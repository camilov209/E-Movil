import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ColorsProvider {

  constructor(public http: HttpClient) {}

  color:any[] =
      [
        '#D50000', '#C51162', '#AA00FF',
        '#311B92', '#1A237E', '#0D47A1',
        '#0091EA', '#00B8D4', '#DD2C00',
        '#00BFA5', '#1B5E20', '#33691E',
        '#348242', '#C2185B', '#FFAB00',
        '#FF6D00', '#E91E63', '#353d5d'
      ];


  getRandomColor(){
      let number = Math.floor(Math.random() * 18);
      return this.color[number];
  }



}
