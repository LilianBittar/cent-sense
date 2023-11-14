import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiAdapterService {


  constructor(private http: HttpClient) {

  }

  getIngredients() {
    return this.http.get(environment.apiUrl + '/ingredients');
  }
  
}
