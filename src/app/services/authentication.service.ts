import { inject, Injectable, signal } from "@angular/core"
import { Router } from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private router = inject(Router);

  private isLoggedInSignal = signal(false);

  constructor() {
    const savedAuth = localStorage.getItem("isLoggedIn");

    if (savedAuth === "true") {
      this.isLoggedInSignal.set(true);
    }
  }

  get isLoggedIn() {
    return this.isLoggedInSignal.asReadonly();
  }

  login(username: string, password: string): boolean {
    if (username.trim() && password.trim() && password.length >= 3 && password.length <= 256) {
      this.isLoggedInSignal.set(true);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", username.trim());

      this.router.navigate(["/cat-facts"]);

      return true;
    }

    return false;
  }

  logout(): void {
    this.isLoggedInSignal.set(false);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    this.router.navigate(["/login"]);
  }

  getDemoCredentials() {
    return {
      username: "demo@catfacts.com",
      password: "demo123",
    }
  }

  getCurrentUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  }
}
