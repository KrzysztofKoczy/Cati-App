import { TestBed } from "@angular/core/testing";
import { NavigationService } from "./navigation.service";
import { Router, NavigationEnd } from "@angular/router";
import { Subject } from "rxjs";

describe("NavigationService", () => {
  let service: NavigationService;
  let routerSpy: jasmine.SpyObj<Router>;
  let routerEvents$: Subject<any>;

  beforeEach(() => {
    routerEvents$ = new Subject();
    routerSpy = jasmine.createSpyObj("Router", ["navigate"], {
      events: routerEvents$.asObservable(),
    });

    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(NavigationService);
  });

  afterEach(() => {
    routerEvents$.complete();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should have default values", () => {
    expect(service.activeTab()).toBe("facts");
    expect(service.showNavigation()).toBeFalse();
    expect(service.factsCount()).toBe(0);
  });

  it("should set facts count", () => {
    service.setFactsCount(5);

    expect(service.factsCount()).toBe(5);
  });

  it("should switch to facts tab and navigate", () => {
    service.switchTab("facts");

    expect(service.activeTab()).toBe("facts");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/facts"]);
  });

  it("should switch to favorites tab and navigate", () => {
    service.switchTab("favorites");

    expect(service.activeTab()).toBe("favorites");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/favorites"]);
  });

  it("should hide navigation on login endpoint", () => {
    const event = new NavigationEnd(1, "/login", "/login");

    routerEvents$.next(event);
    
    expect(service.showNavigation()).toBeFalse();
  });
});