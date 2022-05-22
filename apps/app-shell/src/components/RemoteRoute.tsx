import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { useFederatedComponent } from "../hooks/useFederatedComponent";

const RemoteRoute: React.FC<RemoteRouteProps> = ({
  path,
  remoteUrl,
  scope,
  module,
}) => {
  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    remoteUrl,
    scope,
    module
  );

  return (
    <Route path={path}>
      <Suspense fallback="Loading">
        {errorLoading
          ? `Error loading module "${module}"`
          : FederatedComponent && <FederatedComponent />}
      </Suspense>
    </Route>
  );
};

export default RemoteRoute;
