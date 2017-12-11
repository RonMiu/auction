import {
  Component, OnInit, Input,
  Output, EventEmitter, OnChanges
} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnChanges {

  @Input()
  private rating:number;

  private stars:boolean[];

  @Input()
  private readOnly:boolean=true;

  @Output()
  private ratingChange:EventEmitter<number>=new EventEmitter();

  constructor() { }

  ngOnInit() {
    // this.stars=[];
    // for(let i=1;i<=5;i++){
    //   this.stars.push(i>this.rating);
    // }
  }

  ngOnChanges(){
    this.stars=[];
    for(let i=1;i<=5;i++){
      this.stars.push(i>this.rating);
    }
  }

  clickStar(index:number) {
    if (!this.readOnly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating)
    }
  }

}
