import React from "react";
import { render } from "react-dom";

import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

render(
    <Auth0Provider
        domain="maneki.au.auth0.com"
        clientId="HsroIHxWzMtgm9fDh4NYN0YIVB3OwSFg"
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'http://localhost:9000',
            scope: 'openid profile email',
        }}
        useRefreshTokens
        useRefreshTokensFallback
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);
