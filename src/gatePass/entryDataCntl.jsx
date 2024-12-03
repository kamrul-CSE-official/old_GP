import React, { useEffect, useState, useStyles } from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { commonService, alertService } from "@/_services";
import { MdApproval} from "react-icons/all";
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
function EntryData() {
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
  const [entryDetails, setEntryDetails] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  var FinalList = [];
  var finalObject = {};
  const handleRequestUpdate = () => {
    FinalList = [];
    finalObject = {};
    for (var i = 0; i < selectedRows.length; i++) {
      finalObject = {};
      finalObject["EntryID"] = selectedRows[i].EntryID;
      FinalList.push(finalObject);
      debugger;
     }
    commonService.UpdateVisibilyOfEntryDate(FinalList).then((x) => {
      debugger;
      alertService.clear();
      alertService.success(x);
      window.location.reload(true);
    });
    
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
          } 
      });
    }

  }
  useEffect(() => {
    commonService.GetEntryDataForHide().then((x) => {
        setEntryDetails(x);
    });
    
  }, []);
  const columns = [
    {
      field: "EntryID",
      headerName: "ID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "Name",
      headerName: "Name",
      width: 100,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
        field: "Purpose",
        headerName: "Purpose",
        width: 150,
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
      field: "isActive",
      headerName: "Hide",
      editable: false,
      flex:1,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    }, 
  ];
 
  return (
    <Grid container direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Show/hide Entry Data
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
            getRowId={(row) => row.EntryID}
            columns={columns}
            rows={entryDetails}
            disableSelectionOnClick
            checkboxSelection
            onCellEditCommit={handleRowEditCommit}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = entryDetails.filter((row) =>
            
                selectedIDs.has(row.EntryID)
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
          Show/Hide
        </Button>
      </Grid>
    </Grid>
  );
}

export { EntryData };