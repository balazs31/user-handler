import { AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';

export class ValidateUsernameNotTaken {
    static createValidator(userService: UserService) {
        return (control: AbstractControl) => {
            return userService.searchUsername(control.value)
            .map((results) => {
                return results.length == 0 ? null : { usernameTaken: true};
            })
        };
    }
  }