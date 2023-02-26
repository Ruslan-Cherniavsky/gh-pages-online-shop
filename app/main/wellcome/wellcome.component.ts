import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-wellcome', // <app-post-create></app-post-create>
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit { // app.module.ts registration

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    await this.authService.setUserData()

  }

  onAddPost() {

  }
}

