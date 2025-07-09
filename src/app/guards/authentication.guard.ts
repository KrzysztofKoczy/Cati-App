import { inject, Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { AuthenticationService } from "../services/authentication.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);

  canActivate(): boolean {
    if (this.authenticationService.isLogged) {
      return true;
    } else {
      this.router.navigate(["/login"]);

      return false;
    }
  }
}
