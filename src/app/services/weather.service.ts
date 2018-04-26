import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { AppSettings } from '../constants/app-settings'
import "rxjs/Rx";

@Injectable()
export class WeatherService {
  private proxy: string = AppSettings.CORS_PROXY_ENDPOINT;
  private host: string = AppSettings.WEATHER_API.HOST;
  private query: string = AppSettings.WEATHER_API.QUERY;
  private units: string = AppSettings.WEATHER_API.PARAMETERS.UNITS;
  
  constructor(private http: Http) {}

  public getWeather(location: string): Observable<any> {
    return this.http
      .get(this.proxy + this.host + this.query + location + this.units)
      .map(response => response.json())
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json());
      });
  }
}
