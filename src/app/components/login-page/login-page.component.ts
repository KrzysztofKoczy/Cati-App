import { Component, inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { AuthenticationService } from "../../services/authentication.service"

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: "app-login",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);

  loginForm: FormGroup;
  loginError = "";

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: [
        "",
        [Validators.required, Validators.email, Validators.pattern(emailRegex)],
      ],
      password: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authenticationService.login(username, password);

      if (!success) {
        this.loginError = "Invalid credentials. Please try again.";
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  fillDemoUser() {
    const demoCredentials = this.authenticationService.getDemoCredentials();
    
    this.loginForm.patchValue(demoCredentials);
    this.loginError = "";
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);

    return !!(field && field.invalid && field.touched);
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName)

    if (field && field.errors && field.touched) {
      if (field.errors["required"]) {
        return fieldName === "username" ? "Email is required" : "Password is required";
      }

      if (fieldName === "username") {
        if (field.errors["email"] || field.errors["pattern"]) {
          return "Please enter a valid email address";
        }
      }

      if (fieldName === "password") {
        if (field.errors["minlength"]) {
          return "Password must be at least 3 characters long";
        }
        if (field.errors["maxlength"]) {
          return "Password cannot exceed 256 characters";
        }
      }
    }

    return "";
  }
}
