import React from "react";
import "./assets/styles/home.css";
import ErrorBoundary from "./components/ErrorBoundary";
import RemoteComponent from "./components/RemoteComponent";

const isProd = process.env.NODE_ENV === "production";

const catRemoteUrl = isProd ? "https://d2yt125o7sij9g.cloudfront.net/cat/remoteEntry.js" : "http://localhost:9002/remoteEntry.js";
const dogRemoteUrl = isProd ? "https://d2yt125o7sij9g.cloudfront.net/dog/remoteEntry.js" : "http://localhost:9003/remoteEntry.js";

const HomePage: React.FC = () => {
  return <div className="home-container">
    <span className="favourite-item"><h2>This month favourite</h2></span>
    <span className="favourite-item">
      <ErrorBoundary>
        <RemoteComponent remoteUrl={catRemoteUrl} scope="cat" module="./FavouriteCatTile" />
      </ErrorBoundary>
    </span>
    <span className="favourite-item">
      <ErrorBoundary>
        <RemoteComponent remoteUrl={dogRemoteUrl} scope="dog" module="./FavouriteDogTile" />
      </ErrorBoundary>
    </span>
    <span className="favourite-item"><h2>This month favourite</h2></span>
  </div>;
};

export default HomePage;
