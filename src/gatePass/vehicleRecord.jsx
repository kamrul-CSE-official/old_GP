import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
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
    Checkbox,
    Button,
    Box,
    FormControlLabel,
} from "@mui/material";
import { useOvermind } from "../other/OvermindHelper";
import { commonService, alertService, accountService } from "@/_services";
import {
    AiOutlineSave
  } from "react-icons/all";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
function VehicleRecord() {
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
            marginLeft: '30px',
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
    const [checked, setChecked] = useState(false);
    const [vehicleNo, setvehicleNo] = useState("");
    const [remarks, setRemarks] = useState("");
    const [vehicleDetails, setvehicleDetails] = useState([]);
    const { state, actions } = useOvermind();
    const handleVehicleNoChange = (event) => {
        setvehicleNo(event.target.value);
    };
    const handleRemarks = (event) => {
        setRemarks(event.target.value);
        debugger;
    };
    const handleChange = (event) => {
        setChecked(event.target.checked);
        debugger;
    };
    const handleChangeDriver = (event) => {
        actions.setDriverForTransportRecord(event.target.value);
    };
    const handleChangeVehicleType = (event) => {
        actions.setVehicleType(event.target.value);
    };
    const handleClearall = () => {
        actions.setDriver(0);
        actions.setVehicleType(0);
        setvehicleNo("")
        setChecked(false);
        setRemarks("");
    };
    const saveVehicleData = () => {
        debugger;
       commonService.saveVehicleDetails(vehicleNo,state.DriverID,state.TransportType,checked,remarks).then((x)=>{
        alertService.clear();
        alertService.success(x);
        handleClearall();
        commonService.GetAllVehicleDetailsWithoutTrip().then((x) => {
                    setvehicleDetails(x);
    
                });
       });
    };
    
    useEffect(() => {
        commonService.GetAllDriver().then((x) => {
            actions.loadDriver(x);
            commonService.GetAllVehicleType().then((x) => {
                actions.loadVehicleType(x);
                commonService.GetAllVehicleDetailsWithoutTrip().then((x) => {
                    setvehicleDetails(x);
    
                });
            });
        });
    }, []);
    const columns = [
        {
          field: "VehicleID",
          headerName: "ID",
          width: 20,
          hide: true,
          type: "number",
          editable: false,
        },
        {
          field: "VehicleNo",
          headerName: "Vehicle No",
          width: 250,
          editable: false,
          cellClassName: 'super-app-theme--cell',
          headerClassName: 'super-app-theme--header',
        },
        {
          field: "DriverName",
          headerName: "Driver Name",
          width: 200,
          editable: false,
          cellClassName: 'super-app-theme--cell',
          headerClassName: 'super-app-theme--header',
        },
        {
          field: "VehicleTypeName",
          headerName: "Vehicle Type",
          editable: false,
          width: 150,
          cellClassName: 'super-app-theme--cell',
          headerClassName: 'super-app-theme--header',
        },
        {
            field: "Active",
            headerName: "Active",
            editable: false,
            width: 80,

            cellClassName: 'super-app-theme--cell',
          headerClassName: 'super-app-theme--header',
        },
        {
          field: "Remarks",
          headerName: "Remarks",
          editable: false,
          width: 450,
          flex:1,
          cellClassName: 'super-app-theme--cell',
          headerClassName: 'super-app-theme--header',
        },
       
      ];
    return (
        <Grid container direction="column" spacing={2}>
            <Paper className={classes.paper}>
                <Typography variant="body2" color="textPrimary" component="span">
                    Vehicle Record
                </Typography>
            </Paper>
            <Paper style={{ marginTop: "50px", marginLeft: "60px" }}>
                <Grid container alignItems="center" direction="column">
                    <Grid container item alignItems="center" direction="row">
                        <TextField
                            sx={{ m: 1, width: 300 }}
                            id="outlined-basic"
                            label="Transport No"
                            onChange={handleVehicleNoChange}
                            variant="outlined"
                        />
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">Driver Name</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={state.DriverID}
                                onChange={handleChangeDriver}
                                input={<OutlinedInput label="Driver Name" />}
                            >
                                {state.AllDriver.map((type, index) => (
                                    <ManuI key={index} value={type.DriverGroupID}>
                                        {type.DriverName}
                                    </ManuI>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">Vehicle Type</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={state.TransportType}
                                onChange={handleChangeVehicleType}
                                input={<OutlinedInput label="Vehicle Type" />}
                            >
                                {state.AllVehicleType.map((type, index) => (
                                    <ManuI key={index} value={type.vehicleID}>
                                        {type.vehicleType}
                                    </ManuI>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ m: 1, width: 300 }}
                            id="outlined-basic"
                            label="Remarks"
                            onChange={handleRemarks}
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={checked}
                                    onChange={handleChange} name="IsActive" />
                            }
                            label="IsActive"
                        />
                        <Button
                            style={{ margin: "7px" }}
                            variant="contained"
                            size="medium"
                            color="warning"
                            startIcon={<AiOutlineSave />}
                            onClick={() => {
                                saveVehicleData();
                            }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper style={{ marginTop: "50px", marginLeft: "60px" }}>
            <DataGrid
            sx={{
              m: 2,
              boxShadow: 2,
              border: 2,
              minHeight:400,
              minWidth: 600,
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
            getRowId={(row) => row.VehicleID}
            columns={columns}
            rows={vehicleDetails}
          />
            </Paper>
        </Grid>
    );
}

export { VehicleRecord };
