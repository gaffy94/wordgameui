import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./services/user/user.service";
@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  title = "anagram";

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }
  ngOnInit() {
    if (
      this.userService.getUserInfo() == undefined ||
      this.userService.getUserInfo() == null
    ) {
      console.log("im catching your redirect");
      this.router.navigate(["auth"]);
    }
  }
}
