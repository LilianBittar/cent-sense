import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent  implements OnInit {

  recipe_list: any = [];

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.subscribe((state:any)=> {
      if(state.plans?.plans){
        let plan_recipes = state.plans?.plans.map((plan:any)=> plan.recipes);
        for(let i=0; i<plan_recipes.length; i++){
          this.recipe_list = this.recipe_list.concat(plan_recipes[i]);
        }
        console.log(this.recipe_list);
      }
    });
  }

}
