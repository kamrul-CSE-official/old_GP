import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { commonService, alertService, accountService } from "../_services";
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
import {
    BiMessageDots,
    BiAlarmExclamation
  } from "react-icons/all";
function Alart() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    dropdown: {
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    header: {
      minHeight: 50,
    },
    paper: {
      display: "flex",
      marginTop: "30px",
      marginLeft :'30px',
      minHeight: "60px",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "middle",
      boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "25px",
      color: "gray",
    },
    bopaper: {
      display: "flex",
      minHeight: "500px",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "middle",
      boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "25px",
      color: "gray",
    },
  }));
  const classes = useStyles();
  const user = accountService.userValue;
  const [status, setstatus] = React.useState([]);
  const [remarks, setremarks] = React.useState("");
  const [notificationUser, setnotificationUser] = React.useState([]);
  const handleRemarks = (event) => {
    setremarks(event.target.value);
  };
  const handleAlartMsg = () => {
    for(var i =0; i< notificationUser.length;i++){
        NotifyWhatsappGeneral(notificationUser[i].PhoneNo);
        debugger;
       }
  };
  const handleAlartEmg = () => {
    for(var i =0; i< notificationUser.length;i++){
        NotifyWhatsappEmg(notificationUser[i].PhoneNo);
        debugger;
       }
  };
  function NotifyWhatsappGeneral(obj) {
    debugger;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer EAAINrUm0pZC0BABslHlZCNmVnuOtQ2lQkxh2LarMGPqsFHlgXOHqf2BA7NsZCFLpiolu54O94Op1LdnZAu0VWRgOCdvxyXpXkh6VncwqG6bwZBb17UWy1ZCZCRKsXm86sC0FDbdMTti5fKpDQvrjMbyAMFQS5RUwZAQZBaQrbFGikKu9a2AhQ6s1o' },
        body: JSON.stringify({
          "messaging_product": "whatsapp",
          "to": obj,
          "type": "template",
          "template": {
            "name": "general_alart",
            "language": {
                "code": "en",
                "policy": "deterministic"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": remarks
                        }
                    ]
                }
                
            ]
        }
      
    })
    };
    debugger;
    
    return fetch(`https://graph.facebook.com/v14.0/105603162206282/messages`, requestOptions).then((()=>{
        alertService.info("Blower send sucessfully");
        setremarks("");

    }));
    
}
function NotifyWhatsappEmg(obj) {
    debugger;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer EAAINrUm0pZC0BABCZCDEaQhnIWZALSb7msFRZC1sXSjPs31vmwznaMm48rFbQSZApD9MC1yvjzrIXDZAZB8T3GNq4LrKaYYSG4SZBeASvGplzZCp1wuBAZCBNBCuVpzcmhGpdWOVcLclWPpNzUjYciK3sRGp5auX1Nja7iifk3ZCV1fAa82hckG16Lj' },
        body: JSON.stringify({
          "messaging_product": "whatsapp",
          "to": obj,
          "type": "template",
          "template": {
            "name": "emergency_template",
            "language": {
                "code": "en",
                "policy": "deterministic"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": remarks
                        }
                    ]
                }
                
            ]
        }
      
    })
    };
    debugger;
    
    return fetch(`https://graph.facebook.com/v14.0/105603162206282/messages`, requestOptions).then((()=>{
        alertService.info("Blower send sucessfully");
        setremarks("");
    })
        
    );
    
}
  useEffect(() => {
      commonService.UserListForNotification().then((x)=>{
        setnotificationUser(x);
      });
  }, []);
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
        📣📢  Alart Blower 📣📢 
        </Typography>
      </Paper>
      <Grid container>
      <TextField
                sx={{ margin:6, width: 1 }}
                id="outlined-basic"
                onChange={handleRemarks}
                multiline
                rows={5}
                label="Alart Message"
                variant="outlined"
              />
               <Grid container xs={12} justifyContent="flex-end">
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              size="large"
              startIcon={<BiMessageDots />}
              onClick={() => {
               handleAlartMsg();
              }}
            >
              AlartMsg
            </Button>
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              size="large"
              color="error"
              startIcon={<BiAlarmExclamation />}
              onClick={() => {
                handleAlartEmg();
              }}
            >
              EmgMsg
            </Button>
          </Grid>
      </Grid>
    </Grid>
  );
}

export { Alart };
