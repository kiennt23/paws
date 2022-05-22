import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Logo from "./assets/images/logo.png";

import "./assets/styles/app.css";
import ErrorBoundary from "./components/ErrorBoundary";
import MenuLink from "./components/MenuLink";
import RemoteRoute from "./components/RemoteRoute";

const homeRemote: RemoteRoute = {
  label: "Home",
  path: "/home",
  remoteUrl: "http://localhost:9001/remoteEntry.js",
  scope: "home",
  module: "./HomePage",
};

const catRemote: RemoteRoute = {
  label: "Cat",
  path: "/cat",
  remoteUrl: "http://localhost:9002/remoteEntry.js",
  scope: "cat",
  module: "./CatPage",
};

const dogRemote: RemoteRoute = {
  label: "Dog",
  path: "/dog",
  remoteUrl: "http://localhost:9003/remoteEntry.js",
  scope: "dog",
  module: "./DogPage",
};

const remotePages = [homeRemote, catRemote, dogRemote];

const App: React.FC = (props) => {

  const menuLinks = remotePages.map((remote) => {
    const { path, label } = remote;
    return (
      <MenuLink to={path}>
        {label}
      </MenuLink>
    );
  });

  const routes = remotePages.map((remote) => {
    const { path, remoteUrl, scope, module } = remote;
    return (
      <RemoteRoute
          path={path}
          remoteUrl={remoteUrl}
          scope={scope}
          module={module}
        />
    )
  })
  return (
    <div className="grid-container">
      <Router>
        <div className="header">
          <img className="logo" src={Logo} />
        </div>
        <div className="menu">
          {menuLinks}
        </div>
        <div className="page-content">
          <ErrorBoundary>
            <Switch>
              {routes}
              <Route path="/" exact>
                <Redirect to={{ pathname: "/home" }} />
              </Route>
            </Switch>
          </ErrorBoundary>
        </div>
      </Router>
    </div>
  );
};

export default App;
