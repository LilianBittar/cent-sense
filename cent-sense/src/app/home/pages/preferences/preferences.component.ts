import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiAdapterService } from 'src/app/services/api-adapter.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  selected_tab: string = 'breakfast';
  search_text: string = '';
  ingredients: any[] = [];
  filtered_ingredients: any[] = [];
  preferences: any = {
    breakfast: [],
    lunch: [],
    dinner: [],
    exclude: [],
  };

  subs: any[] = [];

  constructor(private apiAdapter: ApiAdapterService, private store: Store) {
    this.subs.push(
      this.store.subscribe((data: any) => {
        console.log(data);
      })
    );
  }

  ngOnInit() {
    this.ingredients = JSON.parse(localStorage.getItem('ingredients') || '{}');
    this.loadPreferences();
  }

  switchTab(tab: string) {
    this.selected_tab = tab;
    this.filtered_ingredients = [];
  }

  loadPreferences() {
    this.apiAdapter.getUserPreferences().subscribe({
      next: (response: any) => {
        console.log(response);

        this.preferences = {
          breakfast: response.filter(
            (item: any) => item.preference_category == 'breakfast'
          ),
          lunch: response.filter(
            (item: any) => item.preference_category == 'lunch'
          ),
          dinner: response.filter(
            (item: any) => item.preference_category == 'dinner'
          ),
          exclude: response.filter(
            (item: any) => item.preference_category == 'exclude'
          ),
        };
        console.log(this.preferences);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  search(event: any) {
    if (event.target.value == '') {
      this.filtered_ingredients = [];
      return;
    }
    this.filtered_ingredients = this.ingredients
      .filter((ingredient) => {
        return (
          ingredient.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) &&
          !this.preferences[this.selected_tab].includes(ingredient)
        );
      })
      .filter((ingredient) => {
        return !this.preferences.exclude.includes(ingredient);
      });
  }

  addPreference(ingredient: any) {
    if (this.preferences[this.selected_tab].includes(ingredient)) {
      return;
    }
    if (this.selected_tab == 'exclude') {
      for (let tab in this.preferences) {
        if (tab != 'exclude') {
          this.preferences[tab] = this.preferences[tab].filter((item: any) => {
            return item != ingredient;
          });
        }
      }
    }
    this.preferences[this.selected_tab].push(ingredient);

    this.apiAdapter
      .addUserPreference(this.selected_tab, ingredient.name)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    this.filtered_ingredients = [];
    this.search_text = '';
  }

  removePreference(tab: string, ingredient: any) {
    this.apiAdapter.removeUserPreference(tab, ingredient.name).subscribe({
      next: (response: any) => {
        this.preferences[tab] = this.preferences[tab].filter((item: any) => {
          return item != ingredient;
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
