import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// TODO add to model
interface CatFactResponse {
  data: string[]
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private httpClient = inject(HttpClient);

  getCatFacts(): Observable<CatFactResponse> {
    return this.httpClient.get<CatFactResponse>('https://meowfacts.herokuapp.com/');
  }
}
