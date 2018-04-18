import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor (
    private http: Http
  ) {}

  getUsers() {
    return this.http.get(`http://localhost:3000/api/People`)
    .map((res:Response) => res.json());
  }

}