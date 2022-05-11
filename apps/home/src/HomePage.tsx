import React from "react";
// import DogCatImage from "./assets/images/cute-dog-cat.jpeg";
import "./assets/styles/home.css";

const FavouriteCatTile = React.lazy(() => import("cat/FavouriteCatTile"));
const FavouriteDogTile = React.lazy(() => import("dog/FavouriteDogTile"));

const HomePage: React.FC = (props) => {
  return <div className="home-container">
    <span className="favourite-item"><h2>This month favourite</h2></span>
    <span className="favourite-item">
      <React.Suspense fallback="Loading">
        <FavouriteCatTile />
      </React.Suspense>
    </span>
    <span className="favourite-item">
      <React.Suspense fallback="Loading">
        <FavouriteDogTile />
      </React.Suspense>
    </span>
    <span className="favourite-item"><h2>This month favourite</h2></span>
    {/* <img src={DogCatImage} /> */}
  </div>;
};

export default HomePage;
