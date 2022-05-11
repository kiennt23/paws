import React from "react";
import "../assets/styles/cat-tile.css";

type CatTileProps = React.ReactNode & { imgUrl: string };

const CatTile: React.FC<CatTileProps> = (props: CatTileProps) => {
  const { imgUrl } = props;
  return (
    <div className="cat-tile">
      <img style={{maxWidth: '100%'}} src={imgUrl} />
    </div>
  );
};

export default CatTile;
