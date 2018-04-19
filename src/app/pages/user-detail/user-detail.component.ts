import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private userId: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.userId = +params['id']; 
       if(!Number.isNaN(this.userId)) {
         this.findUserById(this.userId);
         console.log('UserId: ', +params['id']);
       }
    });
  }


  private findUserById(userId): void {
    this.userService.findUserById(userId).subscribe((user) => {
      console.log('User found: ', user);
    });
  }
}
