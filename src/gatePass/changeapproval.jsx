import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { commonService, alertService, accountService } from "../_services";
import { MdApproval} from "react-icons/all";
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
import { DataGrid } from "@mui/x-data-grid";
function Change_Approval() {
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
  const [RequestDetails, setRequestDetails] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  useEffect(() => {
    commonService.GetReqDetailsForChangeApp(user.empID).then((x) => {
        setRequestDetails(x); 
    });
  }, []);
  var FinalList = [];
  var finalObject = {};
  const handleRequestUpdate = () => {
    FinalList = [];
    finalObject = {};
    for (var i = 0; i < selectedRows.length; i++) {
      finalObject = {};
     if(selectedRows[i].FirstApp != null || selectedRows[i].SecApp != null){
      finalObject["FirstApp"] = selectedRows[i].FirstApp;
      finalObject["SecApp"] = selectedRows[i].SecApp;
      finalObject["FirstGatePassApprovalID"] = selectedRows[i].FirstGatePassApprovalID;
      finalObject["SecondGatePassApprovalID"] = selectedRows[i].SecondGatePassApprovalID;
      FinalList.push(finalObject);
      debugger;
     }
    }
    debugger;
    commonService.UpdateReqDetailsForAuth(FinalList).then((x) => {
      debugger;
      alertService.clear();
      alertService.success(x);
      window.location.reload(true);
    });
    
  };
  const handleChangeFirstApp = (event,appID,ReqDelId) => {
    RequestDetails.forEach((item) => {
        debugger;
        if (item.GatePassReqDetailID === ReqDelId && item.FirstGatePassApprovalID === appID) {
          Object.assign(item, {FirstApp: event.target.value});
          setRequestDetails(RequestDetails);
          debugger;
        }
      });
  };
  const handleChangeSecondApp = (event,appID,ReqDelId) => {
    RequestDetails.forEach((item) => {
    if (item.GatePassReqDetailID === ReqDelId && item.SecondGatePassApprovalID === appID) {
        debugger;
        Object.assign(item, {SecApp: event.target.value});
        setRequestDetails(RequestDetails);
        debugger;
      }
    });
  };
  const columns = [
    {
      field: "GatePassReqDetailID",
      headerName: "ID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
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
        field: "Name",
        headerName: "Requested For",
        width: 300,
        editable: false,
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
      },
    {
      field: "DepartmentAndSection",
      headerName: "Section",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "Status",
      headerName: "Status",
      width: 200,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "FirstApp",
      headerName: "First Approval",
      width: 370,
      editable: false,
      renderCell: (item) => {
        return (

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <FormControl sx={{ width: 400, height: 50, marginTop: "3px" }}>
              <InputLabel sx={{ height: 50 }} id="demo-multiple-name-label">
              First Approval
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={item.row.FirstApp}
                disabled={item.row.GatePassStatusID == 1 ? false : true }
                sx={{ height: 40, width: 350, fontSize: 12 }}
                onChange={(e) => {
                    handleChangeFirstApp(e,item.row.FirstGatePassApprovalID,item.row.GatePassReqDetailID)
                }}
                input={<OutlinedInput label="First Approval" />}
              >
                {item.row.FirstApprovalEmpList.map((type, index) => (
                  <ManuI key={index} value={type.SubCostRequisitionApprovalID} style={{ fontSize: 12 }}>
                    {type.Name}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
          </div>

        );
      },
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "SecApp",
      headerName: "Second Approval",
      width: 370,
      renderCell: (item) => {
        return (

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <FormControl sx={{ width: 400, height: 50, marginTop: "3px" }}>
              <InputLabel sx={{ height: 50 }} id="demo-multiple-name-label">
              Second Approval
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={item.row.SecApp}
                disabled={item.row.GatePassStatusID == 1 || item.row.GatePassStatusID == 2 ? false : true }
                sx={{ height: 40, width: 350, fontSize: 12 }}
                onChange={(e) => {
                    handleChangeSecondApp(e,item.row.SecondGatePassApprovalID,item.row.GatePassReqDetailID)
                }}
                input={<OutlinedInput label="Second Approval" />}
              >
                {item.row.SecondApprovalEmpList.map((type, index) => (
                  <ManuI key={index} value={type.SubCostRequisitionApprovalID} style={{ fontSize: 12 }}>
                    {type.Name}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
          </div>

        );
      },
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
        field: "FirstGatePassApprovalID",
        headerName: "First Approval ID",
        width: 100,
        editable: false,
        hide : true,
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
    },
    {
        field: "SecondGatePassApprovalID",
        headerName: "Second Approval ID",
        width: 100,
        editable: false,
        hide : true,
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
    },
    {
      field: "GatePassType",
      headerName: "Gatepass Type",
      editable: false,
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "GatePassStatusID",
      headerName: "Gatepass Type ID",
      editable: false,
      hide:true,
      width: 10,
    },
  ];
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Change Approval Authority
        </Typography>
      </Paper>
      <Grid container>
        <div
          style={{
            height: 600,
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
            disableSelectionOnClick
            checkboxSelection
            rows={RequestDetails}
            onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = RequestDetails.filter((row) =>
              
                  selectedIDs.has(row.GatePassReqDetailID)
                );
                
                setSelectedRows(selectedRows);
                
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
          Update
        </Button>
      </Grid>
    </Grid>
  );
}

export {Change_Approval};
