import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

declare var swal: any;

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  users: User[] = [];
  filteredUsers: User[];
  columns: Array<string> = ["#", "Username", "First", "Last", "Email", "Location", "Phone", "Modify"];
  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers() : void {
    this.userService.getUsers().subscribe(((users) => {
      for(let user of users) {
        this.users.push(this.userService.createUserObject(user));
      }

      this.filteredUsers = this.users;
    }));
  }

  onDelete(user: User): void {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if(result.value) {
          this.userService.deleteUser(user.id)
          .subscribe((response) => {
            if(response.status == 200) {
              swal(
                  'Deleted!',
                  'User has been deleted.',
                  'success'
              );

            
              let index = this.filteredUsers.indexOf(user);
              this.filteredUsers.splice(index, 1);
            } 
          }, (err) => {
            swal(
              'Error!',
              'Could not delete user. Please try again later!',
              'error'
          );
          });
        }   
    });
  }

  onSearch(query: string): void {
    this.filteredUsers = [];

    console.log('Users to string: ', this.users.toString )
    for(let user of this.users) {
      if(user.toString().indexOf(query) >= 0) {
        this.filteredUsers.push(user);
      }
    }
  }
}
