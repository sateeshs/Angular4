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
export class WeatherFeed {

    constructor(private _http: Http) { }
    private  baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
    private baseIdUrl = 'http://api.openweathermap.org/data/2.5/weather?id=';
    private baseForecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=';
    private apiKey= '7b26e0a6706f8aa8eeb2bb59051244fb';
    weatherModel: WeatherModel;

    getFeed(cityName: string): Observable<any> {
        const url = this.baseUrl + cityName + '&AppId=' + this.apiKey;
        const urlId = this.baseIdUrl + cityName + '&AppId=' + this.apiKey;
console.log(urlId);

const feed = this._http.get(urlId)
                    .map((response => response.json()))
                    //.do(data=>{console.log('Northvill:'+ JSON.stringify(data))})
                    .catch(this.handleError);
        return feed;

    }
///
getForecastFeed(cityId: string): Observable<any> {
    const urlId = this.baseForecastUrl + cityId + '&AppId=' + this.apiKey;
    return this._http.get(urlId)
                     .map(response => response.json())
                    .catch(this.handleError);
}
///
getDashboardFeed(cityId: string): Observable<any> {
    const url = this.baseIdUrl + cityId + '&AppId=' + this.apiKey;
    const url2 = this.baseForecastUrl + cityId + '&AppId=' + this.apiKey;
    return Observable.forkJoin([
        this._http.get(url).map(response => response.json()),
        this._http.get(url2).map(response => response.json())
    ]).catch(this.handleError);
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
