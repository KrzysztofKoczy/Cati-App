import { Routes } from "@angular/router"
import { AuthGuard } from "./guards/authentication.guard"
import { LoginComponent } from "./components/login-page/login-page.component"
import { CatFactsComponent } from "./components/dashboard/dashboard.component"

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },

  { path: "login", component: LoginComponent },

  { path: "cat-facts", component: CatFactsComponent, canActivate: [AuthGuard] },

  { path: "**", redirectTo: "/login" },
]
