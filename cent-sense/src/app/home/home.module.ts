import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';
import { PlansComponent } from './pages/plans/plans.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { StatsComponent } from './pages/stats/stats.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, IntroductionComponent, PlansComponent, RecipesComponent, PreferencesComponent, StatsComponent, MyProfileComponent]
})
export class HomePageModule {}
