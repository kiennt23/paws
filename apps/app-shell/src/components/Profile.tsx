import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';
import styles from './Profile.module.css';

const Profile: React.FC = (props) => {
    const { user, isLoading, isAuthenticated, logout } = useAuth0();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    if (isLoading) {
        return <Loading />;
    }
    if (isAuthenticated) {
        return (
            <div className={styles.profileDropdown} onClick={toggleDropdown}>
                <img
                    className={styles.profileImg}
                    src={user?.picture}
                    alt={user?.name}
                />
                <div
                    className={`${styles.dropdownContent} ${
                        showDropdown ? styles.show : ''
                    }`}
                >
                    <div className={styles.userInfo}>
                        <h4>{user?.name}</h4>
                    </div>
                    <Link onClick={() => logout()} to="">
                        Logout
                    </Link>
                </div>
            </div>
        );
    }
    return <></>;
};

export default Profile;
