import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiAdapterService } from '../services/api-adapter.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../store/auth/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  income!: FormGroup;
  user: any;


  constructor(
    private api: ApiAdapterService,
    private store: Store
  ) {
    
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // this.store.dispatch(loginSuccess({payload: {user: this.user, token: localStorage.getItem('token')}}));
    if(localStorage.getItem('ingredients') == null) {
      this.api.getIngredients().subscribe(
        {
          next: data => {
            localStorage.setItem('ingredients', JSON.stringify(data));
          },
          error: error => {
            console.error('There was an error!', error);
          }
        }
      );
    }
  }

}
