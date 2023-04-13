import React, {useEffect, useState} from "react";

import {useAuth0} from "@auth0/auth0-react";
import {Redirect, Route, BrowserRouter as Router, Switch, useRouteMatch} from "react-router-dom";
import RemoteRoute from "../components/RemoteRoute";
import remotePages from "../utils/routes";
import Loading from "../components/Loading";
const Root: React.FC = (props) => {
    const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0();
    const [routes, setRoutes] = useState<JSX.Element[]>([]);

    useEffect( () => {
        if (isLoading) {
            return
        }
        if (!isAuthenticated) {
            loginWithRedirect().then(r => console.log('Redirecting'))
        }
    }, [isLoading, isAuthenticated])

    useEffect(() => {
        if (isAuthenticated) {
            let routes = remotePages.map((remote) => {
                const {label, path, remoteUrl, scope, module} = remote;
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
            routes = [
                ...routes,
                <Route path="/" exact>
                    <Redirect to={{pathname: "/home"}}/>
                </Route>
            ]
            setRoutes(routes);
        }
    }, [isAuthenticated])

    return isLoading ? <Loading /> : <>{routes}</>
}

export default Root;
