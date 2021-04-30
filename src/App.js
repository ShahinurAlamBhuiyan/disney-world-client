import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import PrivateRoute from './components/Login/PrivateRoute';

export const UserContext = createContext();

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [ moviesType, setMovieType ] = useState({});
    // const [ token, setToken ] = useState(null);
    useEffect(()=>{
        const USER = JSON.parse(sessionStorage.getItem('user'));
        if(USER){
            setLoggedInUser(USER)
        }
    },[]);
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser, moviesType, setMovieType]}>
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/'>
                        <Login />
                    </Route>
                    <PrivateRoute path='/home'>
                        <Home />
                    </PrivateRoute>
                    <PrivateRoute path='/details/:_id'>
                        <Details />
                    </PrivateRoute>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
};

export default App;