import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost:8080/products');
  }

  public check(product: Product): Observable<Product> {
    const body = {checked: !product.checked}
    return this.http.patch<Product>(`http://localhost:8080/products/${product.id}`, body)
  }

  public delete(productId: number) {
    return this.http.delete(`http://localhost:8080/products/${productId}`)
  }
}
