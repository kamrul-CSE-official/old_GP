/* eslint-disable */
import React, { useEffect, useState, useStyles } from "react";
import { makeStyles } from "@mui/styles";
import Stack from '@mui/material/Stack';
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
    MdApproval,
    GiGps
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
//Data-Visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
//Reports react base
import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';

function VehicleAssignReport() {
  const bounds = { height: '800px', width: '100%'};
  const user = accountService.userValue;
  const { state, actions } = useOvermind();
  useEffect(() => {
    commonService.GetAllVehicleDetailsWithoutTrip().then((x) => {
        setvehicleDetails(x);
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
  const handleCheck = () => {
    if (AssignDate != null && state.vehicleNo != '') {
        setReportShow(1);
      debugger;
    }
  };
  const classes = useStyles();
  const [vehicleDetails, setvehicleDetails] = useState([]);
  const [open, setOpen] = useState(false);
  //const [gatepassType, setGatepassType] = useState(0);
  const [reportShow, setReportShow] = useState(0);
  const [image, setImage] = useState("");
  const [AssignDate, setAssignDate] = useState(null);
  const handleChangeType = (event) => {
    actions.setVehicleNo(event.target.value);
    setReportShow(0);
    debugger;
  }
    var parameters = [{"name":"TransportNo","values":[state.vehicleNo.split('/')[0]],"labels":[state.vehicleNo.split('-')[0]],"nullable":false},{"name":"AssignDate","values":[moment(AssignDate).format("YYYY/MM/DD kk:mm:ss")],"labels":[moment(AssignDate).format("YYYY/MM/DD kk:mm:ss")],"nullable":false}];
    debugger;


  function onBeforeParameterAdd(event) {
    event.parameterSettings.dateTimePickerType = "DateTime";
    if (event.parameterModel.Name === "AssignDate") {
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
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
 
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Vehicle Assign Report
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
          <Grid item alignItems="center" direction="row">
          <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Vehicle No
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={state.vehicleNo}
                onChange={handleChangeType}
                input={<OutlinedInput label="Gatepass Type" />}
              >
                {vehicleDetails.map((type, index) => (
                  <ManuI key={index} value={type.VehicleNo} >
                  {type.VehicleNo}
                </ManuI>
                ))}
              </Select>
            </FormControl>
             <Stack spacing={3}>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Assigning Date"
                style= {{marginTop: '5px'}}
                value={AssignDate}
                onChange={(newValue) => {
                    setReportShow(0);
                    setAssignDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
              style={{ margin: "7px" }}
              variant="contained"
              size="medium"
              color="primary"
              startIcon={<GiGps/>}
              onClick={() => openInNewTab('https://vts.grameenphone.com/pages/track-multiple')}>
              Live Gps tracking
            </Button>
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
             </Stack>
        </Grid>

        <div style={bounds}>
        
             {
          reportShow !=  0 ?
          <BoldReportViewerComponent
          id="reportviewer-container"
          reportServiceUrl = {'https://192.168.1.253:8080/ReportViewer1'}
          reportPath = {'~/Resources/VehicleAssignReport.rdl'} 
          parameters = {parameters}
          parameterSettings = { parameterSettings} 
          before-parameter-add={onBeforeParameterAdd}
          >

          </BoldReportViewerComponent> : null

             }
        
        </div> 

      </Grid>
    </Grid>
  );
}

export { VehicleAssignReport };
