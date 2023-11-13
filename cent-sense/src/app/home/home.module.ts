import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';
import { PlansComponent } from './pages/plans/plans.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, IntroductionComponent, PlansComponent, RecipesComponent, PreferencesComponent]
})
export class HomePageModule {}
