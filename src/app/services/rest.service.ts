import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// TODO add to model
interface CatFactResponse {
  data: string[]
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private httpClient = inject(HttpClient);

  constructor() { }

  getCatFacts(): Promise<CatFactResponse | undefined> {
    return this.httpClient.get<CatFactResponse>('https://meowfacts.herokuapp.com/').toPromise();
  }
}
