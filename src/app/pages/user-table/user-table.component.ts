import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Constants } from "../../constants/constants";

declare var swal: any;

@Component({
  selector: "user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.css"]
})
export class UserTableComponent {
  users: User[] = [];
  filteredUsers: User[];
  columns: Array<string> = Constants.USER_TABLE.COLUMNS;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        for (let user of users) {
          this.users.push(this.userService.createUserObject(user));
        }
        this.filteredUsers = this.users;
      },
      error => {
        swal(
          Constants.ALERTS.TITLE.CREATED,
          Constants.ALERTS.MESSAGE.USER_DELETED,
          Constants.ALERTS.TYPE.SUCCESS
        );
      }
    );
  }

  onDelete(user: User): void {
    swal({
      title: Constants.ALERTS.TITLE.CONFIRM_CHOICE,
      text: Constants.ALERTS.MESSAGE.CONFIRM_CHOICE,
      type: Constants.ALERTS.TYPE.WARNING,
      showCancelButton: true,
      confirmButtonColor: Constants.ALERTS.BUTTON_COLOR.CONFIRM,
      cancelButtonColor: Constants.ALERTS.BUTTON_COLOR.CANCEL,
      confirmButtonText: Constants.ALERTS.BUTTON_TEXT.CONFIRM_DELETE_USER
    }).then(result => {
      if (result.value) {
        this.userService.deleteUser(user.id).subscribe(
          response => {
            if (response.status == 200) {
              swal(
                Constants.ALERTS.TITLE.CREATED,
                Constants.ALERTS.MESSAGE.USER_DELETED,
                Constants.ALERTS.TYPE.SUCCESS
              );

              let index = this.filteredUsers.indexOf(user);
              this.filteredUsers.splice(index, 1);
            }
          },
          err => {
            swal(
              Constants.ALERTS.TITLE.ERROR,
              Constants.ALERTS.MESSAGE.ERROR_MESSAGE,
              Constants.ALERTS.TYPE.ERROR
            );
          }
        );
      }
    });
  }

  onSearch(query: string): void {
    this.filteredUsers = [];
    for (let user of this.users) {
      if (user.toString().indexOf(query) >= 0) {
        this.filteredUsers.push(user);
      }
    }
  }
}
