import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';

import 'rxjs/add/observable/of';

import {CityModel} from './app.city.model';
//import * as data from './data/city.list.json';

@Injectable()
export class CityDataService  {

    data: CityModel[];
    testData: Object;

    constructor(private _http: Http) {

    }
getData(): Observable<CityModel[]> {
    return this._http.get('/assets/data/city.list.json').map((response => response.json()))
    .do(data => {console.log('Test json call:'); })
    .catch(this.handleError);
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
