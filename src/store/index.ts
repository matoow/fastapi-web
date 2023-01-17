import { action, makeObservable, observable } from "mobx";
import { User } from "../models/User";

import { Logger } from "../utils/Logger";

const logger = new Logger("store");

export class Store {
  @observable user: User | null = null;

  constructor() {
    makeObservable(this);
    logger.debug("store constructor");
    this.init();
  }

  init = async () => {
    const user = await this.checkLogin();
    this.setUser(user);
  };

  @action
  setUser = (user: User | null) => {
    this.user = user;
    logger.debug("setUser: ", user);
  };

  getLoginURL = () => {
    return "http://localhost:8000/auth/github/login?return_to=http://localhost:3000";
  };

  getLogoutURL = () => {
    return "http://localhost:8000/auth/logout";
  };

  logout = () => {
    this.setUser(null);
    return fetch("http://localhost:8000/auth/logout", {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    });
  };

  checkLogin = async () => {
    return fetch("http://localhost:8000/auth/check", {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    });
  };
}

export const store = new Store();
