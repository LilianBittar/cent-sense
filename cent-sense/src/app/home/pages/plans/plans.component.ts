import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {

  show_add_plan: boolean = false;
  plan_form!: FormGroup; // Add the '!' operator to indicate that the property will be initialized later
  today: string = new Date().toISOString();
  meal_list: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.plan_form = this.formBuilder.group({
      start_date: [new Date().toISOString(), [Validators.required]],
      number_of_days: [1, [Validators.required]],
      budget: [0, [Validators.required] ],
    });
    this.renderMealList();
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
    this.renderMealList();
  }
 
  decrementDays() {
    if (this.plan_form.value.number_of_days <= 1) {
      return;
    }
    this.plan_form.patchValue({
      number_of_days: this.plan_form.value.number_of_days - 1,
    });
    this.renderMealList();
  }

}
