import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { AuthenticationService } from "../../services/authentication.service"
import { IconComponent } from "../icon/icon.component";
import { emailRegex } from "../../model/const";

@Component({
  selector: "app-login",
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email, Validators.pattern(emailRegex)]],
      password: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authenticationService.login(username, password);

      if (!success) {
        window.alert("Invalid credentials. Please try again.");
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  fillDemoUser() {
    const demoCredentials = this.authenticationService.getDemoCredentials();
    
    this.loginForm.patchValue(demoCredentials);
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
