import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';

@Injectable()
export class UserService {
  private host: string = 'http://localhost'
  private port: Number = 3000;
  private filterQuerys = {
    username: '?filter[where][Username]=',
    email: '?filter[where][Email]='
  }

  constructor (
    private http: Http,
    private httpClient: HttpClient,
    
  ) {}


  public getUsers(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.host + ':' + this.port + '/api/People');
  }

  public searchUserByUsername(user: Observable<string>) {
    return user.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(user => this.searchUsername(user));
  }

  public searchUsername(username: string) {
    return this.http.get(this.host + ':' + this.port + '/api/People' + this.filterQuerys.username + username)
      .map(res => res.json());
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

  public searchEmail(email: string) {
    return this.http.get(this.host + ':' + this.port + '/api/People' + this.filterQuerys.email + email)
      .map(res => res.json());
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