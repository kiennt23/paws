import React from "react";
import { importAll } from "./utils/import";
import CatTile from "./components/CatTile";
import "./assets/styles/cat-page.css";

const CatPage: React.FC = (props) => {
  const catImages: Record<string, string> = importAll(require.context('./assets/images', false, /\.(png|jpe?g|svg)$/));
  const catTiles: JSX.Element[] = [];
  const imgKeys = Object.keys(catImages);
  for (let i = 1; i <= imgKeys.length; i++) {
    catTiles.push(<CatTile key={i} imgUrl={catImages[imgKeys[i]]} />);
  }
  return <div className="cat-tiles-container">
    {catTiles}
  </div>;
};

export default CatPage;
