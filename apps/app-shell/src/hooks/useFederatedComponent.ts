import React, { useState, useEffect, lazy } from "react";

declare var __webpack_init_sharing__: (scope: string) => Promise<void>;
declare var __webpack_share_scopes__: { default: string };

type Module = any

type Factory = () => Module;

type Container = {
  init: (scope: string) => Promise<void>;
  get: (module: string) => Promise<Factory>;
};

function loadComponent(scope: string, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container: Container = (window as any)[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await (window as any)[scope].get(module);
    return factory();
  };
}

const urlCache = new Set();
const useDynamicScript = (url: string) => {
  const [ready, setReady] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);

    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};

const componentCache = new Map();
export const useFederatedComponent = (
  remoteUrl: string,
  scope: string,
  module: string
) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = useState<Module>(null);

  const { ready, errorLoading } = useDynamicScript(remoteUrl);
  useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  useEffect(() => {
    if (ready && !Component) {
      const Comp = lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return { errorLoading, Component };
};
