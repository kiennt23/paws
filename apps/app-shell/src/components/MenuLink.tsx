import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const MenuLink: React.FC<{
  children: string;
  to: string;
  exact?: boolean;
}> = ({ children, to, exact }) => {
  let match = useRouteMatch({
    path: to,
    exact,
  });

  return (
    <div className={match ? "menu-item active" : "menu-item"}>
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default MenuLink;
