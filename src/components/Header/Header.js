import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase/firebase.config';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}



const Header = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        if (loggedInUser.name) {
            history.push('/home')
        }
    }, [loggedInUser.name])

    const handleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function (result) {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = { name: displayName, email, photo: photoURL }
            setLoggedInUser(signedInUser);
            sessionStorage.setItem('user', JSON.stringify(signedInUser));
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const handleSignOut = () =>{
        sessionStorage.removeItem('user');
        setLoggedInUser("");
    }
    return (
        <Nav>
            <Logo>
                <Link to="/home" ><img src="/images/logo.svg" alt="Disney" /></Link>
            </Logo>
            {
                !loggedInUser.name ?
                    <Login onClick={handleSignIn}>Login</Login>
                    : <>
                        <NavMenu>
                            <Link to="/home" alt="HOME">
                                <img src="/images/home-icon.svg" alt="HOME" />
                                <span>HOME</span>
                            </Link>
                            <Link to="/home">
                                <img src="/images/search-icon.svg" alt="SEARCH" />
                                <span>SEARCH</span>
                            </Link>
                            <Link to="/home">
                                <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                                <span>WATCHLIST</span>
                            </Link>
                            <Link to="/home">
                                <img src="/images/original-icon.svg" alt="ORIGINALS" />
                                <span>ORIGINALS</span>
                            </Link>
                            <Link to="/home">
                                <img src="/images/movie-icon.svg" alt="MOVIES" />
                                <span>MOVIES</span>
                            </Link>
                            <Link to="/home">
                                <img src="/images/series-icon.svg" alt="SERIES" />
                                <span>SERIES</span>
                            </Link>
                        </NavMenu>
                        <SignOut>
                            <UserImg src={loggedInUser.photo} alt={loggedInUser.name} />
                            <DropDown>
                                <span onClick={handleSignOut}>Sign out</span>
                            </DropDown>
                        </SignOut>
                    </>
            }

        </Nav>
    );
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img{
        display: block;
        width: 100%;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-slow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    position: relative;
    margin-right: auto;
    margin-left: 25px;

    a{
        display: flex;
        align-items: center;
        padding: 0 12px;

        img{
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }

        span{
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;
            padding-left: 3px;
        

        &:before{
            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            content: "";
            height: 2px;
            left: 0px;
            opacity: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            visibility: hidden;
            width: auto;
        }
    }
    &:hover{
        span:before{
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
        }
    }
}

    @media (max-width: 768px){
        display: none;
    }
`;

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const UserImg = styled.img`
    height: 100%; 
    border-radius: 50%;
    width: 100%;
    height: 100%;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    &:hover{
        ${DropDown}{
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;

export default Header;