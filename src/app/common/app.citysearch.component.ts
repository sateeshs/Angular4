import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CityModel } from './app.city.model';

import { CityDataService } from './app.citydataservices';
import { CityFilterPipe } from './app.cityfilter.pipe';
import * as fuzzy from 'fuzzy';
import { FuzzyModel } from './app.fuzzy.model';

@Component({
    selector: 'app-city-search',
    templateUrl: 'app.citysearchcomponent.html',
    styles: ['app.citysearch.component.scss'],
    providers: [CityDataService],
    //pipes: [CityFilterPipe]

})

export class CitySearchComponent implements OnInit, OnChanges {
    cityAutoComplete: FormControl = new FormControl();
    citysearchForm: FormGroup;
    cityDataList: Array<CityModel> = [];
    cityData: Array<CityModel> = [];
    public selectedCity: string;
    constructor(private _cityDataService: CityDataService, private _fb: FormBuilder) {
        _cityDataService.getData().subscribe(data => {
            this.cityDataList = data;

        });

    }
    private options1;
    private options = {
        pre: '<',
        post: '>'
        , extract: function (el) { return el.name; }
    };

    @Input() cityInput: number;
    @Output() onFinished = new EventEmitter();

    ngOnInit(): void {
        this.citysearchForm = this._fb.group({
            cityAutoComplete: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(70)]]
        });
        this.onFinished.emit(this.selectedCity);
        this.citysearchForm.controls['cityAutoComplete'].valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            /* .flatMap((text: string) => { // <-------
                 //console.log(text);
                 //ServiceCall
                 let results = null;
                 if (text.length < 3)
                     return new Observable<FuzzyModel>();
                 {
                     console.log(text);
                     results = fuzzy.filter<CityModel>(text, this.cityDataList, this.options);
                     //console.log(results);
                     this.cityData = null; this.cityData = new Array<CityModel>();
                 }
                 return results;
             }).catch(error => {

                 console.log(error);
                 return Observable.throw(error);
              })*/
            .subscribe((text: any) => {
                if (text.length > 2) {
                    const results = fuzzy.filter<CityModel>(text, this.cityDataList, this.options);
                    //console.log(results);
                    this.cityData = null; this.cityData = new Array<CityModel>();

                    //text = text as FuzzyModel;
                    results.forEach(element => {
                        element = element as FuzzyModel;

                        if (element.score > 50) {
                            //console.log(text);    
                            this.cityData.push(element.original);
                        }
                    });

                }

            }, (error) => { console.log(error); })
            ;
    }
    ngOnChanges(): void { }

    displayFn(city): string {
        //console.log(city);
        console.log('onFinished');
        this.selectedCity = city;

        return city;
    }

    onCitySelected(state, form): void {
        form.state = state;
        this.selectedCity = form.state.id;
        this.onFinished.next(this.selectedCity);
    }

}
