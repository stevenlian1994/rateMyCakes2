import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    constructor(private _httpClient: HttpClient) { }  
    readCake(id){
        return this._httpClient.get(`/readCake/${id}`);
    }
    createCake(cake){
        console.log('inside service')
        return this._httpClient.post('/createCake', cake);
    }
    // createReview(review){
    //     console.log('inside service')
    //     return this._httpClient.post('/createReview', review);
    // }
    createReview(review){
        console.log('inside service')
        return this._httpClient.post('/createReview', review);
    }
    readAllCakes(){
        return this._httpClient.get('/readAllCakes');
    }
    updateCake(cake){
        return this._httpClient.put('/updateCake', cake)
    }
    deleteReview(review){
        return this._httpClient.delete('/deleteReview', review)
    }
}
