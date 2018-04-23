import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

declare var swal: any;

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private user: User;
  private userId: number;
  private role: string;
  private action = <any>{};
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.action = {
      value: 'editUser',
      options: {
        edit: 'editUser',
        add: 'addUser'
      },
      titles: {
        edit: "Edit user",
        add: "Add user"
      },
      currentTitle: 'Edit user'
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      

      this.userId = +params['id']; 
      this.role = params['role'];
      if (this.role == 'edit') {
        this.action.value = this.action.options.edit;
        if(params['id']) {
          if(!Number.isNaN(this.userId)) {
            this.findUserById(this.userId);
          }
        }
      } else if(this.role == 'add') {
        this.action.value = this.action.options.add;
        this.user = new User(NaN, "", "", "", "", "", "", "")
      }
      this.setCurrentTitle(this.action.value);
    });
  }


  private findUserById(userId): void {
    this.userService.findUserById(userId).subscribe((user) => {
      this.user = this.userService.createUserObject(user);
      console.log(this.user);
    });
  }
  
  private setCurrentTitle(title): void {
    this.action.currentTitle = title == this.action.options.edit ? this.action.titles.edit : this.action.titles.add;
  }


  public updateOrCreate(): void {
    this.userService.updateUser(this.user).subscribe((response) => {
      if(response.status == 200) {
        swal(
          'Updated!',
          'User has been updated.',
          'success'
      );
      }
    }); 
  }
}
