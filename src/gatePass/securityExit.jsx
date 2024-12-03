import React, { useEffect, useState, useStyles } from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { commonService, alertService } from "@/_services";
import { MdApproval} from "react-icons/all";
import { GrEject } from "react-icons/all";
import {
  Grid,
  MenuItem as ManuI,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput 
} from "@mui/material";
import { useOvermind } from "../other/OvermindHelper";
import { number } from "prop-types";
import {accountService} from "../_services"
function SecurityExit() {

  const user = accountService.userValue;

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
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "middle",
      boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "25px",
      color: "gray",
    },
  }));
  const classes = useStyles();
  const { state, actions } = useOvermind();
  const [gatepassDetails, setgatepassDetails] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  var FinalList = [];
  var finalObject = {};
  const handleRequestUpdate = () => {
    FinalList = [];
    finalObject = {};
    let z = 0;
    for (var i = 0; i < selectedRows.length; i++) {
      finalObject = {};
     if(selectedRows[i].OutM != 0 || selectedRows[i].InM != 0 && selectedRows[i].GatePassTypeID == 5){
      finalObject["GatePassReqDetailID"] = selectedRows[i].GatePassReqDetailID;
      finalObject["OutM"] = selectedRows[i].OutM;
      finalObject["InM"] = selectedRows[i].InM;
      FinalList.push(finalObject);
      debugger;
     }else if(selectedRows[i].GatePassTypeID != 5 && selectedRows[i].OutM == 0 && selectedRows[i].InM == 0) {
      finalObject["GatePassReqDetailID"] = selectedRows[i].GatePassReqDetailID;
      FinalList.push(finalObject);
      debugger;
     }
     //Added By mehedee
     else if(selectedRows[i].GatePassTypeID == 3){
      debugger
      finalObject["GatePassReqDetailID"] = selectedRows[i].GatePassReqDetailID;
      finalObject["ReceivedQuantity"] = selectedRows[i].ReceivedQuantity;
      finalObject["GatePassTypeID"] = selectedRows[i].GatePassTypeID;

      finalObject["EnteredBy"] = user.empID;

      FinalList.push(finalObject);
      debugger
      if(selectedRows[i].ReceivedQuantity > selectedRows[i].Quantity){
        z++;
      }
     }
     //
     else{
       debugger;
        return null;
     }
      
    }
    debugger;
    if(z > 0){
      alertService.warn("Recieved Quantity can not be Greater than Remaining Quantity");
    }else{
      commonService.UpdateStatusForSecuity(FinalList).then((x) => {
        debugger;
        alertService.clear();
        alertService.success(x);
        window.location.reload(true);
      });
    }
    // else{
    //   return null;
    // }
    
    
  };
  const handleRowEditCommit = (values) => {
    debugger;


    if (values != null) {
      gatepassDetails.forEach((item) => {
        if (item.GatePassReqDetailID == values.id) {
          if (values.field == "OutM") {
            Object.assign(item, {OutM: values.value});
            setgatepassDetails(gatepassDetails);
              debugger;
            } else if (values.field == "InM") {
              alertService.clear();
              Object.assign(item, {InM: values.value});
              setgatepassDetails(gatepassDetails);
              debugger;
            }
            else if(values.field == "ReceivedQuantity"){
            debugger
              if(values.value > item.ReceivedQuantity && values.value > 0){
                alertService.warn("Recieved Quantity can not be Greater than Remaining Quantity");              

              }
              
              // alertService.clear();
              Object.assign(item, {ReceivedQuantity : values.value});
              setgatepassDetails(gatepassDetails);
              
              
            }
            
          } 
      });
    }

  }

  useEffect(() => {
    commonService.GetGatePassType().then((x) => {
      actions.loadGatePass(x);
    });
    
  }, []);
  const handleChangeType = (event) => {
    actions.setGatePassType(event.target.value);
    commonService.GetGatePassStatusForSecurityChk(state.gatePassType).then((x) => {
      debugger
      setgatepassDetails(x);
    });
  }
  
  const columns = [
    {
      field: "GatePassReqDetailID",
      headerName: "ID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "ReqCode",
      headerName: "Request Code",
      width: 100,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "InTime",
      headerName: "InTime",
      type: "dateTime",
      valueGetter: ({ value })=> 
          value && new Date(value), 
        
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "OutTime",
      headerName: "OutTime",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value), 
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },


    {
      field: "DepartmentAndSection",
      headerName: "Dpt&Sec",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassType",
      headerName: "Gatepass Type",
      editable: false,
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassTypeID",
      headerName: "Gatepass Type ID",
      editable: false,
      hide: true,
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassReqHeaderID",
      headerName: "GatePassReqHeaderID",
      editable: false,
      hide: true,
      type: "number",
      width: 10,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    
    {
      field: "Name",
      headerName: "Name/Item",
      width: 400,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    
    
    
  ];


  const columnsForReturnable = [
    {
      field: "GatePassReqDetailID",
      headerName: "ID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "ReqCode",
      headerName: "Request Code",
      width: 100,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "InTime",
      headerName: "InTime",
      type: "dateTime",
      valueGetter: ({ value })=> 
          value && new Date(value), 
        
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "OutTime",
      headerName: "OutTime",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value), 
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "ReceivedQuantity",
      headerName: "Received Quantity",
      width: 150,
      editable: true,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },

    {
      field: "Quantity",
      headerName: "Request Quantity",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },

    {
      field: "DepartmentAndSection",
      headerName: "Dpt&Sec",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassType",
      headerName: "Gatepass Type",
      editable: false,
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassTypeID",
      headerName: "Gatepass Type ID",
      editable: false,
      hide: true,
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassReqHeaderID",
      headerName: "GatePassReqHeaderID",
      editable: false,
      hide: true,
      type: "number",
      width: 10,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    
    {
      field: "Name",
      headerName: "Name/Item",
      width: 400,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    
    
    
  ];

  const columnsForTransport = [
    {
      field: "GatePassReqDetailID",
      headerName: "ID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "ReqCode",
      headerName: "Request Code",
      width: 100,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "InTime",
      headerName: "InTime",
      type: "dateTime",
      valueGetter: ({ value })=> 
          value && new Date(value), 
        
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "OutTime",
      headerName: "OutTime",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value), 
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },

    
    {
      field: "OutM",
      headerName: "OutMR",
      width: 80,
      editable: true,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "InM",
      headerName: "InMR",
      width: 80,
      editable: true,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "TransportNo",
      headerName: "Transport",
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "DepartmentAndSection",
      headerName: "Dpt&Sec",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassType",
      headerName: "Gatepass Type",
      editable: false,
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassTypeID",
      headerName: "Gatepass Type ID",
      editable: false,
      hide: true,
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatePassReqHeaderID",
      headerName: "GatePassReqHeaderID",
      editable: false,
      hide: true,
      type: "number",
      width: 10,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    
    {
      field: "Name",
      headerName: "Name/Item",
      width: 400,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    }
    
  ];
  return (
    <Grid container direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Security Exit
        </Typography>
      </Paper>

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
      <Grid container>
        <div
          style={{
            height: 400,
            width: "100%",
            marginTop: "30px",
            marginLeft: "30px",
          }}
        >
          <DataGrid
            sx={{
              m: 2,
              boxShadow: 2,
              border: 2,
              fontSize: "14px",
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              '& .super-app-theme--cell': {
                fontWeight: '600',
                flex: 1,
                fontSize: '11px'
              },
              '& .super-app-theme--header': {
                backgroundColor: 'rgba(63, 195, 128, 1)',
                fontWeight: '900',
                flex: 1,
                fontSize: '12px'
              },
            }}
            
            getRowId={(row) => row.GatePassReqDetailID}
            columns={
              state.gatePassType == 5 ? columnsForTransport
              : state.gatePassType == 3 ? columnsForReturnable
              :columns
            }
            // columnVisibilityModel = {state.gatePassType ==3}
            rows={gatepassDetails}
            disableSelectionOnClick
            checkboxSelection
            onCellEditCommit={handleRowEditCommit}
            isCellEditable={(params) => params.row.GatePassTypeID == 5 && params.row.TransportNo != null || params.row.GatePassTypeID == 3}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = gatepassDetails.filter((row) =>
            
                selectedIDs.has(row.GatePassReqDetailID)
              );
              
              setSelectedRows(selectedRows);
              
            }}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </Grid>
      <Grid container justifyContent="flex-end" style={{ marginTop: "15px" }}>
        <Button
          style={{ margin: "7px" }}
          variant="contained"
          size="medium"
          color="primary"
          startIcon={<MdApproval />}
          onClick={() => {
            handleRequestUpdate();
          }}
        >
          Approved
        </Button>

        {/* <Button
          style={{ margin: "7px" , height: "70%"}}
          variant="contained"
          size="medium"
          color="error"
          startIcon = {<GrEject/>}
          rows = {1}

        >
          Reject
        </Button> */}
      </Grid>
    </Grid>
  );
}

export { SecurityExit };