import React from "react";
import DogTile from "./components/DogTile";
import "./assets/styles/dog-page.css";
import { importAll } from "./utils/import";

const DogPage: React.FC = (props) => {
  const dogImages: Record<string, string> = importAll(require.context('./assets/images', false, /\.(png|jpe?g|svg)$/));
  const dogTiles: JSX.Element[] = [];
  const imgKeys = Object.keys(dogImages);
  for (let i = 1; i <= imgKeys.length; i++) {
    dogTiles.push(<DogTile key={i} imgUrl={dogImages[imgKeys[i]]} />);
  }
  return <div className="dog-tiles-container">
    {dogTiles}
  </div>;
};

export default DogPage;
