import { AbstractControl } from "@angular/forms";
export class ValidatePasswords {
  static matchPasswords(control: AbstractControl) {
    let pass1 = control.get("newPassword1").value;
    let pass2 = control.get("newPassword2").value;
    if (pass1 != pass2) {
      console.log("false");
      control.get("newPassword2").setErrors({ matchPassword: true });
    } else {
      console.log("true");
      return null;
    }
  }

  static matchWithCurrentPassword(control: AbstractControl) {
    let pass = control.get("newPassword1").value;
    if (control.parent) {
      let currentPass = control.parent.controls["currentPassword"].value;
      return pass == currentPass
        ? control.get("newPassword1").setErrors({ matchCurrentPassword: true })
        : null;
    }
    return null;
  }
}
