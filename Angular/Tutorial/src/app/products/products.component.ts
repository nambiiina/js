import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Array<any> = []

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Array<any>>('http://localhost:8080/products').subscribe({
      next: data => {
        this.products = data;
        debugger;
      },
      error: error => {
        console.error(error);
      }
    })
  }

  handleCheckProduct(product: any) {
    this.http.patch(
      `http://localhost:8080/products/${product.id}`,
      {checked:!product.checked}
    ).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
      },
    });
  }
}
