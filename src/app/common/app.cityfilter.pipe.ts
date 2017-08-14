import {  PipeTransform, Pipe } from '@angular/core';

import {CityModel} from './app.city.model';
@Pipe({

        name: 'cityFilter'

    })
    export class CityFilterPipe implements PipeTransform {



            transform(value: CityModel[], filterBy: string): CityModel[] {

                filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

                return filterBy ? value.filter((city: CityModel) =>

                    city.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;

            }
        }

