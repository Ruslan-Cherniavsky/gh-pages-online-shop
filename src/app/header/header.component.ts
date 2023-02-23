import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../main/auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false
  private authListenerSubs: Subscription;
  userName = ''
  constructor(private authService: AuthService, private router: Router) { }
  async ngOnInit() {
    this.authListenerSubs = this.authService.getUserName().subscribe(currentUsername => { this.userName = currentUsername })
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => { this.userIsAuthenticated = isAuthenticated })
    try {
      await this.authService.setUserData()
    } catch (err) {
      console.log(err)
    }
  }
  logoutBtn() {
    this.authService.logout()
    this.router.navigate(["/"]);
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }
}
