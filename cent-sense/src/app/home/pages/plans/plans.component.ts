import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {

  plan_list: any[] = [];

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state: any) => {
      if(state.plans?.plans.length > 0){
        this.plan_list = state.plans.plans;
      }
    });
  }
}
