import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocationService } from '../../services/location.service';
import { User } from '../../models/user';
import { ValidateUsernameNotTaken } from '../../validators/username.validator';
import { ValidateEmailNotTaken } from '../../validators/email.validator';
import { Subject } from 'rxjs/Subject';

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
  private searchTerm$ = new Subject<string>();
  private userSearchResult: Object = [];
  private userForm : FormGroup;
  private currentLocation: string;
  constructor(
    private locationService: LocationService, 
    private userService: UserService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder) {
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

    this.userService.searchUserByUsername(this.searchTerm$)
      .subscribe(results => {
        this.userSearchResult = results;
    })

    this.locationService.getCurrentIpLocation()
      .subscribe(location => {
        this.currentLocation = location.city;
      });
      
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
          } else {
            this.switchToAddUser();
          }
        } else {
          this.switchToAddUser();
        }
      } else if(this.role == 'add') {
        this.action.value = this.action.options.add;
        this.switchToAddUser();
      }
      this.setCurrentTitle(this.action.value);
    });
  }


  private findUserById(userId): void {
    this.userService.findUserById(userId).subscribe((user) => {
      this.user = this.userService.createUserObject(user);
      this.createUserForm();
      console.log(this.user);
    });
  }

  private createUserForm(): void {
    this.userForm = this.fb.group({
      'username': [this.user.username, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^([a-zA-Z0-9_]){4,20}')]), ValidateUsernameNotTaken.createValidator(this.userService)],
      'firstName': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'lastName': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'password': [this.user.password, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+])[A-Za-z\d$@$!%*?&+]{8,}/)])],
      'location': this.user.location,
      'email': [ this.user.email, Validators.compose([Validators.required, Validators.email]), ValidateEmailNotTaken.createValidator(this.userService)],
      'phone': [this.user.phone, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^\+[0-9]{8,12}|^[0-9]{7,12}/)])], 
    })
    }
  
  private setCurrentTitle(title): void {
    this.action.currentTitle = title == this.action.options.edit ? this.action.titles.edit : this.action.titles.add;
  }

  private switchToAddUser() {
    this.user = new User(NaN, "", "", "", "", this.currentLocation, "", "")
    console.log('Location: ', this.currentLocation)
    this.createUserForm();
  }

  public updateOrCreate(): void {
    this.userService.updateUser(this.user).subscribe((response) => {
      if(response.status == 200) {
        swal(
          'Updated!',
          'User has been updated.',
          'success'
      );
      } else {
        swal(
          'Whoops!',
          'Something went wrong. Please try later!',
          'error'
      );
      }
    }); 
  }
}
