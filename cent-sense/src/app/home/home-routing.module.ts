import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PlansComponent } from './pages/plans/plans.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { StatsComponent } from './pages/stats/stats.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'plans',
        component: PlansComponent
      },
      {
        path: 'recipes',
        component: RecipesComponent
      },
      {
        path: 'preferences',
        component: PreferencesComponent
      },
      {
        path: 'stats',
        component: StatsComponent                                   
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
