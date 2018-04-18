import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../services/user';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  users: User[] = [];

  constructor(private userService: UserService) { }

  getUsers() : void {
    this.userService.getUsers().subscribe(((users) => {
      for(let user of users) {
        this.users.push(new User().fromJSON(user));
        console.log(new User().fromJSON(user));
      }
    }));
  }

  ngOnInit() {
    this.getUsers();
  }

}
