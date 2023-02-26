import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Login } from "src/app/interfaces/login.model";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login', // <app-post-create></app-post-create>
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { // app.module.ts registration
  login: Login
  isLoading = false
  userIsAuthenticated = false
  public authSwitchListenerSubs = false
  switched = false
  private switchSub: Subscription
  constructor(public authService: AuthService) { }
  async ngOnInit() {
    this.switchSub = this.authService.getSwitch().subscribe(switchStatus => { this.switched = switchStatus })
  }
  signupTrue() {
    this.authService.switchTrue()
  }
  async onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.isLoading = true
    await this.authService.loginUser(
      loginForm.value.email,
      loginForm.value.password
    )
    await this.authService.setUserData()
    loginForm.resetForm();
    this.isLoading = false
  }
}

