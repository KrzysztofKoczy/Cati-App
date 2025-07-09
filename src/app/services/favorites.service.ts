import { Injectable, signal } from "@angular/core"

@Injectable({ providedIn: "root" })
export class FavoritesService {
  private favoritesArray = signal<string[]>([]);
  private readonly STORAGE_KEY = "dashboard-favorites";

  constructor() {
    this.loadFavoritesFromStorage();
  }

  get favorites(): string[] {
    return this.favoritesArray();
  }

  get favoritesCount(): number {
    return this.favoritesArray().length;
  }

  isFavorite(fact: string): boolean {
    return this.favoritesArray().includes(fact);
  }

  toggleFavorite(fact: string): void {
    this.isFavorite(fact) ? this.removeFromFavorites(fact) : this.addToFavorites(fact);
  }

  clearAllFavorites(): void {
    this.favoritesArray.set([]);
    this.saveFavoritesToStorage();
  }

  addToFavorites(fact: string): void {
    this.favoritesArray.update(current => [...current, fact]);
    this.saveFavoritesToStorage();
  }

  removeFromFavorites(fact: string): void {
    this.favoritesArray.update(current => current.filter(f => f !== fact));
    this.saveFavoritesToStorage();
  }

  private saveFavoritesToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favoritesArray()));
    } catch (error) {
      console.error("Error cannot save to storage:", error);
    }
  }

  private loadFavoritesFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);

      if (stored) {
        this.favoritesArray.set(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error cannot load from storage:", error);
    }
  }
}
