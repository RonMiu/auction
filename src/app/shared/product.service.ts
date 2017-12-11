import {
  EventEmitter,
  Injectable,
} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/Rx";

@Injectable()
export class ProductService {


  constructor(private http:Http) { }

  searchEvent:EventEmitter<ProductSearchParams>=new EventEmitter();

  getProducts(): Observable<Array<Product>> {
    return this.http.get("/api/products").map((res)=>res.json())
  }

  getAllCategories():string[]{
    return ["电子产品","硬件设备","图书"]
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get("/api/products/"+id).map(res=>res.json())
  }

  getCommentsForProductId(id: number): Observable<Array<Comment>> {
    return this.http.get("/api/products/"+id+"/comments").map(res=>res.json())
  }

  search(params:ProductSearchParams):Observable<Array<Product>>{
    console.log("search")
    return this.http.get("/api/products",{search:this.encodeParams(params)}).map(res=>res.json())
  }

  private encodeParams(params:ProductSearchParams){
    return Object.keys(params).filter(key=>params[key]).reduce((sum:URLSearchParams,key:string)=>{
      sum.append(key,params[key]);
      return sum;
    },new URLSearchParams())
  }

}

export class ProductSearchParams{
  constructor(public title:string,
              public price:number,
              public category:string
  ){

  }
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {

  }
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestam: string,
    public user: string,
    public rating: number,
    public content: string) {
  }
}
