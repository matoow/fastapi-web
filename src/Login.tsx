import React from "react";
import { store } from "./store";
import { observer } from "mobx-react";

export const Login: React.FC = observer(() => {
  const loggedIn = !!store.user;

  return (
    <div>
      {loggedIn ? (
        <>
          <p>logged in {store.user!.email}</p>
          <button onClick={() => store.logout()}>Logout</button>
        </>
      ) : (
        <>
          <p>logged out</p>
          <a href={store.getLoginURL()}>Login</a>
        </>
      )}
    </div>
  );
});
