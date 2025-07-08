import { Component, inject, input, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-cat-fact-card",
  imports: [CommonModule],
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CatFactCardComponent {
  fact = input.required<string>();
}
