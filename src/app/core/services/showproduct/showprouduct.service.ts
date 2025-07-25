import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class ShowprouductService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any> {
    return this.http.get(environment.apiUrl + '/products');
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }
}
