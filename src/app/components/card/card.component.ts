import { ChangeDetectionStrategy, Component, inject, input, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FavoritesService } from "../../services/favorities.service"
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: "app-card",
  imports: [CommonModule, IconComponent],
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  favoritesService = inject(FavoritesService);

  fact = input.required<string>();

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.fact());
  }
}
