import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  // An observable that emits an array of products.
  // products$!: Observable<Array<Product>>;

  constructor(private http:HttpClient, private productServce: ProductService, private router: Router, public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    this.productServce.get(this.appState.productState.keyword, this.appState.productState.currentPage, this.appState.productState.pageSize).subscribe({
      next: response => {
        this.appState.productState.products = response.body as Product[];
        let totalProducts:number = parseInt(response.headers.get('x-total-count') || '0', 10);
        this.appState.productState.totalProducts = totalProducts;
        this.appState.productState.totalPages = Math.floor(totalProducts / this.appState.productState.pageSize);
        if(totalProducts % this.appState.productState.pageSize != 0) {
          this.appState.productState.totalPages++;
        }
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
          this.appState.productState.products = this.appState.productState.products.filter((product:any) => product.id !== productId);
          this.appState.productState.totalProducts = this.appState.productState.products.length;
        },
        error: error => {
          console.error(error);
        }
      })
    }
  }

  handleGoToPage(page: number) {
    this.appState.productState.currentPage = page;
    this.searchProducts();
  }

  handleEditProduct(product: Product) {
  this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
