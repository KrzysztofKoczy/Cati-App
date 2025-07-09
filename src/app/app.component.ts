import { Component, inject, } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { CommonModule } from "@angular/common"
import { NavigationComponent } from "./components/navigation/navigation.component"
import { NavigationService } from "./services/navigation.service"
import { AuthenticationService } from "./services/authentication.service"
import { TabType } from "./model/type"

@Component({
  selector: "app-root",
  imports: [RouterOutlet, CommonModule, NavigationComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  navigationService = inject(NavigationService);
  private authService = inject(AuthenticationService);

  onTabChange(tab: TabType): void {
    this.navigationService.switchTab(tab);
  }

  onLogout(): void {
    this.authService.logout();
    this.navigationService.hideNavigation();
  }
}
