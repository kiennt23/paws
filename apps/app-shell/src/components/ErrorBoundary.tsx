import React from "react";

class ErrorBoundary extends React.Component<
  { children: JSX.Element },
  { hasError: boolean }
> {
  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error: any, errorInfo: any) {
  //   // You can also log the error to an error reporting service
  //   console.log(error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className="error-page">Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
