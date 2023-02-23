import { Component, OnInit, } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private authListenerSubs: Subscription;
  private switchSub: Subscription;
  private userNameSub: Subscription;

  userIsAuthenticated = false
  switched = false
  userName = ''

  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => { this.userIsAuthenticated = isAuthenticated })
    if (this.userIsAuthenticated) { this.authService.setUserData() }
    this.switchSub = this.authService.getSwitch().subscribe(switchStatus => { this.switched = switchStatus })
    this.userNameSub = this.authService.getUserName().subscribe(userNameAuth => { this.userName = userNameAuth })
  }

  startShopping() {
    this.router.navigate(["/products"]);
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.switchSub.unsubscribe();
    this.userNameSub.unsubscribe();
  }
}