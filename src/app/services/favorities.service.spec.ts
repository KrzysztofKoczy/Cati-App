import { FavoritesService } from "./favorites.service";

describe("FavoritesService", () => {
  let service: FavoritesService;

  beforeEach(() => {
    service = new FavoritesService();
    service.clearAllFavorites();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should initialize with empty favorites", () => {
    expect(service.favorites).toEqual([]);
    expect(service.favoritesCount).toBe(0);
  });

  it("should add a fact to favorites", () => {
    service.addToFavorites("Fact 1");
    expect(service.favorites).toContain("Fact 1");
    expect(service.favoritesCount).toBe(1);
  });

  it("should remove a fact from favorites", () => {
    service.addToFavorites("Fact 1");
    service.addToFavorites("Fact 2");
    service.removeFromFavorites("Fact 1");

    expect(service.favorites).not.toContain("Fact 1");
    expect(service.favorites).toContain("Fact 2");
    expect(service.favoritesCount).toBe(1);
  });

  it("should clear all favorites", () => {
    service.addToFavorites("Fact 1");
    service.addToFavorites("Fact 2");
    service.clearAllFavorites();

    expect(service.favorites).toEqual([]);
    expect(service.favoritesCount).toBe(0);
  });
});