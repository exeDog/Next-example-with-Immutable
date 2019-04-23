import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ProfileBarBase = ({ className, props, logout }) => {
  const showLogoutAndFav = props.loggedIn;
  const showLogin = showLogoutAndFav === false;
  return (<nav className={className}>
    <div className="navWide">
      <div className="wideDiv">
        {showLogoutAndFav && <span onClick={logout}><a>Log out</a></span>}
        {showLogoutAndFav && <Link href="/favorites"><a>Favourites</a></Link>}
        {showLogin && <Link href="/splash"><a>Login</a></Link>}
      </div>
    </div>
    <style jsx>{`
    a {
      text-decoration: none;
      display: inline-block;
      padding: 0 2em;
      color: #FFF;
    }
    a:visited {
      color: #FFF;
    }
    .navWide {
    margin: 0 auto;
    }
    .wideDiv {
      text-align: center;
    }
    `}</style>
  </nav>);
};

export const ProfileBar = styled(ProfileBarBase)`
    background-color: #860037;
    overflow: hidden;
    padding: 1em;
    border-bottom: 1px solid #000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
`;
