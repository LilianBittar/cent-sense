import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { PlansComponent } from './pages/plans/plans.component';
import { GeneratePlanComponent } from './pages/plans/generate-plan/generate-plan.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { StatsComponent } from './pages/stats/stats.component';

import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ViewPlanComponent } from './pages/plans/view-plan/view-plan.component';
import { ChartComponent } from './components/chart/chart.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
     PlansComponent,
     RecipesComponent,
     PreferencesComponent,
     StatsComponent,
     GeneratePlanComponent,
     ViewPlanComponent,
     MyProfileComponent,
     ChartComponent
    ],
     schemas: [NO_ERRORS_SCHEMA]
})
export class HomePageModule {}
