import React from "react";
import FavouriteDog from "../assets/images/dog18.jpg";

const FavouriteDogTile: React.FC = (props) => {
    return <img style={{maxWidth: '100%', height: '400px'}} src={FavouriteDog} />
}

export default FavouriteDogTile;