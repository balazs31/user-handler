import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import "rxjs/Rx";
import { AppSettings } from "../constants/app-settings";

@Injectable()
export class LocationService {
  private host: string = AppSettings.LOCATION_API_ENDPONT;
  constructor(private http: Http) {}

  public getCurrentIpLocation(): Observable<any> {
    return this.http
      .get(this.host)
      .map(response => response.json())
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json());
      });
  }
}
