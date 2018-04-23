import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private host: string = 'http://localhost'
  private port: Number = 3000;

  constructor (
    private http: Http,
    private httpClient: HttpClient
  ) {}


  public getUsers(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.host + ':' + this.port + '/api/People');
  }

  public deleteUser(userId: Number): Observable<Response> {
    return this.http.delete(this.host + ':' + this.port + '/api/People/' + userId)
  }

  public findUserById(userId: Number): Observable<User> { 
    return this.httpClient.get<User>(this.host + ':' + this.port + '/api/People/' + userId)
  }

  public updateUser(user: User): Observable<Response> {
    let body = this.convertToDatabaseObject(user);
    console.log('Body: ', body)
    return this.http.patch(this.host + ':' + this.port + '/api/People', body)
  }
  
  public createUserObject(user: any): User {
    return new User(
      user.id, 
      user.Username, 
      user.Firstname,
      user.Lastname, 
      user.Password, 
      user.Location, 
      user.Email, 
      user.Phone, 
    )  
  }

  private convertToDatabaseObject(user: User): {} {
    return {
      Username: user.username,
      Firstname: user.firstName,
      Lastname: user.lastName,
      Password: user.password,
      Location: user.location,
      Email: user.email,
      Phone: user.phone,
      id: user.id
    }
  }

}