import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ApiAdapterService } from 'src/app/services/api-adapter.service';
import { EventRelayService } from 'src/app/services/event-relay.service';
import { PlansLoadAction } from 'src/app/store/plans/plans.actions';

@Component({
  selector: 'app-generate-plan',
  templateUrl: './generate-plan.component.html',
  styleUrls: ['./generate-plan.component.scss'],
})
export class GeneratePlanComponent  implements OnInit {


  plan_form!: FormGroup; // Add the '!' operator to indicate that the property will be initialized later
  today: string = new Date().toISOString();
  meal_list: any[] = [];
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private apiAdapter: ApiAdapterService,
    private navController: NavController,
    private eventRelay: EventRelayService,
    private store: Store
    ) { }

  ngOnInit() {
    this.plan_form = this.formBuilder.group({
      start_date: [new Date().toISOString(), [Validators.required]],
      number_of_days: [1, [Validators.required]],
      budget: [0, [Validators.required] ],
    });
    if(localStorage.getItem('meal_list')){
      this.meal_list = JSON.parse(localStorage.getItem('meal_list') || '{}');
      this.plan_form.patchValue({
        number_of_days: this.meal_list.length,
        budget: localStorage.getItem('budget') ,
      });
    }else{
      this.renderMealList();
    }

  }



  deselectAll(suggestions:any[]){
    const suggestion_list = suggestions;
    for(let suggestion of suggestion_list){
      suggestion.selected = false;
    }
  }


  upgradeSuggestion(suggestions: any[]) {
    const suggestion_list = suggestions;
    let select_next = false;
    for (let i = 0; i < suggestion_list.length; i++) {
      const suggestion = suggestion_list[i];
      if (suggestion.selected === true && i < suggestion_list.length - 1) {
        suggestion.selected = false;
        select_next = true;
      } else if (select_next) {
        suggestion.selected = true;
        select_next = false;
        return;
      }
    }
  }

  downgradeSuggestion(suggestions: any[]) {
    const suggestion_list = suggestions;
    let select_next = false;
    for (let i = suggestion_list.length - 1; i >= 0; i--) {
      const suggestion = suggestion_list[i];
      if (suggestion.selected === true && i > 0) {
        suggestion.selected = false;
        select_next = true;
      } else if (select_next) {
        suggestion.selected = true;
        select_next = false;
        return;
      }
    }
  }


  promotePlan(){
    for(let meal of this.meal_list){
      const recipes = Object.values(meal.recipes);
      for (let recipe of Object.values(recipes)) {
        const suggestions = Object.values((recipe as any).suggestions) as any[];
        for (let suggestion_list of suggestions) {
          this.upgradeSuggestion(suggestion_list);
        }
      }
    }
  }

  demotePlan(){
    for(let meal of this.meal_list){
      const recipes = Object.values(meal.recipes);
      for (let recipe of Object.values(recipes)) {
        const suggestions = Object.values((recipe as any).suggestions) as any[];
        for (let suggestion_list of suggestions) {
          this.downgradeSuggestion(suggestion_list);
        }
      }
    }
  }


  getAllRecipes(){
    let recipes = [];
    for(let meal of this.meal_list){
      for(let recipe of Object.values(meal.recipes)){
        recipes.push(recipe);
      }
    }
    return recipes;
  }

  renderMealList() {
    this.meal_list = [];
    for (let i = 0; i < this.plan_form.value.number_of_days; i++) {
      this.meal_list.push({
        date: new Date(this.plan_form.value.start_date).setDate(new Date(this.plan_form.value.start_date).getDate() + i),
        breakfast: true,
        lunch: true,
        dinner: true,
      });
    }
  }

  incrementDays() {
    if (this.plan_form.value.number_of_days >= 5) {
      return;
    }
    
    this.meal_list.push({
      date: new Date(this.plan_form.value.start_date).setDate(new Date(this.plan_form.value.start_date).getDate() + this.plan_form.value.number_of_days),
      breakfast: true,
      lunch: true,
      dinner: true,
    });
    this.plan_form.patchValue({
      number_of_days: this.plan_form.value.number_of_days + 1,
    });
  }
 
  decrementDays() {
    if (this.plan_form.value.number_of_days <= 1) {
      return;
    }
    this.plan_form.patchValue({
      number_of_days: this.plan_form.value.number_of_days - 1,
    });
    this.meal_list.pop();
  }
  
  getSelectedSuggestion(ingredient_suggestion_list: any[]){
    let selected_suggestion = ingredient_suggestion_list.filter((suggestion) => suggestion.selected);
    if(selected_suggestion.length > 0){
      return selected_suggestion[0];
    }
    return null;
  }

  getTotalMealCost(suggestion_list: any){
    let total_cost = 0;
    for(let suggestion of Object.keys(suggestion_list)){
      total_cost += this.getSelectedSuggestion(suggestion_list[suggestion]).price;
    }
    return total_cost;
  }

  getTotalPlanCost(){
    let total_cost = 0;
    for(let meal of this.meal_list){
      if(!meal.recipes){
        return 0;
      }
      const recipes = Object.values(meal.recipes);
      for(let recipe of Object.values(recipes)){
        total_cost += this.getTotalMealCost((recipe as any).suggestions);
      }
    }
    return total_cost;
  }

  sendPlanRequest() {
    let plan = {
      start_date: this.plan_form.value.start_date,
      number_of_days: this.plan_form.value.number_of_days,
      budget: this.plan_form.value.budget,
      meals: this.meal_list.map((meal:any) => {
        return {
          date: meal.date,
          breakfast: meal.breakfast,
          lunch: meal.lunch,
          dinner: meal.dinner,
    }})};

    this.loading = true;
    this.apiAdapter.sendPlanRequest(plan).subscribe(
      {
        next: (data:any) => {
          this.loading = false;
          this.meal_list = data.plan;
        },
        error: error => {
          this.loading = false;
          console.error('There was an error!', error);
        }
      }
    );
  }
  
  confirmPlan(){
    this.loading = true;
    this.apiAdapter.savePlan({
      start_date: this.plan_form.value.start_date,
      number_of_days: this.plan_form.value.number_of_days,
      budget: this.plan_form.value.budget,
      meal_list: this.meal_list
    }).subscribe(
      {
        next: (data:any) => {
          this.loading = false;
          localStorage.removeItem('meal_list');
          localStorage.removeItem('budget');
          this.eventRelay.emit('plan_creation_success', true);
          this.store.dispatch(PlansLoadAction());
          this.navController.back();
        },
        error: error => {
          this.loading = false;
          console.error('There was an error!', error);
        }
      }
    );
  }

  goBack(){
    this.navController.back();
  }

}
