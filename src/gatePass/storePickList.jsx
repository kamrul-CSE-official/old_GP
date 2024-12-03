/* eslint-disable */
import React, { useEffect, useState, useStyles } from "react";
import { makeStyles } from "@mui/styles";
import generatePicklistPdf from '../_helpers/generatePicklistPdf';
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
    Stepper,
    Step,
    StepLabel,
    colors,
  } from "@mui/material";
import { useOvermind } from "../other/OvermindHelper";
import { commonService, alertService, accountService } from "@/_services";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

function StorePickList() {
  const user = accountService.userValue;
  const { state, actions } = useOvermind();

  useEffect(() => {
    commonService.GetCompanies().then((x) => {
      actions.loadCompany(x);
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
  const doc = new jsPDF()
  doc.autoTable({ html: '#my-table' })
  const classes = useStyles();
  const [openD, setOpenD] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [issuedDetails, setIssuedDetails] = React.useState([]);
  const handleChangeCompany = (event) => {
    actions.setCompany(event.target.value);
    commonService.GetReqCodeByCompany(state.company).then((x) => {
      actions.loadReqCode(x);
    });
  };
  const handleChangeReq = (event, value) => {
    actions.setReqCode(value.ReqHeaderID);
    actions.setReqCodeNo(value.ReqCode);
    debugger;
    commonService.StorePickList(state.reqCode).then((x) => {
        setIssuedDetails(x);
    });
    debugger;
  };
  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });
  const columns = [
    {
      field: "ReqDetailID",
      headerName: "ID",
      width: 50,
      type: "number",
      hide: true,
      editable: false,
    },
    {
      field: "ITEM_CODE",
      headerName: "ITEM_CODE",
      width: 80,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "ITEM_DESC",
      headerName: "ITEM DESCRIPTION",
      width: 350,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "Qty",
      headerName: "Qty",
      width: 80,
      editable: false,
      flex: 1,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "SIH",
      headerName: "SIH",
      width: 60,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
        field: "STOCK_LOCATION",
        headerName: "ITEM LOCATION",
        width: 150,
        editable: false,
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
    },

  ];
 
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Stores pick list
        </Typography>
      </Paper>
    

      <Grid container alignItems="center" direction="column">
        <Grid container item alignItems="center" direction="column">
        <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Company
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={state.company}
                        onChange={handleChangeCompany}
                        input={<OutlinedInput label="Gatepass Type" />}
                      >
                        {state.Companies.map((type, index) => (
                          <ManuI key={index} value={type.CompanyID}>
                            {type.Company}
                          </ManuI>
                        ))}
                      </Select>
                    </FormControl>
                    <Autocomplete
                      sx={{ m: 2, width: 400 }}
                      open={openD}
                      onOpen={() => {
                        if (inputValue) {
                          setOpenD(true);
                        }
                      }}
                      onClose={() => setOpenD(false)}
                      inputValue={inputValue}
                      onChange={handleChangeReq}
                      onInputChange={(e, value, reason) => {
                        setInputValue(value);
                        if (!value) {
                          setOpenD(false);
                        }
                      }}
                      filterOptions={filterOptions}
                      options={state.AllreqCode}
                      getOptionLabel={(option) => option.ReqCode}
                      style={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Requested No"
                          variant="outlined"
                        />
                      )}
                    />
            </Grid>
          </Grid>
        <div
          style={{
            height: 500,
            width: "100%",  
          }}
          className={classes.bopaper}
        >
         {issuedDetails.length === 0 ? (
        "No Data"
      ) : (
        <div
        style={{
          height: 300,
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
            borderColor: "orange",
            "& .MuiDataGrid-cell:hover": {
              color: "green",
              fontWeight: '300',
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
          getRowId={(row) => row.ReqDetailID}
          columns={columns}
          rows={issuedDetails}
          checkboxSelection
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      )}
          
        </div>
        <Grid container justifyContent="flex-end" style={{marginTop:'15px'}}>
            <Button
              style={{ margin: "7px" }}
              variant="contained"
              size="medium"
              color = "primary"
              onClick={() => {
                generatePicklistPdf(issuedDetails,state.reqCodeNo)
              }}
            >
              Download Report
              </Button>
              </Grid> 
    </Grid>
  );
}

export { StorePickList };
