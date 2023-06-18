import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from './Header.module.css';

const Header = () => {
  const [token, , removeToken] = useCookies(['myToken']);
  const [group] = useCookies(['myGroup']);
  const [profile] = useCookies(['myProfile']);

  const logoutSubmitted = () => {
    removeToken('myToken');
  };

  return (
    <header id={styles.header}>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <img id={styles.logo} className={styles.site_logo} src="logo.png" alt="" />
      </Link>

      <div id={styles.nav_container_lg}>
        <ul className={styles.nav_list}>
          <li className={styles.nav_link}>
            <Link to="/home" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
              Home
            </Link>
          </li>


          <li className={styles.nav_link}>
            {group['myGroup'] === 'RESEARCHER' && (
              <Link to="/add-new" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
                Post a Research-paper
              </Link>
            )}
            {group['myGroup'] === 'READER' && (
              <Link to="#" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
                Research-papers
              </Link>
            )}
            {group['myGroup'] === 'ADMIN' && (
              <Link to="#" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
                Monitor
              </Link>
            )}
          </li>

          <li className={styles.nav_link}>
          {group['myGroup'] === 'RESEARCHER' && (
            <div>
              {profile['myProfile'] === 'True' && (
                <Link to="/researcher-profile-display" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
                  Profile
                </Link>
              )}
              {profile['myProfile'] === 'False' && (
                <Link to="/researcher-profile" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
                  Create Profile
                </Link>
              )}
            </div>
          )}

            {group['myGroup'] === 'READER' && (
              <Link to="#" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
              Profile
              </Link>
            )}
            {group['myGroup'] === 'REVIEWER' && (
              <Link to="#" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
              Profile
              </Link>
            )}
            {group['myGroup'] === 'ADMIN' && (
              <Link to="#" className={styles.link} style={{ color: 'black', textDecoration: 'none' }}>
              Profile
              </Link>
            )}
          </li>

          <li className={styles.nav_link}>
            {token['myToken'] ? (
              <Link onClick={logoutSubmitted} to="/login" className={styles.link} style={{ color: 'black', textDecoration: 'none !important' }}>
                Log Out
              </Link>
            ) : (
              <Link to="/login" className={styles.link}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
