import { Component, OnInit } from '@angular/core';
import {ProductService, Product} from "../shared/product.service";
import {Observable} from "rxjs";
import "rxjs/Rx";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products:Observable<Product[]>;

  private keyword:string;

  private model:any = {
    userName: 'aa'
  };

  private imgUrl="http://placehold.it/320x150";

  constructor(private productService:ProductService) {
  }

  ngOnInit() {
    this.products=this.productService.getProducts();
    this.productService.searchEvent.subscribe(
      (params) => {
        console.log("params",params)
        this.products = this.productService.search(params)}
    )
  }
}
