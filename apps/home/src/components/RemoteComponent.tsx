import React, { Suspense } from "react";
import { useFederatedComponent } from "../hooks/useFederatedComponent";
import ErrorBoundary from "./ErrorBoundary";

const Loading = () => <div className="loading">Loading...</div>;

const ErrorRemoteModule: React.FC<{}> = ({ }) => {
  return <div className="error-page">
    Error loading component {" "} <a href="">reload</a>
  </div>
}

const RemoteComponent: React.FC<RemoteComponent> = ({ scope, module, remoteUrl }) => {
  const { Component: FederatedComponent, loading, errorLoading } = useFederatedComponent(
    remoteUrl,
    scope,
    module
  );
  const renderComponent = () => {
    if (loading) {
      return <Loading />;
    } else if (errorLoading) {
      return <ErrorRemoteModule />;
    }
    return FederatedComponent && <FederatedComponent />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        {renderComponent()}
      </Suspense>
    </ErrorBoundary>
  );
}

export default RemoteComponent;