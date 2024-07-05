import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public get(keyword: string="",page: number=1, size: number=4) {
    return this.http.get(`http://localhost:8080/products?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe: 'response'});
  }

  public check(product: Product): Observable<Product> {
    const body = {checked: !product.checked}
    return this.http.patch<Product>(`http://localhost:8080/products/${product.id}`, body)
  }

  public delete(productId: number) {
    return this.http.delete(`http://localhost:8080/products/${productId}`)
  }

  public save(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8080/products', product);
  }

  public search(keyword: string, page: number=1, size: number=3): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8080/products?name_like=${keyword}&_page=${page}&_limit=${size}`)
  }

  public getById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/products/${id}`);
  }

  public update(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8080/products/${product.id}`, product);
  }
}
