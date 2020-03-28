import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor() {}

  user: any;

  getRole() {
    if (this.user.hasOwnProperty("userRoles")) {
      return this.user.userRoles;
    }
    return [];
  }

  getActivities(): any {
    let activities = new Set();
    if (this.user.hasOwnProperty("userRoles")) {
      this.user.userRoles.forEach(usr => {
        if (usr.hasOwnProperty("role")) {
          if (usr.role.hasOwnProperty("rolesActivities")) {
            usr.role.rolesActivities.forEach(url => {
              activities.add(url.activities.activity);
            });
          }
        }
      });
    }
    return activities;
  }

  getUserInfo() {
    return this.user;
  }

  setUserInfo(info) {
    this.user = info;
  }
}
