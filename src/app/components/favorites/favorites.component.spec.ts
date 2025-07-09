import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { signal } from "@angular/core"
import { FavoritesComponent } from "./favorites.component"
import { FavoritesService } from "../../services/favorites.service"

describe("FavoritesComponent", () => {
  let component: FavoritesComponent
  let fixture: ComponentFixture<FavoritesComponent>
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj("FavoritesService", ["clearAllFavorites"], {
      favoritesCount: 0,
      favorites: signal([]),
    });

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [{ provide: FavoritesService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    favoritesServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
  })

  it("should create", () => {
    expect(component).toBeTruthy();
  })

  it("should call clearAllFavorites with confirmation", () => {
    spyOn(window, "confirm").and.returnValue(true);

    component.clearAllFavorites();

    expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to remove all favorites? This action cannot be undone.");

    expect(favoritesServiceSpy.clearAllFavorites).toHaveBeenCalled()
  })

  it("should not call clearAllFavorites when confirmation is cancelled", () => {
    spyOn(window, "confirm").and.returnValue(false);

    component.clearAllFavorites();

    expect(window.confirm).toHaveBeenCalled();
    expect(favoritesServiceSpy.clearAllFavorites).not.toHaveBeenCalled();
  })
})
