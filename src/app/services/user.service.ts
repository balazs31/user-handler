import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor (
    private http: Http,
    private httpClient: HttpClient
  ) {}

  // getUsers() {
  //   return this.http.get(`http://localhost:3000/api/People`)
  //   .map((res:Response) => res.json());
  // }

  getUsers(): Observable<Array<User>> {return this.httpClient.get<Array<User>>(`http://localhost:3000/api/People`)}


}