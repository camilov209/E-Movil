
import { Injectable } from '@angular/core';
import {Geolocation, GeolocationOptions, Geoposition} from '@ionic-native/geolocation';


@Injectable()
export class GeopositionProvider {

    private watch: any;

    position:any = {};

    options : GeolocationOptions;
    currentPos : Geoposition;

  constructor(private geolocation:Geolocation) {}

    startLocation(){

        this.options = {
            enableHighAccuracy : true
        };

        return this.geolocation.getCurrentPosition(this.options)
            .then((pos : Geoposition) => {
                this.position = pos;
                return this.position;

            },(err : PositionError)=>{
                alert("error : " + err.message);
            });
    }

    stopLocation(){
        this.watch.unsubscribe();
    }

}
