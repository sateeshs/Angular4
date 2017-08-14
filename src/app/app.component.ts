import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {WeatherFeed} from './app.weatherService';
import {WeatherModel} from './Iweather.model';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import { BehaviorSubject} from 'rxjs/Rx';

import {CitySearchComponent} from './common/app.citysearch.component';
import {CityDataService} from './common/app.citydataservices';
import {CityModel} from './common/app.city.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './common/app.nav.component.scss'],
  providers: [WeatherFeed, CityDataService],

})
export class AppComponent implements OnInit {
  @Input() inputCityName: string= null;
  @ViewChild('first') alert: CitySearchComponent;
  //@ViewChildren(CitySearchComponent) alerts: QueryList<CitySearchComponent>;

  title = 'app';
inputCity;
  private weatherDashBoard: FormGroup;
  private weatherData: WeatherModel;
  //private _data = new BehaviorSubject<WeatherModel[]>([]);

  private _data = new BehaviorSubject<WeatherModel>(null);


  constructor(private _weatherService: WeatherFeed, private _fb: FormBuilder) {

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
  temperature: [''],
  icon: [''],
  description: [''],
  sunrise: [''],
  sunset: [''],
  temp_min: [''],
  temp_max: ['']
});

}


ngAfterViewInit(): void {
  this.populateValues();
  //this.inputCity = this.alerts.toArray()[0];
  this.inputCity = this.alert;
  //console.log(this.weatherData);

      /*this._data.takeWhile(()=> !this.weatherData)
            .subscribe(x=>{
        console.log('Behavior subject');
        this.populateValues();
        console.log(this.weatherData);
      });*/

  console.log(this._data.getValue());
  /*if(this.weatherData!==null)
  this.weatherDashBoard.patchValue({
      cityName:this.weatherData.cityName,
      temarature:this.weatherData.temperature,
      icon:this.weatherData.icon,
      description:this.weatherData.main
    });
  */
}
populateValues():void{
  this.inputCityName =this.inputCityName===null?"Northville":this.inputCityName;
  console.log(this.inputCityName);
  
  this._weatherService.getFeed(this.inputCityName)
                             .subscribe(data=> {
                               //console.log(data);
                               console.log('subscriber call in populatevalue.');
                               console.log(data);
                               this.weatherData= new WeatherModel(data.id,data.name,data.main.temp,data.weather[0].main,data.weather[0].icon,data.sys.sunrise,data.sys.sunset,data.main.temp_min,data.main.tem_max);
                               //this._data.next(new WeatherModel(data.id,data.name,data.main.temp,data.weather[0].main,data.weather[0].icon,data.sys.sunrise,data.sys.sunset,data.main.temp_min,data.main.tem_max));
                               console.log(this.weatherData);
                               this.weatherDashBoard.patchValue({
                                cityName:this.weatherData.cityName,
                                temarature:this.weatherData.temperature,
                                icon:this.weatherData.icon,
                                description:this.weatherData.main,
                                sunrise:this.weatherData.sunrise,
                                sunset:this.weatherData.sunset,
                                temp_min:this.weatherData.temp_min,
                                temp_max:this.weatherData.temp_max
                              });
                            
                               console.log('subscriber call in populatevalue End.');
                              }
  );

  
  }
  loggedIn(){}
  logout(){}
}
//https://openweathermap.org/current