import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import "./assets/styles/app.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Logout from "./pages/Logout";
import Root from "./pages/Root";
import Header from "./components/Header";
import Menu from "./components/Menu";

const App: React.FC = (props) => {

    return (
        <div className="grid-container">
            <Router>
                <Header />
                <Menu />
                <div className="page-content">
                    <ErrorBoundary>
                        <Switch>
                            <Route path="/logout" exact>
                                <Logout />
                            </Route>
                            <Route path="/">
                                <Root />
                            </Route>
                        </Switch>
                    </ErrorBoundary>
                </div>
            </Router>
        </div>
    );
};

export default App;
