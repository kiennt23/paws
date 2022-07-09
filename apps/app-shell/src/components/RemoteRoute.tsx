import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { useFederatedComponent } from "../hooks/useFederatedComponent";

const Loading = () => <div className="loading">Loading...</div>;

const ErrorRemoteModule: React.FC<{ label: string; path: string }> = ({ label }) => {
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
  const { Component: FederatedComponent, loading, errorLoading } = useFederatedComponent(
    remoteUrl,
    scope,
    module
  );
  const renderPage = () => {
    if (loading) {
      return <Loading />;
    } else if (errorLoading) {
      return <ErrorRemoteModule label={label} path={path} />;
    }
    return FederatedComponent && <FederatedComponent />;
  }
  

  return (
    <Route path={path}>
      <Suspense fallback={<Loading />}>
        {renderPage()}
      </Suspense>
    </Route>
  );
};

export default RemoteRoute;
