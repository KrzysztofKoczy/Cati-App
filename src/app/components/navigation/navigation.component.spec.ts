import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavigationComponent } from "./navigation.component";
import { FavoritesService } from "../../services/favorites.service";

describe("NavigationComponent", () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    favoritesServiceSpy = jasmine.createSpyObj("FavoritesService", [], {
      favoritesCount: 3,
    });

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit tabChange when switching to a different tab", () => {
    spyOn(component.tabChange, "emit");

    fixture.componentRef.setInput("activeTab", "facts");

    component.switchTab("favorites");

    expect(component.tabChange.emit).toHaveBeenCalledWith("favorites");
  });

  it("should emit logout event when onLogout is called", () => {
    spyOn(component.logout, "emit");
    
    component.onLogout();
    
    expect(component.logout.emit).toHaveBeenCalled();
  });

  it("should have default activeTab as 'facts'", () => {
    expect(component.activeTab()).toBe("facts");
  });

  it("should have default factsCount as 0", () => {
    expect(component.factsCount()).toBe(0);
  });
});
