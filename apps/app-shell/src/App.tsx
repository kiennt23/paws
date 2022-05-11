import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Logo from "./assets/images/logo.png";

import "./assets/styles/app.css";

const HomePage = React.lazy(() => import("home/HomePage"));
const CatPage = React.lazy(() => import("cat/CatPage"));
const DogPage = React.lazy(() => import("dog/DogPage"));

const App: React.FC = (props) => {
  return (
    <div className="grid-container">
      <Router>
        <div className="header">
          <img className="logo" src={Logo} />
        </div>
        <div className="menu">
          <div className="menu-item">
            <Link to="/home">Home</Link>
          </div>
          <div className="menu-item">
            <Link to="/cat">Cat</Link>
          </div>
          <div className="menu-item">
            <Link to="/dog">Dog</Link>
          </div>
        </div>
        <div className="page-content">
          <Switch>
            <Route path="/cat">
              <React.Suspense fallback="Loading">
                <CatPage />
              </React.Suspense>
            </Route>
            <Route path="/dog">
            <React.Suspense fallback="Loading">
                <DogPage />
              </React.Suspense>
            </Route>
            <Route path="/home">
              <React.Suspense fallback="Loading">
                <HomePage />
              </React.Suspense>
            </Route>
            <Route path="/">
              <Redirect to={{ pathname: "/home" }} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
