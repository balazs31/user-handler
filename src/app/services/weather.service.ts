import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {

  private proxy: string = 'https://cors-anywhere.herokuapp.com/'
  private host: string = 'https://api.darksky.net';
  private query: string = '/forecast/7aad7f29601c00cbffb7910dd71d7327/'
  private units: string = '?units=si'
  constructor(
    private http: Http,
  ) { }

  public getWeather(location: string): Observable<any> {
    return this.http.get(this.proxy + this.host + this.query + location + this.units)
    .map(response => response.json())
    .catch(error => {
        console.log(error);
        return Observable.throw(error.json());
    });
}
}
