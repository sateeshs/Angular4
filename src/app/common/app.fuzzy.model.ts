import {CityModel} from './app.city.model';
export interface  FuzzyModel{
    string: string;
    score: number;
    index: number;
    original: CityModel;
}
