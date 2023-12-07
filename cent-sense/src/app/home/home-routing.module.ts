import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PlansComponent } from './pages/plans/plans.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { StatsComponent } from './pages/stats/stats.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { GeneratePlanComponent } from './pages/plans/generate-plan/generate-plan.component';
import { ViewPlanComponent } from './pages/plans/view-plan/view-plan.component';

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
        path: 'plans/generate',
        component: GeneratePlanComponent
      },
      {
        path: 'plans/view/:id',
        component: ViewPlanComponent
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
      },
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
