import React from "react";
import styles from "./MenuLink.module.css";
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
    <div className={match ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default MenuLink;
