import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  // List of products
  public products: Array<Product> = []
  public keyword: string= '';
  totalPages: number= 0;
  pageSize: number= 3;
  currentPage: number= 1;

  // An observable that emits an array of products.
  // products$!: Observable<Array<Product>>;

  constructor(private http:HttpClient, private productServce: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    this.productServce.get(this.keyword, this.currentPage, this.pageSize).subscribe({
      next: response => {
        this.products = response.body as Product[];
        let totalProducts:number = parseInt(response.headers.get('x-total-count') || '0', 10);
        this.totalPages = Math.floor(totalProducts / this.pageSize);
        if(totalProducts % this.pageSize != 0) {
          this.totalPages++;
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
          this.products = this.products.filter(product => product.id !== productId);
        },
        error: error => {
          console.error(error);
        }
      })
    }
  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.searchProducts();
  }

  handleEditProduct(product: Product) {
  this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
