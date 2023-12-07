import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiAdapterService {

  generateHeader() {
    let headers_object = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return {
      headers: headers_object
    };
  }

  constructor(private http: HttpClient) {

  }
  

  getIngredients() {
    return this.http.get(environment.apiUrl + '/ingredients');
  }

  getUserPreferences() {
    return this.http.get(environment.apiUrl + '/user-preferences', this.generateHeader());
  }

  addUserPreference(category: string, ingredient_name: any) {
    return this.http.post(environment.apiUrl + '/user-preferences', {
      preference_category: category,
      name: ingredient_name,
    }, this.generateHeader());      
  }

  removeUserPreference(category: string, ingredient_name: any) {
    return this.http.post(environment.apiUrl + '/user-preferences/delete', {
      preference_category: category,
      name: ingredient_name,
    },this.generateHeader());      
  }

  updateUserInfo(zip_code: number, radius: number) {
    return this.http.post(environment.apiUrl + '/user', {
      zip_code: zip_code,
      radius: radius
    }, this.generateHeader());
  }

  sendPlanRequest(plan: any) {
    return this.http.post(environment.apiUrl + '/plans/generate', plan, this.generateHeader());
  }
  
  savePlan(data: any) {
    return this.http.post(environment.apiUrl + '/plans/save', {
      start_date: data.start_date,
      number_of_days: data.number_of_days,
      budget: data.budget,
      meal_list: data.meal_list
    }, this.generateHeader());
  }

  getPlans() {
    return this.http.get(environment.apiUrl + '/plans', this.generateHeader());
  }

}
