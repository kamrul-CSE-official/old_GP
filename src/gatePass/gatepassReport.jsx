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
  Autocomplete,
  Modal,
  Button,
  createFilterOptions
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
//Data-Visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
//Reports react base
import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';

function GatepassReport() {
  const bounds = { height: '800px', width: '100%'};
  const user = accountService.userValue;
  const { state, actions } = useOvermind();
  var parameters = [];
  var obj = {"GatePassTypeID" : 0,"TypeName": "ALL" }
  useEffect(() => {
    commonService.GetGatePassType().then((x) => {
      actions.loadGatePass(x);
      state.AllGatePass.splice(0, obj);
      actions.loadGatePass(state.AllGatePass);
      debugger;
      
      
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
    if (InTime != null && OutTime != null) {
        setReportShow(1);
      debugger;
    }
  };
  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });
  const handleChangeDepartment = (event) => {
    actions.setCostCenter(event.target.value);
    commonService.GetSubCostCenter(state.costCenter).then((x) => {
      debugger;
      actions.loadSubCostCenter(x);
    });
  };
  const handleEmpChange = (event, value) => {
    actions.setEmpName(value.EmpName);
    actions.setEmpID(value.EmpID);
    setReportShow(0);
  };
  const handleChangeTypeSection = (event) => {
    actions.setSubCostCenter(event.target.value);
    commonService.GetAllEmp(state.SubCostCenterID,0).then((x) => {
      actions.loadAllEmp(x);
      actions.setEmpName(0);
    actions.setEmpID(0);
    });
    debugger;
    setReportShow(0);
  } 
  const classes = useStyles();
  const [entryState, setEntryState] = useState(0);
  const [open, setOpen] = useState(false);
  //const [gatepassType, setGatepassType] = useState(0);
  const [reportShow, setReportShow] = useState(0);
  const [image, setImage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [InTime, setInTime] = useState(null);
  const [OutTime, setOutTime] = useState(null);
  const [openD, setOpenD] = useState(false);
  const handleChangeType = (event) => {
    actions.setGatePassType(event.target.value);
    setReportShow(0);
    commonService.GetCostCenter().then((x) => {
      actions.loadCostCenter(x);
      
    });
    debugger;
  }
  if(state.gatePassType == 0){
    var parameters = [{"name":"GatepassTypeID","values":[0],"labels":[0],"nullable":false},{"name":"InTime","values":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"labels":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"nullable":false},{"name":"OutTime","values":[moment(OutTime).format("YYYY/MM/DD kk:mm:ss")]}];
      debugger;
  }else if(state.subCostCenter == 0)
  {
    var parameters = [{"name":"GatepassTypeID","values":[state.gatePassType],"labels":[state.gatePassType],"nullable":false},{"name":"InTime","values":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"labels":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"nullable":false},{"name":"OutTime","values":[moment(OutTime).format("YYYY/MM/DD kk:mm:ss")]},{"name":"Section","values":[0],"labels":[0],"nullable":false},{"name":"EmpID","values":[0],"labels":[0],"nullable":false}];
  }else if(state.requestEmpID == 0){
    var parameters = [{"name":"GatepassTypeID","values":[state.gatePassType],"labels":[state.gatePassType],"nullable":false},{"name":"InTime","values":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"labels":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"nullable":false},{"name":"OutTime","values":[moment(OutTime).format("YYYY/MM/DD kk:mm:ss")]},{"name":"Section","values":[state.subCostCenter],"labels":[state.subCostCenter],"nullable":false},{"name":"EmpID","values":[0],"labels":[0],"nullable":false}];
  }
  
  else{

    var parameters = [{"name":"GatepassTypeID","values":[state.gatePassType],"labels":[state.gatePassType],"nullable":false},{"name":"InTime","values":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"labels":[moment(InTime).format("YYYY/MM/DD kk:mm:ss")],"nullable":false},{"name":"OutTime","values":[moment(OutTime).format("YYYY/MM/DD kk:mm:ss")]},{"name":"Section","values":[state.subCostCenter],"labels":[state.subCostCenter],"nullable":false},{"name":"EmpID","values":[state.requestEmpID],"labels":[state.requestEmpID],"nullable":false}];
    debugger;
  }

  function onBeforeParameterAdd(event) {
    event.parameterSettings.dateTimePickerType = "DateTime";
    if (event.parameterModel.Name === "InTime") {
      event.parameterSettings.dateTimeFormat = "yyyy/MM/dd h:mm tt";
      event.parameterSettings.timeDisplayFormat = "HH:mm";
      event.parameterSettings.timeInterval = 60;
    }
    if (event.parameterModel.Name === "OutTime") {
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
          Gate Pass Report
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
          <FormControl sx={{ m: 1, width: 300,marginLeft:10 }}>
              <InputLabel id="demo-multiple-name-label">
                Gatepass Type
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={state.gatePassType}
                onChange={handleChangeType}
                input={<OutlinedInput label="Gatepass Type" />}
              >
                {state.AllGatePass.map((type, index) => (
                  <ManuI key={index} value={type.GatePassTypeID}>
                    {type.TypeName}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
            <div style={{marginTop:5}}>
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
            </div>
          </Grid>
         
          <Grid alignItems="center" direction="row">
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="demo-multiple-name-label">Department</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={state.costCenter}
                onChange={handleChangeDepartment}
                input={<OutlinedInput label="Gatepass Type" />}
              >
                {state.AllCostCenter.map((type, index) => (
                  <ManuI key={index} value={type.CostCenterID}>
                    {type.CostCenter}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="demo-multiple-name-label">Section</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                defaultValue={state.AllSubCostCenter[0]}
                value={state.subCostCenter}
                onChange={handleChangeTypeSection}
                input={<OutlinedInput label="Section" />}
              >
                {state.AllSubCostCenter.map((type, index) => (
                  <ManuI key={index} value={type.SubCostCenterID}>
                    {type.SubCostCenter}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
            <Autocomplete
               sx={{ m: 1, width: 300 }}
               open={openD}
               onOpen={() => {
                 if (inputValue) {
                   setOpenD(true);
                 }
               }}
               onClose={() => setOpenD(false)}
               inputValue={inputValue}
               onChange={handleEmpChange}
               onInputChange={(e, value, reason) => {
                 setInputValue(value);
                 if (!value) {
                   setOpenD(false);
                 }
               }}
               filterOptions={filterOptions}
               options={state.AllEmp}
               getOptionLabel={(option) => option.EmpName}
               style={{ width: 300 }}
               renderInput={(params) => (
                 <TextField
                   {...params}
                   label="Requested Employee"
                   variant="outlined"
                 />
               )}
             />
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
        
             {
          reportShow !=  0 ?
          <BoldReportViewerComponent
          id="reportviewer-container"
          reportServiceUrl = {'https://192.168.1.253:8080/ReportViewer'}
          reportPath = {'~/Resources/GatepassStatus1.rdl'} 
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

export { GatepassReport };
