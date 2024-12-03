import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { createStyles, makeStyles } from '@mui/styles';
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem as ManuI,
  Paper,
  Typography,
  TextField,
  Modal,
  Autocomplete,
  Button,
  Box,
  createFilterOptions,
} from "@mui/material";
import { accountService } from "@/_services";

import { Login } from "./Login";
import { Register } from "./Register";
import { VerifyEmail } from "./VerifyEmail";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";

function Account({ history, match }) {
  const { path } = match;
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  useEffect(() => {
    // redirect to home if already logged in
    if (accountService.userValue) {
      history.push("/");
    }
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={8}>
          <Switch>
            <Route path={`${path}/login`} component={Login} />
            <Route path={`${path}/register`} component={Register} />
            <Route path={`${path}/verify-email`} component={VerifyEmail} />
            <Route
              path={`${path}/forgot-password`}
              component={ForgotPassword}
            />
            <Route path={`${path}/reset-password`} component={ResetPassword} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

export { Account };
