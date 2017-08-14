export class WeatherModel{
   
    constructor(
        public Id: number,
        
        public cityName: string,

        public temperature: string,
        public main:string,
        public icon:string,
        public sunrise:string ,
        public sunset:string ,
        public temp_min:string ,
        public temp_max:string 
    ){}
}