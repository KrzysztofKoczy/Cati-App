import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { InfiniteScrollDirective } from "../../directives/infinite-scroll.directive"
import { CardComponent } from "../card/card.component"
import { CatFactsService } from "../../services/cat-facts.service"
import { IconComponent } from "../icon/icon.component"
import { Subject, takeUntil } from "rxjs"
import { NavigationService } from "../../services/navigation.service"

@Component({
  selector: "app--facts-dashboard",
  imports: [CommonModule, CardComponent, InfiniteScrollDirective, IconComponent],
  templateUrl: "./facts-dashboard.component.html",
  styleUrls: ["./facts-dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactsDashboardComponent implements OnInit {
  catFactsService = inject(CatFactsService);
  private navigationService = inject(NavigationService);

  catFacts = signal<string[]>([]);
  
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadInitialFacts();
  }

  ngOnDestroy(): void {
    this.catFactsService.clearUsedFacts();
    this.destroy$.next();
  }

  loadMoreFacts(): void {
    this.catFactsService.loadCatFacts()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(newFacts => {
        if (newFacts.length > 0) {
          this.catFacts.update(currentFacts => [...currentFacts, ...newFacts]);
          this.navigationService.setFactsCount(this.catFacts().length);
        }
      });
  }

  private loadInitialFacts(): void {
    this.catFactsService.loadCatFacts()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(initialFacts => {
        if (initialFacts.length > 0) {
          this.catFacts.set(initialFacts);
          this.navigationService.setFactsCount(this.catFacts().length);
        }
      });
    }
}
