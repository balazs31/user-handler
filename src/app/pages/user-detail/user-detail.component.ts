import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { LocationService } from "../../services/location.service";
import { WeatherService } from "../../services/weather.service";
import { User } from "../../models/user";
import { ValidateUsernameNotTaken } from "../../validators/username.validator";
import { ValidatePasswords } from "../../validators/password.validator";
import { ValidateEmailNotTaken } from "../../validators/email.validator";
import { Subject } from "rxjs/Subject";

declare var swal: any;

@Component({
  selector: "user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  private user: User;
  private userId: number;
  private role: string;
  private action = <any>{};
  private searchTerm$ = new Subject<string>();
  private userSearchResult: Object = [];
  private userForm: FormGroup;
  private currentLocation: any = {};
  private weather: any;
  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.action = {
      value: "editUser",
      options: {
        edit: "editUser",
        add: "addUser"
      },
      titles: {
        edit: "Edit user",
        add: "Add user"
      },
      currentTitle: "Edit user"
    };

    this.locationService.getCurrentIpLocation().subscribe(location => {
      this.currentLocation.city = location.city;
      this.currentLocation.loc = location.loc;
      this.getWeather();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params["id"];
      this.role = params["role"];
      if (this.role == "edit") {
        this.action.value = this.action.options.edit;
        if (params["id"]) {
          if (!Number.isNaN(this.userId)) {
            this.findUserById(this.userId);
          } else {
            this.switchToAddUser();
            // this.createUserForm();
          }
        } else {
          this.switchToAddUser();
          // this.createUserForm();
        }
      } else if (this.role == "add") {
        this.action.value = this.action.options.add;
        this.switchToAddUser();
      }
      this.setCurrentTitle(this.action.value);
    });
  }

  private findUserById(userId): void {
    this.userService.findUserById(userId).subscribe(user => {
      this.user = this.userService.createUserObject(user);
      this.createUserForm();
      console.log(this.user);
    });
  }

  private getWeather() {
    this.weatherService.getWeather(this.currentLocation.loc).subscribe(res => {
      console.log(res);
      this.weather = res;
    });
  }
  private createUserForm(): void {
    this.userForm = this.fb.group({
      username: [
        this.user.username,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern("^([a-zA-Z0-9_]){4,20}")
        ]),
        ValidateUsernameNotTaken.createValidator(
          this.userService,
          this.user.username
        )
      ],
      firstName: [
        this.user.firstName,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      lastName: [
        this.user.lastName,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      currentPassword: [
        this.user.password,
        Validators.compose([
          this.action.value == this.action.options.edit
            ? Validators.required
            : null,
          Validators.minLength(8)
        ])
      ],
      newPasswords: this.fb.group(
        {
          newPassword1: [
            "",
            Validators.compose([
              this.action.value == this.action.options.add
                ? Validators.required
                : null,
              Validators.pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+])[A-Za-z\d$@$!%*?&+]{8,}/
              )
            ])
          ],
          newPassword2: [
            "",
            this.action.value == this.action.options.add
              ? Validators.required
              : null
          ]
        },
        {
          validator: [
            ValidatePasswords.matchPasswords,
            ValidatePasswords.matchWithCurrentPassword
          ]
        }
      ),
      location: this.user.location,
      email: [
        this.user.email,
        Validators.compose([Validators.required, Validators.email]),
        ValidateEmailNotTaken.createValidator(this.userService, this.user.email)
      ],
      phone: [
        this.user.phone,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^\+[0-9]{8,12}|^[0-9]{7,12}/)
        ])
      ]
    });
  }

  private setCurrentTitle(title): void {
    this.action.currentTitle =
      title == this.action.options.edit
        ? this.action.titles.edit
        : this.action.titles.add;
  }

  private switchToAddUser() {
    this.locationService.getCurrentIpLocation().subscribe(location => {
      this.currentLocation.city = location.city;
      this.currentLocation.loc = location.loc;
      this.user = new User(
        NaN,
        "",
        "",
        "",
        "",
        this.currentLocation.city,
        "",
        ""
      );
      this.createUserForm();
    });
  }

  public updateOrCreate(userFormData): void {
    console.log("trying to update");
    if (this.checkIfPasswordsMatch(userFormData.currentPassword)) {
      this.userService
        .updateUser(this.parseUserFormData(userFormData))
        .subscribe(
          response => {
            if (response.status == 200) {
              swal("Created!", "User has been created.", "success");
            }
          },
          error => {
            swal("Whoops!", "Something went wrong. Please try later!", "error");
          }
        );
    }
  }

  public checkIfPasswordsMatch(confirmPass: string): boolean {
    if (confirmPass == this.user.password) {
      return true;
    }

    return false;
  }

  public parseUserFormData(userFormData): User {
    let password;
    console.log(userFormData);
    if (
      this.user.password != userFormData.newPasswords.newPassword1 &&
      userFormData.newPasswords.newPassword1 ==
        userFormData.newPasswords.newPassword2
    ) {
      password = userFormData.newPasswords.newPassword1;
    } else {
      password = this.user.password;
    }
    return new User(
      this.user.id,
      userFormData.username,
      userFormData.firstName,
      userFormData.lastName,
      password,
      userFormData.location,
      userFormData.email,
      userFormData.phone
    );
  }
}
