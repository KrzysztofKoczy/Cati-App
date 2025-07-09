import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FactsDashboardComponent } from "./facts-dashboard.component";
import { CatFactsService } from "../../services/cat-facts.service";
import { NavigationService } from "../../services/navigation.service";
import { AuthenticationService } from "../../services/authentication.service";
import { of } from "rxjs";

describe("FactsDashboardComponent", () => {
  let component: FactsDashboardComponent;
  let fixture: ComponentFixture<FactsDashboardComponent>;
  let catFactsServiceSpy: jasmine.SpyObj<CatFactsService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    catFactsServiceSpy = jasmine.createSpyObj("CatFactsService", ["loadCatFacts"]);
    navigationServiceSpy = jasmine.createSpyObj("NavigationService", ["setFactsCount"]);
    authenticationServiceSpy = jasmine.createSpyObj("AuthenticationService", ["logout"]);

    await TestBed.configureTestingModule({
      imports: [FactsDashboardComponent],
      providers: [
        { provide: CatFactsService, useValue: catFactsServiceSpy },
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FactsDashboardComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with empty facts array", () => {
    expect(component.catFacts()).toEqual([]);
  });

  it("should load initial facts on ngOnInit and update facts and navigation count", () => {
    const mockFacts = ["Fact 1", "Fact 2"];

    catFactsServiceSpy.loadCatFacts.and.returnValue(of(mockFacts));

    component.ngOnInit();

    expect(catFactsServiceSpy.loadCatFacts).toHaveBeenCalled();

    setTimeout(() => {
      expect(component.catFacts()).toEqual(mockFacts);
      expect(navigationServiceSpy.setFactsCount).toHaveBeenCalledWith(mockFacts.length);
    }, 0);
  });

  it("should append more facts on loadMoreFacts and update navigation count", () => {
    const initialFacts = ["Fact 1"];
    const newFacts = ["Fact 2", "Fact 3"];

    component.catFacts.set(initialFacts);
    catFactsServiceSpy.loadCatFacts.and.returnValue(of(newFacts));

    component.loadMoreFacts();

    setTimeout(() => {
      expect(component.catFacts()).toEqual([...initialFacts, ...newFacts]);
      expect(navigationServiceSpy.setFactsCount).toHaveBeenCalledWith(3);
    }, 0);
  });

  it("should clean up subscriptions on ngOnDestroy", () => {
    spyOn(component['destroy$'], 'next');

    component.ngOnDestroy();
    
    expect(component['destroy$'].next).toHaveBeenCalled();
  });
});