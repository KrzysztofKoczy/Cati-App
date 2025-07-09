import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { signal } from "@angular/core";
import { AppComponent } from "./app.component";
import { NavigationService } from "./services/navigation.service";
import { AuthenticationService } from "./services/authentication.service";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const navSpy = jasmine.createSpyObj(
      "NavigationService",
      ["switchTab", "hideNavigation"],
      {
        showNavigation: signal(false),
        activeTab: signal("facts"),
        factsCount: signal(0),
      }
    );
    const authSpy = jasmine.createSpyObj("AuthenticationService", ["logout"]);
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      imports: [AppComponent, NavigationComponent, CommonModule, RouterOutlet],
      providers: [
        { provide: NavigationService, useValue: navSpy },
        { provide: AuthenticationService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    navigationServiceSpy = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not show navigation by default", () => {
    fixture.detectChanges();

    const navigationElement = fixture.nativeElement.querySelector("app-navigation");

    expect(navigationElement).toBeNull();
  });

  it("should call navigationService.switchTab on tab change", () => {
    component.onTabChange("favorites");

    expect(navigationServiceSpy.switchTab).toHaveBeenCalledWith("favorites");
  });
});
