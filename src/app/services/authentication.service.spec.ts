import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationService", () => {
  let service: AuthenticationService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthenticationService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should initialize with logged out state", () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it("should login and set state, localStorage, and navigate", () => {
    const result = service.login("test@example.com", "password123");

    expect(result).toBeTrue();
    expect(service.isLoggedIn()).toBeTrue();
    expect(localStorage.getItem("isLoggedIn")).toBe("true");
    expect(localStorage.getItem("userEmail")).toBe("test@example.com");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/dashboard"]);
  });

  it("should logout and clear state, localStorage, and navigate", () => {
    service.login("test@example.com", "password123");
    service.logout();
    
    expect(service.isLoggedIn()).toBeFalse();
    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(localStorage.getItem("userEmail")).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/login"]);
  });

  it("should return demo credentials", () => {
    const credentials = service.getDemoCredentials();

    expect(credentials).toEqual({
      username: "demo@user.com",
      password: "demoUser1234!",
    });
  });

  it("should return isLogged getter as true when logged in", () => {
    service.login("test@example.com", "password123");

    expect(service.isLogged).toBeTrue();
  });

  it("should return isLogged getter as false when logged out", () => {
    service.logout();

    expect(service.isLogged).toBeFalse();
  });
});