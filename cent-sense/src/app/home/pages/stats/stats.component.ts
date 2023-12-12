import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  selected_date: any = new Date();
  recipe_list: any = [];
  display_recipe_list: any = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.subscribe((state: any) => {
      if (state.plans?.plans) {
        let plan_recipes = state.plans?.plans.map((plan: any) => plan.recipes);
        for (let i = 0; i < plan_recipes.length; i++) {
          this.recipe_list = this.recipe_list.concat(plan_recipes[i]);
        }
        this.getThisMonthRecipes();
      }
    });
  }

  addMonth() {
    this.selected_date = new Date(this.selected_date.getFullYear(), this.selected_date.getMonth() + 1, 1);
    this.getThisMonthRecipes();
  }

  subtractMonth() {
    this.selected_date = new Date(this.selected_date.getFullYear(), this.selected_date.getMonth() - 1, 1);
    this.getThisMonthRecipes();
  }


  getThisMonthRecipes() {
    this.display_recipe_list = [];
    let selectedYear = this.selected_date.getFullYear();
    let selectedMonth = this.selected_date.getMonth();

    for (let i = 0; i < this.recipe_list.length; i++) {
      let recipeDate = new Date(this.recipe_list[i].recipe_date);
      let recipeYear = recipeDate.getFullYear();
      let recipeMonth = recipeDate.getMonth();

      if (recipeYear === selectedYear && recipeMonth === selectedMonth) {
        this.display_recipe_list.push(this.recipe_list[i]);
      }
    }
  }

  getChartData() {
    if (this.display_recipe_list.length === 0) {
      return [];
    }

    const chartData = [];
    const recipeMap = new Map();

    for (const recipe of this.display_recipe_list) {
      const recipeDate = recipe.recipe_date;
      const totalPrice = recipe.total_price;

      if (recipeMap.has(recipeDate)) {
        const existingTotalPrice = recipeMap.get(recipeDate);
        recipeMap.set(recipeDate, existingTotalPrice + totalPrice);
      } else {
        recipeMap.set(recipeDate, totalPrice);
      }
    }

    for (const [recipeDate, totalPrice] of recipeMap) {
      chartData.push({ key: recipeDate, value: totalPrice });
    }

    return chartData;
  }

  getTotalMonthPrice() {
    if (this.display_recipe_list.length === 0) {
      return 0;
    }

    let total = 0;
    for (const recipe of this.display_recipe_list) {
      total += recipe.total_price;
    }
    return total;
  }

  getUniqueProducts(): any[] {
    if (this.display_recipe_list.length === 0) {
      return [];
    }

    let product_map: any[] = [];

    for (const recipe of this.display_recipe_list) {
      const recipe_ingredients = recipe.recipeIngredients;
      for (let recipe_ingredient of recipe_ingredients) {
        if(product_map[recipe_ingredient.ingredient.name]){
          product_map[recipe_ingredient.ingredient.name].total += parseFloat(recipe_ingredient.ingredient_product.price);
          product_map[recipe_ingredient.ingredient.name].count += 1;
        }else{
          product_map[recipe_ingredient.ingredient.name] = {
            total: parseFloat(recipe_ingredient.ingredient_product.price),
            count: 1
          }
        }
      }
    }
    return product_map;
  }
}
