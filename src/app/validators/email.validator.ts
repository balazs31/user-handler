import { AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';

export class ValidateEmailNotTaken {
    static createValidator(userService: UserService) {
        return (control: AbstractControl) => {
            console.log('Validating: ', control.value)
            return userService.searchEmail(control.value)
            .map((results) => {
                console.log('Result: ', results.length == 0 ? null : { emailTaken: true})
                return results.length == 0 ? null : { emailTaken: true};
            })
        };
    }
  }