import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    allCakes = [];
  newCake = {};
  newReview = {rating: 5};
  selectedCake : any;
  average_rating : any;
  booleanError: Boolean;
//   selectedId : any;

  constructor(private _httpService: HttpService){
      this.readAllCakes();
  }
  readAllCakes(){
    let observable = this._httpService.readAllCakes();
    observable.subscribe(data=>{
        console.log(data['cakes']);
        this.allCakes = data['cakes'];

    })
  }
  createCake(){
      if('baker' in this.newCake){
          if(this.newCake['baker'].length<3){
              console.log('inside error')
              this.booleanError = true;
          } else {
              let observable = this._httpService.createCake(this.newCake);
              observable.subscribe(data=>{
                  console.log(data);
                  this.readAllCakes();
              })
            console.log('inside success')
          }
      } else {
        this.booleanError = true;
      }
  }
  createReview(cake){
    console.log(this.newReview);
    // cake.reviews.push(this.newReview)
    let observable = this._httpService.createReview(this.newReview);
    observable.subscribe(data=>{
        console.log(data);
        cake['reviews'].push(data);
        console.log('pushed review to cake', cake)
        this.updateCake(cake)
    })
  }
  updateCake(cake){
    let observable = this._httpService.updateCake(cake);
    observable.subscribe(data=>{
        console.log(data);
        this.readAllCakes();
    })
  }
  selectCake(cake){
    this.selectedCake = cake;
    this.average_rating = 0;
    for(var i = 0; i<cake['reviews'].length;i++){
        console.log(cake['reviews'][i].rating)
        this.average_rating += cake['reviews'][i].rating
    }
    this.average_rating = this.average_rating/cake['reviews'].length
    console.log('avg rating::', this.average_rating);
  }

}
