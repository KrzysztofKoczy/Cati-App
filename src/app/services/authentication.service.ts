import { inject, Injectable, signal } from "@angular/core"
import { Router } from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private router = inject(Router);

  isLoggedIn = signal(false);

  constructor() {
    const savedAuth = localStorage.getItem("isLoggedIn");

    if (savedAuth === "true") {
      this.isLoggedIn.set(true);
    }
  }

  get isLogged(): boolean {
    return this.isLoggedIn();
  }

  login(username: string, password: string): boolean {
      this.isLoggedIn.set(true);

      // WARNING: Storing authentication state in localStorage is NOT secure and is only for demonstration purposes!
      localStorage.setItem("isLoggedIn", "true"); // For demo only, not secure for production
      localStorage.setItem("userEmail", username.trim()); // For demo only, not secure for production

      this.router.navigate(["/facts"]);

      return true;
  }

  logout(): void {
    this.isLoggedIn.set(false);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    this.router.navigate(["/login"]);
  }

  getDemoCredentials() {
    return {
      username: "demo@user.com",
      password: "demoUser1234!",
    }
  }
}
