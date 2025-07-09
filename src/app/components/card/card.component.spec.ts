import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CardComponent } from "./card.component";
import { FavoritesService } from "../../services/favorites.service";
import { IconComponent } from "../icon/icon.component";

describe("CardComponent", () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    favoritesServiceSpy = jasmine.createSpyObj("FavoritesService", [
      "isFavorite",
      "toggleFavorite"
    ]);

    await TestBed.configureTestingModule({
      imports: [CardComponent, IconComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the provided fact", () => {
    const testFact = "Cats have 32 muscles in each ear.";

    fixture.componentRef.setInput('fact', testFact);
    favoritesServiceSpy.isFavorite.and.returnValue(false);
    fixture.detectChanges();

    const factText = fixture.nativeElement.querySelector(".card-text");

    expect(factText.textContent).toContain(testFact);
  });

  it("should call toggleFavorite on button click", () => {
    const testFact = "Cats purr at 26 cycles per second.";

    fixture.componentRef.setInput('fact', testFact);
    favoritesServiceSpy.isFavorite.and.returnValue(false);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(".favorite-btn");

    button.click();

    expect(favoritesServiceSpy.toggleFavorite).toHaveBeenCalledWith(testFact);
  });

  it("should add 'favorited' class when fact is favorited", () => {
    fixture.componentRef.setInput('fact', "Test fact");
    favoritesServiceSpy.isFavorite.and.returnValue(true);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector(".card");

    expect(card.classList.contains("favorited")).toBeTrue();
  });
});
