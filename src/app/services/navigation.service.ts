import { inject, Injectable, signal } from "@angular/core"
import { Router, NavigationEnd } from "@angular/router"
import { filter } from "rxjs/operators"
import { TabType } from "../components/model/type"

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  private router = inject(Router);

  activeTab = signal<TabType>("facts");
  showNavigation = signal(false);
  factsCount = signal(0);

  constructor() {
    this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
      this.updateNavigationState(event.url)
    });
  }

  setFactsCount(count: number): void {
    this.factsCount.set(count);
  }

  switchTab(tab: TabType): void {
    this.activeTab.set(tab)
    this.router.navigate([
      tab === "facts" ? "/dashboard" : "/favorites"
    ])
  }

  hideNavigation(): void {
    this.showNavigation.set(false);
  }

  showNavigationBar(): void {
    this.showNavigation.set(true);
  }

  private updateNavigationState(url: string): void {
    const shouldShowNav = url.includes("/dashboard") || url.includes("/favorites")
    this.showNavigation.set(shouldShowNav)

    if (url.includes("/dashboard")) {
      this.activeTab.set("facts");
    } else if (url.includes("/favorites")) {
      this.activeTab.set("favorites");
    }
  }
}
