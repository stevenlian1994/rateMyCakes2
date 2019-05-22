import { Component, OnInit, Input} from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css','../app.component.css']
})
export class CakeComponent implements OnInit {
    @Input() cakeToShow: any;
    @Input() avgRating: any;
    // average_rating : any;

    constructor(private _httpService : HttpService) {
        // this.calculateAv`erage();
        // console.log('inside cake comp:', this.avgRating)
     }

  ngOnInit() {
  }
  deleteReview(cake, review){
    //   console.log(cake.reviews)
    // first splice the review from array then save the cake
      cake.reviews.splice(cake.reviews.indexOf(review), 1)
    //   console.log(cake.reviews)
    //   var arr = [5, 15, 110, 210, 550];
    //   var index = arr.indexOf(210);
   
    //   if (index > -1) {
    //      arr.splice(index, 1);
    //   }

      let observable = this._httpService.updateCake(cake);
      observable.subscribe(data=>{
          console.log(data);
          this.updateAverage(cake)
      })
  }
  updateAverage(cake){
      console.log('length:', cake['reviews'].length)
      this.avgRating = 0;
    for(var i = 0; i<cake['reviews'].length;i++){
        console.log(cake['reviews'][i].rating)
        this.avgRating += cake['reviews'][i].rating
    }
    this.avgRating = this.avgRating/cake['reviews'].length
    console.log('avg rating::', this.avgRating);
  }


}
