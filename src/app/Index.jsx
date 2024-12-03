import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';
import {GatePass} from '@/gatePass';
import {makeStyles} from '@mui/styles';

function App() {
    const { pathname } = useLocation();  
    const [user, setUser] = useState({});
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
      }));
    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <Nav /> */}
            <Alert />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
                <Route path="/account" component={Account} />
                <PrivateRoute path="/gatePass" component={GatePass} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    );
}

export { App }; 