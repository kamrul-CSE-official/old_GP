/* eslint-disable */
import React, { useEffect, useState, useStyles } from "react";
import { makeStyles } from "@mui/styles";
import moment from "moment";
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
  Box,
  Modal,
  Button,
} from "@mui/material";
import {
  GrEject,
  MdApproval
} from "react-icons/all";
import { useOvermind } from "../other/OvermindHelper";
import { commonService, alertService, accountService } from "@/_services";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reportdesigner.min.css';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';


function AllEntryStatus() {
  const bounds = { height: '800px', width: '100%'};
  const user = accountService.userValue;
  const { state, actions } = useOvermind();

  useEffect(() => {
    commonService.GetAllPurpose().then((x) => {
      actions.loadAllPurpose(x);

    });
  }, []);
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
      marginLeft: "30px",
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
      direction: "column",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "middle",
      boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "25px",
      color: "gray",
    },
    dateTime: {
      margin: "30px",
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [InTime, setInTime] = useState(null);
  const [OutTime, setOutTime] = useState(null);
  const [image, setImage] = useState("");
  const [reportShow, setReportShow] = useState(0);
  const handleChangePurpose = (event, value) => {

    actions.setAllPurpose(event.target.value);
    setReportShow(0);
   
  };

  const handleCheck = () => {
    if (InTime != null && OutTime != null && state.purpose != 0) {
        setReportShow(1);
      debugger;
    }
  };

  var parameters = [{"name":"PurposeTypeID","values":[state.purpose],"labels":[state.purpose],"nullable":false},{"name":"FromDate","values":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"labels":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"nullable":false},{"name":"ToDate","values":[moment(OutTime).format("YYYY/MM/DD kk:mm:ss")]}];

  function onBeforeParameterAdd(event) {
    event.parameterSettings.dateTimePickerType = "DateTime";
    if (event.parameterModel.Name === "FromDate") {
      event.parameterSettings.dateTimeFormat = "yyyy/MM/dd h:mm tt";
      event.parameterSettings.timeDisplayFormat = "HH:mm";
      event.parameterSettings.timeInterval = 60;
    }
    if (event.parameterModel.Name === "ToDate") {
      event.parameterSettings.dateTimeFormat = "yyyy/MM/dd h:mm tt";
      event.parameterSettings.timeDisplayFormat = "HH:mm";
      event.parameterSettings.timeInterval = 60;
    }
  }
  var parameterSettings = {
    dateTimePickerType: "DateTime",
    dateTimeFormat: "yyyy/MM/dd h:mm tt",
    timeDisplayFormat: "HH:mm",
    timeInterval: 60,
  };
  const handleClose = () => {
    setOpen(false);
  };
  
 
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Entry
        </Typography>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          margin: 0,
          position: "absolute",
          top: "5%",
          left: "5%",
        }}
      >
        <Paper className={classes.bopaper}>
          <img src={image} width="700" height="500"></img>
        </Paper>
      </Modal>

      <Grid container alignItems="center" direction="column">
        <Grid container item alignItems="center" direction="column">
          <Grid item alignItems="center" direction="row">
         
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Purpose</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={state.purpose}
                onChange={handleChangePurpose}
                input={<OutlinedInput label="Purpose" />}
              >
                {state.AllPurpose.map((type, index) => (
                  <ManuI key={index} value={type.PurposeTypeID}>
                    {type.PurposeType}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item alignItems="center" direction="row">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From Date"
                value={InTime}
                onChange={(newValue) => {
                    setReportShow(0);
                    setInTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="To Date"
                value={OutTime}
                onChange={(newValue) => {
                    setReportShow(0);
                    setOutTime(newValue);
                  debugger;
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
              style={{ margin: "7px" }}
              variant="contained"
              size="medium"
              color="primary"
              startIcon={<MdApproval />}
              onClick={() => {
                handleCheck();
              }}
            >
              View Report
            </Button>
        </Grid>
        </Grid>
        <div style={bounds}>
       {reportShow == 1 ?
         <BoldReportViewerComponent
         id="reportviewer-container"
         reportServiceUrl = {'https://192.168.1.253:8080/ReportViewer4'}
         reportPath = {'~/Resources/GatepassEntry.rdl'} 
         parameters = {parameters}
         parameterSettings = { parameterSettings} 
         before-parameter-add={onBeforeParameterAdd}
         >
            
     </BoldReportViewerComponent>: null
       }
        </div>

       
      </Grid>
    </Grid>
  );
}

export { AllEntryStatus };
