import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Signup } from "src/app/interfaces/signup.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-signup', // <app-post-create></app-post-create>
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit { // app.module.ts registration

  switched = true
  signup: Signup
  isLoading = false
  password: number
  signedUp = false
  confirmPassword: number
  errorStatus: number
  private switchSub: Subscription

  constructor(public authService: AuthService) { }
  ngOnInit(): void {
    this.switchSub = this.authService.getSwitch().subscribe(switchStatus => {
      this.switched = switchStatus
    })
  }

  loginTrue() {
    this.authService.switchFalse()
  }

  async onSignup(signupForm: NgForm) {
    if (signupForm.invalid) {
      return
    }

    this.isLoading = true
    try {
      await this.authService.createUser(
        signupForm.value.firstName,
        signupForm.value.lastName,
        signupForm.value.email,
        signupForm.value.password,
        signupForm.value.city,
        signupForm.value.street)
    }
    catch (error) {
      this.isLoading = false
      this.errorStatus = error.status
      console.log(this.errorStatus)
    }
    this.isLoading = false
    this.signedUp = true
  }
  ngOnDestroy(): void {
    this.switchSub.unsubscribe();
  }
}
