import React from 'react';
import { Grid,Paper,Typography,Button }from '@mui/material';
import {makeStyles} from '@mui/styles';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { accountService } from '../_services';
import { useOvermind } from "../other/OvermindHelper";
import {
  FaAccusoft,
  FaStoreAlt
} from "react-icons/fa";
function Home() {
    const user = accountService.userValue;
    const history = useHistory();
    const { state, actions } = useOvermind();
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1,
        background:
          "linear-gradient(to right, #11998e, #38ef7d)"
      },
      paper: {
        width: "100%",
        minHeight: "100vh",
        justify:"center",
        justifyContent:"center",
        alignItems:"center",
        background: "inherit"
      },
      middle:{
        width: "100%",
        minHeight: "100vh",
        justify:"center",
        justifyContent:"center",
        alignItems:"center",
        background: "inherit"
      },
      tr: {
        background: "white",
        borderColor: 'white',
        '&:hover': {
          borderColor: '#00FF00',
          background: "#00FF00",
        }
      }
    }));

  function handleClick() {
    debugger;
    window.localStorage.setItem("ButtonID", 1);
    actions.setButtonID(1);
    if(user != null && state.ButtonID != 0){
      history.push('/gatePass/request');
      
    }else{
      history.push('/');
    }
   

  }
  function handleClickToStoreIssue() {
    window.localStorage.setItem("ButtonID", 2);
    actions.setButtonID(2);
    debugger;
    if(user != null && state.ButtonID != 0 ){
      history.push('/gatePass/Spare_Issue');
      
    }else{
      history.push('/');
    }
   

  }
 
  const classes = useStyles();
    return (
      <Paper className={classes.root} >
        <Grid item={true}
            container className={classes.paper} alignItems="center"  justify="center" direction="column" xs={12}>
              <Grid item={true}
            container
            direction="row"
            justifyContent="flex-start"
            style={{
              padding:"20px"
            }}
            xs={12}>
                <Typography variant="h2" >Hi {user.firstName}!</Typography>
              </Grid>
          <Grid
            item={true}
            className={classes.middle}
            container
            direction="row"
            justify="center"
            alignItems="center"
            xs={8}
          >
           <Button
              style={{ margin: "5px" }}
              variant="contained"
              size="large"
              color="warning"
              startIcon={<FaAccusoft />}
              onClick={() => {
                handleClick();
              }}
            >
              GATEPASS
            </Button>
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              size="large"
              color="warning"
              startIcon={<FaStoreAlt />}
              onClick={() => {
                handleClickToStoreIssue();
              }}
            >
              Stores
            </Button>
          </Grid>
         
        </Grid>
      </Paper>
    );
}

export { Home };