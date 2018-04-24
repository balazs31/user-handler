import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class LocationService {

  private host: string = 'http://ipinfo.io';
  constructor(
    private http: Http,
  ) { }

  public getCurrentIpLocation(): Observable<any> {
    return this.http.get(this.host)
    .map(response => response.json())
    .catch(error => {
        console.log(error);
        return Observable.throw(error.json());
    });
}
}
