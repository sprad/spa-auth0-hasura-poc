import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="motorefi-dev.us.auth0.com"
    clientId="tWx9WHSlJy6hT7yFk2kpBff3NviDRV1T"
    redirectUri={window.location.origin}
    audience='hasura'
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);