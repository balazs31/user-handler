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
import { Constants } from "../../constants/constants";
import { Address } from "../../models/address";
declare var swal: any;

@Component({
  selector: "user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  private VALIDATOR_MESSAGES;
  private user: User;
  private userForm: FormGroup;
  private role: string;
  private action = <any>{};
  private currentLocation: Address;
  private weather: any;
  private userId: number;

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.VALIDATOR_MESSAGES = Constants.VALIDATOR_MESSAGES;
    this.action = Constants.COMPONENTS.USER_DETAIL.ACTIONS;
    
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
          }
        } else {
          this.switchToAddUser();
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
      this.locationService.getGeocodeOfLocation(this.user.location).subscribe(location => {
        this.currentLocation = this.locationService.parseGMapsLocation(location);
        this.getWeather(this.currentLocation);
      });
      console.log(this.user);
    }, error =>{
      swal(
        Constants.ALERTS.TITLE.ERROR,
        Constants.ALERTS.MESSAGE.ERROR_MESSAGE,
        Constants.ALERTS.TYPE.ERROR
      );
    });
  }

  private getWeather(location: Address) {
    this.weatherService.getWeather(location.loc).subscribe(res => {
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
          Validators.pattern(Constants.PATTERNS.USERNAME)
        ]),
        ValidateUsernameNotTaken.createValidator(
          this.userService,
          this.user.username
        )
      ],
      firstName: [
        this.user.firstName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(Constants.PATTERNS.FIRST_NAME)
        ])
      ],
      lastName: [
        this.user.lastName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(Constants.PATTERNS.LAST_NAME)
        ])
      ],
      currentPassword: [
        this.user.password,
        Validators.compose([
          this.action.value == this.action.options.edit
            ? Validators.required
            : null,
          ValidatePasswords.checkCurrentPassword(this.user.password)
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
              Validators.pattern(Constants.PATTERNS.PASSWORD)
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
          Validators.pattern(Constants.PATTERNS.PHONE)
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
      this.currentLocation = this.locationService.parseIpLocation(location)
      this.getWeather(this.currentLocation);
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
    if (this.checkIfPasswordsMatch(userFormData.currentPassword)) {
      this.userService
        .updateUser(this.parseUserFormData(userFormData))
        .subscribe(
          response => {
            if (response.status == 200) {
              swal(
                this.action.value == this.action.options.add
                  ? Constants.ALERTS.TITLE.CREATED
                  : Constants.ALERTS.TITLE.UPDATED,
                Constants.ALERTS.MESSAGE.USER_CREATED,
                Constants.ALERTS.TYPE.SUCCESS
              );
            }
          },
          error => {
            swal(
              Constants.ALERTS.TITLE.ERROR,
              Constants.ALERTS.MESSAGE.ERROR_MESSAGE,
              Constants.ALERTS.TYPE.ERROR
            );
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
      userFormData.newPasswords.newPassword1 != "" &&
      userFormData.newPasswords.newPassword1 == userFormData.newPasswords.newPassword2
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
