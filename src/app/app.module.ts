import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {ProductService} from "./shared/product.service";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from './pipe/filter.pipe';
import {HttpModule} from "@angular/http";
import {WebSocketService} from "./shared/web-socket.service";
import {
  HashLocationStrategy,
  LocationStrategy
} from "@angular/common";

const routerConfig:Routes=[
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'product/:productId',
    component:ProductDetailComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarsComponent,
    FooterComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routerConfig),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProductService,WebSocketService,
    {
    provide:LocationStrategy,useClass:HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
