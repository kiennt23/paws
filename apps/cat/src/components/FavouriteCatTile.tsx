import React from "react";
import FavouriteCat from "../assets/images/cat9.jpg";

const FavouriteCatTile: React.FC = (props) => {
    return <img style={{maxWidth: '100%', height: '400px'}} src={FavouriteCat} />
}

export default FavouriteCatTile;