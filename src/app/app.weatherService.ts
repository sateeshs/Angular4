import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';

import 'rxjs/add/observable/of';

import {WeatherModel} from './Iweather.model';
@Injectable()
export class WeatherFeed{

    constructor(private _http: Http) { }
    private  baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
    private apiKey='7b26e0a6706f8aa8eeb2bb59051244fb';
    weatherModel: WeatherModel;


    getFeed(cityName:string):Observable<any>{

        //return Observable.of();
        var url = this.baseUrl + cityName + '&AppId=' + this.apiKey;
console.log(url);
var feed= this._http.get(url)
          .map((response =>response.json()))
          .do(data=>{console.log('Northvill:'+JSON.stringify(data))})
          .catch(this.handleError);
        return feed;
          
    }

    private handleError(error: Response) {
        
                // output errors to the console.
        
                console.error(error);
        
                return Observable.throw(error.json().error || "Server error");
        
            }

            private extractData(response: Response) {
                
                        let body = response.json();
                
                        return body.data || {};
                    }
}