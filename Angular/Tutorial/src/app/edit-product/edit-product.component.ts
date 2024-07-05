import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId!: number;
  productFormGroup!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private prodcutService: ProductService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.prodcutService.getById(this.productId).subscribe({
      next: product => {
        this.productFormGroup = this.formBuilder.group({
          id: this.formBuilder.control(product.id),
          name: this.formBuilder.control(product.name, [Validators.required]),
          price: this.formBuilder.control(product.price, [Validators.min(100)]),
          checked: this.formBuilder.control(product.checked)
        })
      },
      error: error => {
        console.error(error);
      }
    })
  }

  updateProduct() {
    let product = this.productFormGroup.value;
    this.prodcutService.update(product).subscribe({
      next: updatedProdct => {
        alert(JSON.stringify(updatedProdct));
        this.router.navigateByUrl('/products')
      },
      error: error => {
        console.error(error);
      }
    });
  }

}
