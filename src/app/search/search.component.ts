import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl,
  FormGroup, Validators
} from "@angular/forms";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel:FormGroup;

  categories:string[];

  constructor(private prodectService:ProductService) {
    let fb=new FormBuilder();
    this.formModel=fb.group({
      title:['', Validators.minLength(1)],
      price:[null,this.positiveNumberValidator],
      category:['-1']
    })
  }

  ngOnInit() {
    this.categories=this.prodectService.getAllCategories()
  }

  onSearch(){
    if(this.formModel.valid){
      console.log(this.formModel.value)
      this.prodectService.searchEvent.emit(this.formModel.value)
    }
    // console.log($location.absUrl())
  }

  //校验价格是否正数
  positiveNumberValidator(control:FormControl):any{
    if (!control.value){
      return null;
    }
    let price = parseInt(control.value);
    if(price>0){
      return null
    }else{
      return {
        positiveNumber:true
      }
    }
  }

}
