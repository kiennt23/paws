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

const isProd = process.env.NODE_ENV === "production";

const homeRemote: RemoteRoute = {
  label: "Home",
  path: "/home",
  remoteUrl: isProd? "https://d2yt125o7sij9g.cloudfront.net/home/remoteEntry.js" : "http://localhost:9001/remoteEntry.js",
  scope: "home",
  module: "./HomePage",
};

const catRemote: RemoteRoute = {
  label: "Cat",
  path: "/cat",
  remoteUrl: isProd? "https://d2yt125o7sij9g.cloudfront.net/cat/remoteEntry.js" : "http://localhost:9002/remoteEntry.js",
  scope: "cat",
  module: "./CatPage",
};

const dogRemote: RemoteRoute = {
  label: "Dog",
  path: "/dog",
  remoteUrl: isProd? "https://d2yt125o7sij9g.cloudfront.net/dog/remoteEntry.js" : "http://localhost:9003/remoteEntry.js",
  scope: "dog",
  module: "./DogPage",
};

const remotePages = [homeRemote, catRemote, dogRemote];

const App: React.FC = (props) => {
  const menuLinks = remotePages.map((remote) => {
    const { path, label } = remote;
    return <MenuLink key={path} to={path}>{label}</MenuLink>;
  });

  const routes = remotePages.map((remote) => {
    const { label, path, remoteUrl, scope, module } = remote;
    return (
      <RemoteRoute
        key={path}
        label={label}
        path={path}
        remoteUrl={remoteUrl}
        scope={scope}
        module={module}
      />
    );
  });
  return (
    <div className="grid-container">
      <Router>
        <div className="header">
          <img className="logo" src={Logo} />
        </div>
        <div className="menu">{menuLinks}</div>
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
