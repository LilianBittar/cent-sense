import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent  implements OnInit {

  ingredients: any[] = [];
  filtered_ingredients: any[] = [];
  constructor() { }

  ngOnInit() {
    this.ingredients = JSON.parse(localStorage.getItem('ingredients') || '{}');
  }

  search(event: any) {
    this.filtered_ingredients = this.ingredients.filter((ingredient) => {
      return ingredient.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

}
