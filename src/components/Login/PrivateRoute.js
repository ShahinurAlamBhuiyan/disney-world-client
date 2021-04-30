import React, { useContext } from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory, useLocation} from "react-router-dom";
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
               loggedInUser.name ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;