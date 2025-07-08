import { Component, inject, output, input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IconComponent } from "../icon/icon.component";
import { TabType } from "../model/type";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: "app-navigation",
  imports: [CommonModule, IconComponent],
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