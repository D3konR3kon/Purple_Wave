import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import { fakeBusinesses } from './mock-data';
import { Business } from './business.inteface';



@Injectable({
  providedIn: 'root'
})
export class MainService {

  allItems: any;

  constructor() { }


  getAllBusinesses():Observable<Business[]>{
    const businesses = of(fakeBusinesses)
    this.allItems = businesses
    return businesses;
  }

  getOne(name: string):Observable<Business | any>{
      const business = fakeBusinesses.find((business) => business.name === name)
      return of(business);
  }
}
