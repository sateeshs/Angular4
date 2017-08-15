import {  PipeTransform, Pipe } from '@angular/core';

@Pipe({

            name: 'temparetureConverter'

        })
        export class KelvinToFahrenheitPipe implements PipeTransform {

                transform(value: number, scale: string, label: boolean): number {

                    if (isNaN(value)) { throw new Error('Input is not a number'); }
                        let convertedValue;

                              if (scale === 'F') {
                                convertedValue = Math.round(value * 9.0 / 5.0 - 459.67);
                              } else if (scale === 'C') {
                                convertedValue = Math.round((value - 32) * 5.0 / 9.0);
                              } else {
                                throw new Error('Not a valid scale');
                              }

                              return label ? convertedValue += '\u00B0' : convertedValue;


                }
            }
