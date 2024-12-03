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
  OutlinedInput,
  TextField
} from "@mui/material";
import { useOvermind } from "../other/OvermindHelper";
import { number } from "prop-types";
import {accountService} from "../_services"
function GoodsDeliveryAOD() {

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
  const [companyDetails, setCompanyDetails] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [vehicleDetails, loadVehiclesForDelivery] = useState([]);
  var FinalList = [];
  var finalObject = {};
  const handleGenerateAODGatePass = () => {
    FinalList = [];
    finalObject = {};
    for (var i = 0; i < selectedRows.length; i++) {
      finalObject = {};
      debugger
     if(state.EntryID != 0 && state.CompanyCode != 0){
        
      finalObject["EntryID"] = state.EntryID;
      finalObject["AODNo"] = selectedRows[i].AODNo;
      finalObject["DriverName"] = state.DriverName;
      finalObject["EnteredBy"] = user.empID;
      FinalList.push(finalObject);
     }
     else{
       debugger;
        return null;
     }
      
    }
    if(FinalList.length > 0){
        commonService.GenerateGatePassForAOD(FinalList).then((x) => {
            debugger;
            alertService.clear();
            alertService.success(x);
            window.location.reload(true);
        });
    }
    else{
        alertService.warn("You haven't Selected Vehicle or Company!!!")
        return null;
    }
  

  };

  const handleDriverName = (event) => {
    actions.setDriverName(event.target.value);
  };

  const handleChangeVehicle = (event) => {
    actions.setEntryID(event.target.value);
  }

  const handleChangeCompany = (event) => {
    actions.setCompanyCode(event.target.value);
    commonService.GetCompanyAODForDelivery(state.CompanyCode).then((x) => {
      debugger
      setCompanyDetails(x);
    });
  }
  


  useEffect(() => {
    commonService.GetAllCompany().then((x) => {
        debugger
      actions.loadAllCompany(x);
    });

    commonService.GetVehiclesForGoodsDelivery().then((x) => {
        loadVehiclesForDelivery(x);
    });
    
  }, []);

  
  const columns = [
    {
      field: "CustomerCode",
      headerName: "CustomerCode",
      width: 20,
      hide: true,
      type: "text",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "AODNo",
      headerName: "AOD No",
      width: 100,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",    
      width: 200,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
        field: "AODDate",
        headerName: "AOD Date",
        type: "dateTime",  
        valueGetter: ({ value })=> 
        value && new Date(value),      
        width: 200,
        editable: false,
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header'
      },
      {
        field: "InvoiceNo",
        headerName: "Invoice No",      
        width: 200,
        editable: false,
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header'
      },
      {
        field: "PONo",
        headerName: "PO No",   
        width: 200,
        editable: false,
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header'
      }
  
  ];

  return (
    <Grid container direction="column" spacing={1}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Goods Delivery AOD
        </Typography>
      </Paper>
      <Grid item alignItems="center" direction="row">
        
      <FormControl sx={{ width: "33%" }} >
              <InputLabel id="demo-multiple-name-label">
                Company
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChangeCompany}
                input={<OutlinedInput label="Company Name" />}
              >
                {state.AllCompanyName.map((type, index) => (
                  <ManuI key={index} value={type.CompanyCode}>
                    {type.CompanyName}
                  </ManuI>
                ))}
              </Select>
                         
            </FormControl>
            <FormControl sx={{ width: "33%" }}>
            <InputLabel id="demo-multiple-name1-label">
                Vehicle
              </InputLabel>
              <Select
                labelId="demo-multiple-name1-label"
                id="demo-multiple-name1"
                input={<OutlinedInput label="Vehicle No" />}
                onChange={handleChangeVehicle}
              >
                {vehicleDetails.map((type, index) => (
                  <ManuI key={index} value={type.EntryID}>
                    {type.VehicleName}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "33%" }}>
            <TextField
              id="outlined-basic"
              multiline
              rows={1}
              label="Driver Name"
              variant="outlined"
              onChange={handleDriverName} 
              />  
            </FormControl>

      </Grid>

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
            
            getRowId={(row) => row.AODNo}
            columns={columns}
            rows={companyDetails}
            disableSelectionOnClick
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = companyDetails.filter((row) =>
            
                selectedIDs.has(row.AODNo)
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
            handleGenerateAODGatePass();
          }}
        >
          Generate
        </Button>

      </Grid>
    </Grid>
  );
}

export { GoodsDeliveryAOD };