import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss'],
})
export class ViewPlanComponent  implements OnInit {

  plan_id: number | undefined;
  plan_data: any;
  recipe_dates: any[] = [];
  selected_tab: string = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { 
    this.plan_id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.store.subscribe((state: any) => {
      if(state.plans?.plans.length > 0){
        this.plan_data = Object.values(state.plans.plans).find((plan: any) => plan.id == this.plan_id);
        this.getRecipeDates();
        this.selected_tab = this.recipe_dates[0];
        console.log(this.plan_data);
      }
    });
  }
  
  getRecipeDates(){
    this.recipe_dates = [];
    for(let i = 0; i < this.plan_data.recipes.length; i++){
      if(!this.recipe_dates.includes(this.plan_data.recipes[i].recipe_date)){
        this.recipe_dates.push(this.plan_data.recipes[i].recipe_date);
      }
    }
  }

  filterRecipesByDate(date: string){
    return this.plan_data.recipes.filter((recipe: any) => recipe.recipe_date == date) || [];
  }

}
