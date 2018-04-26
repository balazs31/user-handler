import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { Address } from "../models/address";
import "rxjs/Rx";
import { AppSettings } from "../constants/app-settings";
import { error } from "util";

@Injectable()
export class LocationService {
  private ipLocationHost: string = AppSettings.LOCATION_API_ENDPONT;
  private googleGeoApiHost: string = AppSettings.GOOGLE_MAPS_GEOCODE_API
    .ENDPOINT;
  private addressFilter: string = AppSettings.GOOGLE_MAPS_GEOCODE_API.FILTERS
    .ADDRESS;
  private googleGeoApiKey: string = AppSettings.GOOGLE_MAPS_GEOCODE_API.KEY;
  constructor(private http: Http) {}

  public getCurrentIpLocation(): Observable<any> {
    return this.http
      .get(this.ipLocationHost)
      .map(response => response.json())
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json());
      });
  }

  public getGeocodeOfLocation(address: string): Observable<any> {
    return this.http
      .get(
        this.googleGeoApiHost +
          this.addressFilter +
          address +
          this.googleGeoApiKey
      )
      .map(response => response.json())
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json());
      });
  }

  public parseGMapsLocation(location: any): Address {
    console.log('Location to parse: ', location)
    return new Address(
      location.results[0].geometry.location.lat,
      location.results[0].geometry.location.lng,
      location.results[0].address_components[0].long_name,
      location.results[0].address_components[2].long_name,
      location.results[0].address_components[3].short_name
    );
  }

  public parseIpLocation(location: any): Address {
    console.log('Location to parse: ', location)

    let coordinates = location.loc.split(',', 3);
    console.log('Coordinates: ', coordinates)

    return new Address(
      coordinates[0],
      coordinates[1],
      location.city,
      location.region,
      location.country
    );
  }
}
