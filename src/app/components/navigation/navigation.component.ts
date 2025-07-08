import { Component, inject, output, input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FavoritesService } from "../../services/favorities.service"

export type TabType = "facts" | "favorites"

@Component({
  selector: "app-navigation",
  imports: [CommonModule],
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  favoritesService = inject(FavoritesService);

  activeTab = input<TabType>("facts");
  factsCount = input<number>(0);

  tabChange = output<TabType>();
  logout = output<void>();

  switchTab(tab: TabType): void {
    if (tab !== this.activeTab()) {
      this.tabChange.emit(tab);
    }
  }

  onLogout(): void {
    this.logout.emit();
  }
}
