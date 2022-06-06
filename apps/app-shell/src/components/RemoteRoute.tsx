import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { useFederatedComponent } from "../hooks/useFederatedComponent";

const ErrorRemoteModule: React.FC<{ label: string; path: string }> = ({ label, path }) => {
  return <div className="error-page">
    Error loading {label} page {" "} <a href="">reload</a>
  </div>
}

const RemoteRoute: React.FC<RemoteRoute> = ({
  label,
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
          ? <ErrorRemoteModule label={label} path={path} />
          : FederatedComponent && <FederatedComponent />}
      </Suspense>
    </Route>
  );
};

export default RemoteRoute;
