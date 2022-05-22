import React, { Suspense } from "react";
import { Route, useHistory } from "react-router-dom";
import { useFederatedComponent } from "../hooks/useFederatedComponent";

const ErrorRemoteModule: React.FC<{ label: string; onReload?: () => void }> = ({ label, onReload }) => {
  return <div className="error-page">
    Error loading {label} page {" "} <button onClick={() => onReload && onReload()}>reload</button>
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

  const history = useHistory();

  return (
    <Route path={path}>
      <Suspense fallback="Loading">
        {errorLoading
          ? <ErrorRemoteModule label={label} onReload={() => history.go(0)} />
          : FederatedComponent && <FederatedComponent />}
      </Suspense>
    </Route>
  );
};

export default RemoteRoute;
