import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  // List of products
  products: Array<Product> = []

  // An observable that emits an array of products.
  // products$!: Observable<Array<Product>>;

  constructor(private http:HttpClient, private productServce: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productServce.getAll().subscribe({
      next: data => {
        this.products = data;
      },
      error: error => {
        console.error(error);
      }
    })
   // this.products$ = this.productServce.getAll();
  }

  handleCheckProduct(product: Product) {
    this.productServce.check(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
      },
    });
  }

  handleDeleteProduct(productId: number) {
    if(confirm("Etes-vous sûr de vouloir suprimmer ce produit ?")) {
      this.productServce.delete(productId).subscribe({
        next: data => {
          // this.getProducts();
          this.products = this.products.filter(product => product.id !== productId);
        },
        error: error => {
          console.error(error);
        }
      })
    }
  }
}
