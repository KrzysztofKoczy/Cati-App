import { Component, inject, OnInit, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NavigationComponent, TabType } from "../navigation/navigation.component"
import { InfiniteScrollDirective } from "../../directives/infinite-scroll.directive"
import { CatFactCardComponent } from "../card/card.component"
import { AuthenticationService } from "../../services/authentication.service"
import { CatFactsService } from "../../services/cat-facts.service"

@Component({
  selector: "app-cat-facts",
  imports: [CommonModule, NavigationComponent, CatFactCardComponent, InfiniteScrollDirective],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class CatFactsComponent implements OnInit {
  catFactsService = inject(CatFactsService);
  authenticationService = inject(AuthenticationService);

  catFacts = signal<string[]>([]);
  activeTab = signal<TabType>("facts");

  ngOnInit() {
    this.catFactsService.resetFacts();
    this.loadInitialFacts();
  }

  async loadMoreFacts() {
    if (!this.catFactsService.isLoading()) {
      const newFacts = await this.catFactsService.loadMoreFacts();

      if (newFacts.length > 0) {
        this.catFacts.update((current) => [...current, ...newFacts]);
      }
    }
  }

  switchTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  logout(): void {
    this.authenticationService.logout();
  }

  trackByFact(index: number, fact: string): string {
    return fact;
  }
  
  private async loadInitialFacts() {
    const initialFacts = await this.catFactsService.loadMoreFacts();

    if (initialFacts.length > 0) {
      this.catFacts.set(initialFacts);
    }
  }
}
