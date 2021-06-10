import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

// This is where we set up the Auth0 configuration
ReactDOM.render(
  <Auth0Provider
    domain="motorefi-dev.us.auth0.com"
    // Note that I'm "borrowing" the clientId for the leads app here
    // At some point, we'll need to set up a separate app in Auth0
    // for the internal crm.
    clientId="tWx9WHSlJy6hT7yFk2kpBff3NviDRV1T"
    redirectUri={window.location.origin}
    audience='hasura'
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);