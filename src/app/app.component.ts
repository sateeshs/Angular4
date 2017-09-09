import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren, Renderer } from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import { BehaviorSubject} from 'rxjs/Rx';
import {Routes} from '@angular/router';
//import {DataSource} from '@angular/cdk';

import {AppNavComponent} from './app-nav/app-nav.component';
import {WeatherFeed} from './app.weatherService';
import {WeatherModel} from './Iweather.model';
import {CitySearchComponent} from './common/app.citysearch.component';
import {CityDataService} from './common/app.citydataservices';
import {CityModel} from './common/app.city.model';
import {RootObject} from './app.weather.model';
import {ForecastRootObject} from './app.forecast.model';
import {KelvinToFahrenheitPipe} from './common/app.metricconversion.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './common/app.nav.component.scss'],
  providers: [WeatherFeed, CityDataService],


})
export class AppComponent implements OnInit {
  @Input() inputCityName: string= null;
  @ViewChild('first') alert: CitySearchComponent;
  @ViewChildren(CitySearchComponent) CitySearchComponentChanes: QueryList<CitySearchComponent>;

  title = 'app';
inputCity= null;
  private weatherDashBoard: FormGroup;
  private weatherData: WeatherModel;

  private _data = new BehaviorSubject<WeatherModel>(null);


  constructor(private _weatherService: WeatherFeed, private _fb: FormBuilder, private renderer: Renderer) {

  }

  set data(value) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
}

get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
}

  ngOnInit(): void {
    this.inputCity = this.alert;
this.weatherDashBoard = this._fb.group({
  cityName: [''],
  country: [''],
  pin: [''],
  temperature: [''],
  icon: [''],
  description: [''],
  sunrise: [''],
  sunset: [''],
  temp_min: [''],
  temp_max: [''],
  today: [new Date().toLocaleTimeString()],
  list: ['']

});

}


ngAfterViewInit(): void {
  this.populateValues();

  this.inputCity = this.alert;
  //this.CitySearchComponentChanes.changes.subscribe(item => {  });

}
populateValues(): void {
  this.inputCityName = !this.inputCityName ? '5230092' : this.inputCityName;
  console.log(this.inputCityName);

  this._weatherService.getFeed(this.inputCityName)
                      .subscribe(data => {
                               const weatherModel = data as RootObject;
                               this.weatherDashBoard.patchValue({
                                  cityName: weatherModel.name,
                                  country: weatherModel.sys.country,
                                  temperature: weatherModel.main.temp,
                                  icon: weatherModel.weather[0].icon,
                                  description: weatherModel.weather[0].description,
                                  sunrise: weatherModel.sys.sunrise,
                                  sunset: weatherModel.sys.sunset,
                                  temp_min: weatherModel.main.temp_min,
                                  temp_max: weatherModel.main.temp_max
                              });
                               console.log('subscriber call in populatevalue End.'); 
                              }
  );

  }
  ///
populateDashboardData(cityId: string): void {
  cityId = !cityId ? '5230092' : cityId;
  this._weatherService.getDashboardFeed(cityId)
                      .subscribe(data => {
                                  const weatherModel = data[0] as RootObject;
                                  const forecastModel = data[1] as ForecastRootObject;
                                  //console.log(JSON.stringify(forecast));

                                  this.weatherDashBoard.patchValue({
                                    cityName: weatherModel.name,
                                    country: weatherModel.sys.country,
                                    temperature: weatherModel.main.temp,
                                    icon: weatherModel.weather[0].icon,
                                    description: weatherModel.weather[0].description,
                                    sunrise: weatherModel.sys.sunrise,
                                    sunset: weatherModel.sys.sunset,
                                    temp_min: weatherModel.main.temp_min,
                                    temp_max: weatherModel.main.temp_max,
                                    list: forecastModel.list.slice(0, 1),
                                });

  });
}

  ///On City selection Event Handler
  WehenOnFinishedCitySearch(text: string): void {
    this.inputCityName = text; console.log('selectedCity' + text);
    this.populateDashboardData(text);
  }

  loggedIn(){}

  logout(){}

}
//https://openweathermap.org/current