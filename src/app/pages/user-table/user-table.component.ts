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

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers() : void {
    this.userService.getUsers().subscribe(((users) => {
      for(let user of users) {
        this.users.push(new User().fromJSON(user));
        console.log(new User().fromJSON(user));
      }
    }));
  }

  onDelete(userId: Number): void {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        // this.mountainService.deleteMountain(this.mountainId)
        //   .subscribe((response: Response) => {
        //     swal(
        //         'Deleted!',
        //         'Your file has been deleted.',
        //         'success'
        //     );
        //     this.router.navigate(['../'], {relativeTo: this.route});
        //   });
        if(result.value) {
          console.log('hello')
          this.userService.deleteUser(userId)
          .subscribe((response) => {
            if(response.status == 200) {
              swal(
                  'Deleted!',
                  'User has been deleted.',
                  'success'
              );
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
}
