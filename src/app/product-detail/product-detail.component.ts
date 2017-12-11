import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {
  Product,
  ProductService,
  Comment
} from "../shared/product.service";
import "rxjs/Rx";
import {WebSocketService} from "../shared/web-socket.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private routerInfo:ActivatedRoute,
              private productService:ProductService,
              private wsService:WebSocketService) { }

  private product:Product;
  private comments:Array<Comment>;//等价于private comment:Comment[]
  newRating:number=5;
  newComment:string="";
  isCommentHidden:boolean=true;
  isWatched:boolean=false;
  currentBid:number;

  ngOnInit() {
    let productId:number=this.routerInfo.snapshot.params["productId"];
    // console.log(productId)
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product=product;
        this.currentBid=product.price;
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments=>this.comments=comments
    );
  }
  addComment(){
    if(this.newComment){
      let comment = new Comment(0,this.product.id,new Date().toLocaleDateString().replace(/\//g,'-'),"Andy",this.newRating,this.newComment);
      this.comments.unshift(comment);
      console.log(this.comments)
      let sum=this.comments.reduce((sum,comment)=>sum+comment.rating,0);
      console.log(sum)
      let aveRating = sum/this.comments.length;
      console.log(aveRating)
      this.product.rating=aveRating;
      this.isCommentHidden=!this.isCommentHidden;
      this.newComment=null;
      this.newRating=5;

    }
  }
  // watchProductId(){
  //   this.isWatched=!this.isWatched;
  //   this.wsService.createObservableSocket("ws://localhost:8085",this.product.id)
  //     .subscribe(
  //       products=>{
  //         let product = products.find(p=>p.productId===this.product.id)
  //         this.currentBid=product.bid
  //       }
  //     )
  // }
  updateRating(event:number){
    this.newRating=event;
    console.log(event)
  }

}
