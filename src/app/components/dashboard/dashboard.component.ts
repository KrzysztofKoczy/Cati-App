import { Component, inject, OnInit, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { InfiniteScrollDirective } from "../../directives/infinite-scroll.directive"
import { AuthenticationService } from "../../services/authentication.service"
import { CardComponent } from "../card/card.component"
import { CatFactsService } from "../../services/cat-facts.service"
import { IconComponent } from "../icon/icon.component"

@Component({
  selector: "app-dashboard",
  imports: [CommonModule, CardComponent, InfiniteScrollDirective, IconComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  catFactsService = inject(CatFactsService);
  authenticationService = inject(AuthenticationService);

  catFacts = signal<string[]>([]);

  ngOnInit() {
    this.loadInitialFacts();
  }

  async loadCatFacts() {
    if (!this.catFactsService.isLoading()) {
      const newFacts = await this.catFactsService.loadCatFacts();

      if (newFacts.length > 0) {
        this.catFacts.update((current) => [...current, ...newFacts]);
      }
    }
  }

  private async loadInitialFacts() {
    const initialFacts = await this.catFactsService.loadCatFacts();

    if (initialFacts.length > 0) {
      this.catFacts.set(initialFacts);
    }
  }
}
