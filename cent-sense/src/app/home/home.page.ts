import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  income!: FormGroup;
  user: any = {};


  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

}
