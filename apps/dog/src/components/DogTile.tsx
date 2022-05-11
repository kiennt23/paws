import React from "react";
import "../assets/styles/dog-tile.css";

type DogTileProps = React.ReactNode & { imgUrl: string };

const DogTile: React.FC<DogTileProps> = (props: DogTileProps) => {
  const { imgUrl } = props;
  return (
    <div className="dog-tile">
      <img style={{maxWidth: '100%'}} src={imgUrl} />
    </div>
  );
};

export default DogTile;
