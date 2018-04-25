import { AbstractControl } from "@angular/forms";
import { UserService } from "../services/user.service";

export class ValidateUsernameNotTaken {
  static createValidator(userService: UserService, currentUsername: string) {
    return (control: AbstractControl) => {
      return userService.searchUsername(control.value).map(results => {
        if (results.length != 0) {
          return results[0].Username == currentUsername
            ? null
            : { usernameTaken: true };
        } else {
          return null;
        }
      });
    };
  }
}
