import {Component, Input, OnInit, Output, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {CityModel} from './app.city.model';

import {CityDataService} from './app.citydataservices';
import {CityFilterPipe} from './app.cityfilter.pipe';

@Component({
    selector: 'app-city-search',
    templateUrl: 'app.citysearchcomponent.html',
    providers: [CityDataService],
    //pipes: [CityFilterPipe]

})

export class CitySearchComponent implements OnInit, OnChanges {
    cityAutoComplete: FormControl;
    citysearchForm: FormGroup;
    cityDataList: Array<CityModel>= [];
    cityData: Array<CityModel>= [];
    constructor(private _cityDataService: CityDataService, private _fb: FormBuilder) {
         _cityDataService.getData().subscribe(data => {this.cityDataList = data;
                                                         console.log(this.cityDataList.length); });
        this.cityAutoComplete = new FormControl();
        this.cityAutoComplete.valueChanges.startWith(null).map(name => console.log(name));
    }
    
    
    
    @Input() cityInput: number ;
    @Output() citySelection: string ;

    ngOnInit(): void {
this.citysearchForm = this._fb.group({
    cityAutoComplete: ['']
});
    }
    ngOnChanges(): void {}

    displayFn(city): string {
        console.log(city);
return 'sateesg';//country ? country.Country : country;
       }

       selectCity(state, form){
         console.log(state);
         console.log(form);
        form.state = state;
      }
    
}
