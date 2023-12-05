import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiAdapterService } from 'src/app/services/api-adapter.service';

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
    ) { }

  ngOnInit() {
    this.plan_form = this.formBuilder.group({
      start_date: [new Date().toISOString(), [Validators.required]],
      number_of_days: [1, [Validators.required]],
      budget: [0, [Validators.required] ],
    });
    if(localStorage.getItem('meal_list')){
      this.meal_list = JSON.parse(localStorage.getItem('meal_list') || '{}');
    }else{
      this.renderMealList();
    }

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
    this.plan_form.patchValue({
      number_of_days: this.plan_form.value.number_of_days + 1,
    });
    this.meal_list.push({
      date: new Date(this.plan_form.value.start_date).setDate(new Date(this.plan_form.value.start_date).getDate() + 1),
      breakfast: true,
      lunch: true,
      dinner: true,
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

  getTotalCost(suggestion_list: any){
    console.log(suggestion_list);
    let total_cost = 0;
    for(let suggestion of Object.keys(suggestion_list)){
      total_cost += this.getSelectedSuggestion(suggestion_list[suggestion]).price;
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
          localStorage.setItem('meal_list', JSON.stringify(this.meal_list));
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
