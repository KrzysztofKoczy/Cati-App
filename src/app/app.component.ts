import { Component, inject, } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { CommonModule } from "@angular/common"
import { NavigationComponent } from "./components/navigation/navigation.component"
import { NavigationService } from "./services/navigation.service"
import { AuthenticationService } from "./services/authentication.service"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavigationComponent],
  template: `
    <div class="app-container">
      @if (navigationService.showNavigation()) {
        <app-navigation [activeTab]="navigationService.activeTab()"
                        [factsCount]="navigationService.factsCount()"
                        (tabChange)="onTabChange($event)"
                        (logout)="onLogout()"/>
      }

      <main class="main-content" [class.with-navigation]="navigationService.showNavigation()">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
    .app-container {
      min-height: 100vh;
      background: var(--primary-bg);
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .main-content.with-navigation {
      /* Add any specific styling when navigation is present */
    }

    /* Global content container styles moved from cat-facts component */
    .main-content.with-navigation {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
      width: 100%;
    }

    @media (max-width: 768px) {
      .main-content.with-navigation {
        padding: 32px 20px;
      }
    }

    @media (max-width: 480px) {
      .main-content.with-navigation {
        padding: 24px 16px;
      }
    }

    /* Login page should take full screen */
    .main-content:not(.with-navigation) {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
  ],
})
export class AppComponent {
  navigationService = inject(NavigationService);
  private authService = inject(AuthenticationService);

  onTabChange(tab: any): void {
    this.navigationService.switchTab(tab);
  }

  onLogout(): void {
    this.authService.logout();
    this.navigationService.hideNavigation();
  }
}
