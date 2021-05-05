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
    const [newDisney, setNewDisney] = useState([]);
    const [trend, setTrend] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [recommends, setRecommends] = useState([]);

    useEffect(() => {
        const USER = JSON.parse(sessionStorage.getItem('user'));
        if (USER) {
            setLoggedInUser(USER)
        }
    }, []);

    //  fatching Recommend type data...
    let type1 = "recommend"
    useEffect(() => {
        fetch('https://disney-world-server.herokuapp.com/allMovies?type=' + type1, {
            method: 'GET',
        }).then(res => res.json()).then(data => setRecommends(data));
    }, [type1]);
    //  fatching New type data...
    let type2 = "new"
    useEffect(() => {
        fetch('https://disney-world-server.herokuapp.com/allMovies?type=' + type2, {
            method: 'GET',
        }).then(res => res.json()).then(data => setNewDisney(data));
    }, [type2]);
    //  fatching Trending type data...
    let type3 = "trending"
    useEffect(() => {
        fetch('https://disney-world-server.herokuapp.com/allMovies?type=' + type3, {
            method: 'GET',
        }).then(res => res.json()).then(data => setTrend(data));
    }, [type3]);
    //  fatching Original type data...
    let type4 = "original"
    useEffect(() => {
        fetch('https://disney-world-server.herokuapp.com/allMovies?type=' + type4, {
            method: 'GET',
        }).then(res => res.json()).then(data => setOrigin(data));
    }, [type4]);
    console.log(trend)
    console.log(newDisney);

    return (
        <UserContext.Provider
            value={[loggedInUser,
                setLoggedInUser,
                recommends,
                newDisney,
                origin,
                trend,
            ]}>
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