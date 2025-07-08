import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CardComponent } from "../card/card.component";
import { FavoritesService } from "../../services/favorites.service";
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: "app-favorites",
  imports: [CommonModule, CardComponent, IconComponent],
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent {
  favoritesService = inject(FavoritesService);

  clearAllFavorites(): void {
    if (confirm("Are you sure you want to remove all favorites? This action cannot be undone.")) {
      this.favoritesService.clearAllFavorites();
    }
  }
}
