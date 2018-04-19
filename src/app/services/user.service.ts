import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor (
    private http: Http,
    private httpClient: HttpClient
  ) {}

  // public getUsers():
  //   return this.http.get(`http://localhost:3000/api/People`)
  //   .map((res:Response) => res.json());
  // }

  public getUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`http://localhost:3000/api/People`)
  }

  public deleteUser(userId: Number): Observable<Response> {
    return this.http.delete('http://localhost:3000/api/People/' + userId)
  }

  public findUserById(userId: Number): Observable<User> { 
    return this.http.get('http://localhost:3000/api/People/findOne', {params: {filer: {id: userId}}})
      .map((res:Response) => res.json());
  }


}