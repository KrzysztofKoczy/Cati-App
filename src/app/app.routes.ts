import { Routes } from "@angular/router"
import { AuthGuard } from "./guards/authentication.guard"
import { LoginPageComponent } from "./components/login-page/login-page.component"
import { FactsDashboardComponent } from "./components/facts-dashboard/facts-dashboard.component"
import { FavoritesComponent } from "./components/favorites/favorites.component"

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },

  { path: "login", component: LoginPageComponent },

  { path: "facts", component: FactsDashboardComponent, canActivate: [AuthGuard] },

  { path: "favorites", component: FavoritesComponent, canActivate: [AuthGuard] },

  { path: "**", redirectTo: "/login" },
]
