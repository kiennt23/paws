import React from "react";

import styles from "./Header.module.css";

import Logo from "../assets/images/logo.png";
import Profile from "./Profile";

const Header: React.FC = (props) => {
    return <div className={styles.header}>
        <img className={styles.logo} src={Logo} alt="Logo"/>
        <Profile />
    </div>
}

export default Header;
