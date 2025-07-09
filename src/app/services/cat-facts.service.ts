import { inject, Injectable, signal } from "@angular/core"
import { RestService } from "./rest.service"
import { catchError, distinct, filter, finalize, map, Observable, of, repeat, take, tap, toArray } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CatFactsService {
  private restService = inject(RestService);

  private usedFacts = new Set<string>();
  private isLoading = signal(false);

  private FACTS_PER_LOAD = this.calculateFactsPerLoad;

  get loading() {
    return this.isLoading();
  }

  get calculateFactsPerLoad(): number {
    const { innerWidth: width, innerHeight: height } = window;
    const navigationHeight = width > 768 ? 80 : 130;
    const cartsPerColumn = Math.ceil((height - navigationHeight) / 170);
  
    if (width < 768) {
      return 1 * cartsPerColumn;
    }
    
    if (width > 987) {
      return 3 * cartsPerColumn;
    }
    
    return 2 * cartsPerColumn; 
  }

  loadCatFacts(): Observable<string[] > {
    if (this.isLoading()) {
      return of([]);
    }

    this.isLoading.set(true);

    return this.restService.getCatFacts().pipe(
      repeat(),
      map(response => response.data[0]),
      filter((fact): fact is string => fact != null && !this.usedFacts.has(fact)),
      distinct(),
      take(this.FACTS_PER_LOAD),
      toArray(),
      tap((newFacts: string[]) => {
        newFacts.forEach(fact => this.usedFacts.add(fact));
      }),
      catchError((error): Observable<string[]> => {
        console.error("Error during loading cats facts:", error);
        return of([]);
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    );
  }

  clearUsedFacts() {
    this.usedFacts.clear();
  }
}
