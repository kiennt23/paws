import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './Logout.module.css';

const Logout: React.FC = () => {
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
    useEffect(() => {
        if (isAuthenticated) {
            logout();
        }
    }, [isAuthenticated]);
    if (!isAuthenticated) {
        return (
            <div className={styles.logoutContainer}>
                <p>We logged you out</p>
                <button className={styles.reloginButton} onClick={async () => await loginWithRedirect()}>
                    Re-Login
                </button>
            </div>
        );
    }
    return <></>;
};

export default Logout;
