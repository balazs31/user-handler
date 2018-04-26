import { AbstractControl, Validators, FormControl } from "@angular/forms";
import { UserService } from "../services/user.service";

export class ValidateEmailNotTaken {
  static createValidator(userService: UserService, currentEmail: string) {
    return (control: AbstractControl) => {
      return userService.searchEmail(control.value).map(results => {
        if (results.length != 0) {
          return results[0].Email == currentEmail ? null : { emailTaken: true };
        } else {
          return null;
        }
      });
    };
  }
}
