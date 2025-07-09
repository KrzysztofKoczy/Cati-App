import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthenticationService } from "../../services/authentication.service"
import { LoginPageComponent } from "./login-page.component"

describe("LoginPageComponent", () => {
  let component: LoginPageComponent
  let fixture: ComponentFixture<LoginPageComponent>
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj("AuthService", ["login", "getDemoCredentials"]);
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;

    fixture.detectChanges();
  })

  it("should create", () => {
    expect(component).toBeTruthy();
  })

  it("should initialize with empty form", () => {
    expect(component.loginForm.get("username")?.value).toBe("");
    expect(component.loginForm.get("password")?.value).toBe("");
    expect(component.loginForm.invalid).toBeTrue();
  })

  it("should validate required fields", () => {
    const usernameControl = component.loginForm.get("username")
    const passwordControl = component.loginForm.get("password")

    expect(usernameControl?.hasError("required")).toBeTrue();
    expect(passwordControl?.hasError("required")).toBeTrue();

    usernameControl?.setValue("test@example.com");
    passwordControl?.setValue("password123");

    expect(usernameControl?.hasError("required")).toBeFalse();
    expect(passwordControl?.hasError("required")).toBeFalse();
    expect(component.loginForm.valid).toBeTrue();
  })

  it("should validate email format", () => {
    const usernameControl = component.loginForm.get("username");

    usernameControl?.setValue("invalid-email");
    expect(usernameControl?.hasError("email")).toBeTrue();

    usernameControl?.setValue("test@example.com");
    expect(usernameControl?.hasError("email")).toBeFalse();
  })

  it("should validate password minimum length", () => {
    const passwordControl = component.loginForm.get("password");

    passwordControl?.setValue("ab");
    expect(passwordControl?.hasError("minlength")).toBeTrue();

    passwordControl?.setValue("abc");
    expect(passwordControl?.hasError("minlength")).toBeFalse();
  })

  it("should validate password maximum length", () => {
    const passwordControl = component.loginForm.get("password");
    const longPassword = "a".repeat(257);

    passwordControl?.setValue(longPassword);
    expect(passwordControl?.hasError("maxlength")).toBeTrue();

    passwordControl?.setValue("a".repeat(256));
    expect(passwordControl?.hasError("maxlength")).toBeFalse();
  })

  it("should call authService.login on form submit", () => {
    authServiceSpy.login.and.returnValue(true);

    component.loginForm.patchValue({
      username: "test@example.com",
      password: "password123",
    })

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith("test@example.com", "password123");
  })

  it("should show error on failed login", () => {
    authServiceSpy.login.and.returnValue(false);

    spyOn(window, "alert");

    component.loginForm.patchValue({
      username: "test@example.com",
      password: "wrongpassword",
    });

    component.onSubmit();
    
    expect(window.alert).toHaveBeenCalledWith("Invalid credentials. Please try again.");
  })

  it("should fill demo credentials", () => {
    const demoCredentials = {
      username: "demo@catfacts.com",
      password: "demo123",
    };

    authServiceSpy.getDemoCredentials.and.returnValue(demoCredentials);

    component.fillDemoUser();

    expect(component.loginForm.get("username")?.value).toBe(demoCredentials.username);
    expect(component.loginForm.get("password")?.value).toBe(demoCredentials.password);
  })

  it("should return correct error messages for username", () => {
    const usernameControl = component.loginForm.get("username");
    usernameControl?.markAsTouched();

    expect(component.getFieldErrorMessage("username")).toBe("Email is required");

    usernameControl?.setValue("invalid-email");
    expect(component.getFieldErrorMessage("username")).toBe("Please enter a valid email address");
  })

  it("should return correct error messages for password", () => {
    const passwordControl = component.loginForm.get("password");
    passwordControl?.markAsTouched();

    expect(component.getFieldErrorMessage("password")).toBe("Password is required");

    passwordControl?.setValue("ab");
    expect(component.getFieldErrorMessage("password")).toBe("Password must be at least 3 characters long");

    passwordControl?.setValue("a".repeat(257));
    expect(component.getFieldErrorMessage("password")).toBe("Password cannot exceed 256 characters");
  })

  it("should disable submit button when form is invalid", () => {
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  })

  it("should enable submit button when form is valid", () => {
    component.loginForm.patchValue({
      username: "test@example.com",
      password: "password123",
    })
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  })

  it("should call fillDemoUser when demo button is clicked", () => {
    spyOn(component, "fillDemoUser");
    fixture.detectChanges();

    const demoButton = fixture.nativeElement.querySelector(".demo-btn");

    demoButton?.click();

    expect(component.fillDemoUser).toHaveBeenCalled();
  })

  it("should call onSubmit when form is submitted", () => {
    spyOn(component, "onSubmit");
    component.loginForm.patchValue({
      username: "test@example.com",
      password: "password123",
    });
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector("form")

    form?.dispatchEvent(new Event("submit"));

    expect(component.onSubmit).toHaveBeenCalled();
  })
})
