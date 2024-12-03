import React, { useEffect, useState, useStyles } from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { commonService, alertService } from "@/_services";
import { GrEject, MdApproval} from "react-icons/all";
import { useOvermind } from "../other/OvermindHelper";
import { action,status } from "overmind";

import {
  Grid,
  MenuItem as ManuI,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Button,
  TextField,
} from "@mui/material";
import { accountService } from "../_services";


function DriverAllowcation() {
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
  const [vehicleDetails, setvehicleDetails] = useState([]);
  var FinalList = [];
  var finalObject = {};

  // Added By Mehedee
  const handleRejectRemarks = (event) => {
    actions.setVehicleRejectRemarks(event.target.value);
  };

  const handleRequestReject = () => {
    FinalList = [];
    finalObject = {};
    for (var i = 0; i < selectedRows.length; i++) {
      finalObject = {};
      debugger
      if(selectedRows[i].GatePassReqDetailID != null && state.vehicleRemarks != "")
      {
        finalObject["GatePassReqDetailID"] = selectedRows[i].GatePassReqDetailID;
        finalObject["Remarks"] = state.vehicleRemarks;
        finalObject["EnteredBy"] = user.empID;
        FinalList.push(finalObject);
        debugger
        commonService.RejectTransportAllocation(FinalList).then((x) => {
          debugger;
          alertService.clear();
          alertService.success(x);
          window.location.reload(true);
        });

      }
      else{
        alertService.warn("Please Enter Rejection Remark !!!")
      }
    }
  }
  //end Added



  const handleRequestUpdate = () => {
    FinalList = [];
    finalObject = {};
    for (var i = 0; i < selectedRows.length; i++) {
      finalObject = {};
      if(selectedRows[i].TransportNo != null)
      {
        finalObject["GatePassReqDetailID"] = selectedRows[i].GatePassReqDetailID;
        finalObject["TransportNo"] = selectedRows[i].TransportNo;
        //Added By Mehedee
        finalObject["Remarks"] = state.vehicleRemarks;
        finalObject["EnteredBy"] = user.empID;
        FinalList.push(finalObject);
      }
    }
    commonService.UpdateTransportNo(FinalList).then((x) => {
      debugger;
      alertService.clear();
      alertService.success(x);
      window.location.reload(true);
    });
    
  };
  const handleChangeTransport = (event, id) => {
    gatepassDetails.forEach((item) => {
      debugger;
      if (item.GatePassReqDetailID === id) {
        Object.assign(item, {TransportNo: event.target.value});
        setgatepassDetails(gatepassDetails);
        debugger;
      } else if (item.GatePassReqDetailID == null) {
        debugger;
        Object.assign(item, {TransportNo: null});
        setgatepassDetails(gatepassDetails);
      }
    });

    debugger;
  };
  useEffect(() => {
    commonService.GetGatePassForTransportNo().then((x) => { 
      setgatepassDetails(x);
      commonService.GetAllVehicleDetails().then((x) => {
        setvehicleDetails(x);

    });
    });
  }, []);
  const columns = [
    {
      field: "GatePassReqDetailID",
      headerName: "ID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "ReqCode",
      headerName: "Request Code",
      width: 100,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "DepartmentAndSection",
      headerName: "Department & Section",
      width: 200,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "GatePassType",
      headerName: "Gatepass Type",
      editable: false,
      hide: true,
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "GatePassReqHeaderID",
      headerName: "GatePassReqHeaderID",
      editable: false,
      hide: true,
      type: "number",
      width: 10,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    
    {
      field: "TransportNo",
      headerName: "Transport NO",
      width: 200,
      editable: true,
      renderCell: (item) => {
        debugger;
        return (

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <FormControl sx={{ width: 400, height: 50, marginTop: "3px" }}>
              <InputLabel sx={{ height: 50 }} id="demo-multiple-name-label">
                Vehicle No
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={item.row.TransportNo}
                sx={{ height: 40, width: 220, fontSize: 9 }}
                onChange={(e) => {
                handleChangeTransport(e, item.row.GatePassReqDetailID);
                }}
                input={<OutlinedInput label="VehicleNo" />}
              >
                {vehicleDetails.map((type, index) => (
                  <ManuI key={index} value={type.VehicleNo} style={{ fontSize: 9 }}>
                    {/* {type.VehicleNo} */}
                    {type.VehicleAndDriver}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
          </div>

        );
      },
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "Name",
      headerName: "Request By-Destination-Remarks",
      width: 550,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    }
  ];
  return (
    <Grid container direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
         Transport Allowcation
        </Typography>
      </Paper>
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
            columns={columns}
            rows={gatepassDetails}
            disableSelectionOnClick
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = gatepassDetails.filter((row) =>
            
                selectedIDs.has(row.GatePassReqDetailID)
              );
              
              setSelectedRows(selectedRows);
              
            }}
          />
        </div>
      </Grid>
      <Grid container justifyContent="flex-end" style={{ marginTop: "15px" }}>

        {/* Added By Mehedee to Reject Transport Allocation */}
        <TextField
              sx={{ m: 1, width: "60%",marginLeft:6 }}
              id="outlined-basic"
              multiline
              rows={2}
              onChange={handleRejectRemarks}
              label="Remarks For Approval or Rejection"
            variant="outlined" />
        <Button
          style={{ margin: "7px", height: "70%" }}
          variant="contained"
          size="medium"
          color="primary"
          rows = {1}
          startIcon={<MdApproval />}

          onClick={() => {
            handleRequestUpdate();
          }}
        >
          Approved
        </Button>

     

        

        <Button
          style={{ margin: "7px" , height: "70%"}}
          variant="contained"
          size="medium"
          color="error"
          rows = {1}
          startIcon={<GrEject />}
          onClick={() => {
            handleRequestReject();
          }}
        >
          Reject
        </Button>
        
      </Grid>
    </Grid>
  );
}

export { DriverAllowcation };
