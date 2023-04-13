import React from "react";
import styles from "./Menu.module.css";
import MenuLink from "./MenuLink";
import remotePages from "../utils/routes";
import {useAuth0} from "@auth0/auth0-react";
import Loading from "./Loading";

const menuLinks = remotePages.map((remote) => {
    const {path, label} = remote;
    return <MenuLink key={path} to={path}>{label}</MenuLink>;
});

const Menu: React.FC = (props) => {
    const { isLoading, isAuthenticated } = useAuth0();
    if (isLoading) {
        return <Loading />
    }
    if (!isAuthenticated) {
        return <></>
    }
    return <div className={styles.menu}>{menuLinks}</div>;
}

export default Menu;
