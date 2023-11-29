import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent  implements OnInit {

  user : any = { };
  constructor(private store: Store) {
    console.log();
    this.user = JSON.parse(localStorage.getItem('user') || '{}')

   }

  ngOnInit() {}

  updateUserInfo() {
    this.store.dispatch(AuthActions.updateUserInfo({zip_code: this.user.zip_code, radius: this.user.radius}));
  }
}
