import React from "react";
import { Route } from "react-router-dom";
import { useFederatedComponent } from "../hooks/useFederatedComponent";

const Loading = () => <div className="loading">Loading...</div>;

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
      {renderPage()}
    </Route>
  );
};

export default RemoteRoute;
