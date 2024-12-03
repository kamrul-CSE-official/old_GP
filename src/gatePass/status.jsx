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
import { DataGrid } from "@mui/x-data-grid";
function Status() {
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
  useEffect(() => {
    commonService.GetGatePassStatus(user.empID).then((x) => {
      setstatus(x);
      
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
      field: "RequestedFor",
      headerName: "Requested For",
      width: 300,
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
      headerName: "First Approval Status",
      width: 420,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "SecApp",
      headerName: "Second Approval Status",
      width: 420,
      editable: false,
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
      field: "RequestDetail",
      headerName: "Remarks",
      editable: false,
      width: 450,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "GatePassStatusID",
      headerName: "Gatepass Type",
      editable: false,
      hide:true,
      width: 10,
    },
  ];
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Status Check
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
            rows={status}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export { Status };
