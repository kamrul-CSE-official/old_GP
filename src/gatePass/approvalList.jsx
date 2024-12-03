import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useOvermind } from "../other/OvermindHelper";
import { commonService, alertService, accountService } from "@/_services";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
import {
  AiFillDelete,
  MdAddCircleOutline,
  MdApproval,
  RiSave3Line,
  AiOutlineClear,
} from "react-icons/all";
function ApprovalList() {
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
  const { state, actions } = useOvermind();
  const [ApprovalType, setApprovalType] = useState(0);
  const [openD, setOpenD] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [ApprovalList, setApprovalList] = React.useState([]);
  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });
  var Approval = [
    { "ApprovalName": "First Approval", "ApprovalStatusID": 1 },
    { "ApprovalName": "Second Approval", "ApprovalStatusID": 2 }
  ]
  const classes = useStyles();
  const handleEmpChange = (event, value) => {
    actions.setEmpName(value.EmpName);
    actions.setEmpID(value.EmpID);
  };
  var FinalList = [];
  var finalObject = {};
  const handleRequestUpdate = () => {
    FinalList = [];
    finalObject = {};
    for (var i = 0; i < selectedRows.length; i++) {
      finalObject = {};
      if (selectedRows[i].SubCostRequisitionApprovalID != null) {
        finalObject["SubCostRequisitionApprovalID"] = selectedRows[i].SubCostRequisitionApprovalID;
        finalObject["IsActive"] = selectedRows[i].IsActive;
        FinalList.push(finalObject);
        debugger;
      } else {
        debugger;
        return null;
      }

    }
    debugger;
    commonService.UpdateApprovalList(FinalList).then((x) => {
      debugger;
      alertService.clear();
      alertService.success(x);
      window.location.reload(true);
    });

  };
  useEffect(() => {

    commonService.GetAllApprovalList().then((x) => {
      setApprovalList(x);
      commonService.GetAllEmp(0).then((x) => {
        actions.loadAllEmp(x);
        commonService.GetGatePassType().then((x) => {
          actions.loadGatePass(x);
          commonService.GetCostCenter().then((x) => {
            actions.loadCostCenter(x);
            commonService.GetLocation(state.company).then((x) => {
              debugger;
              actions.loadLocation(x);
            })
          })

        });
      });
    });

  }, []);

  const handleRequestSave = () => {
    if (state.company != null &&
      state.costCenter != null &&
      state.subCostCenter != null &&
      state.location != null &&
      state.requestEmpID != null &&
      state.gatePassType != null) {
      commonService.SaveSubCostCenterWiseApproval(state.subCostCenter, state.location, state.requestEmpID, ApprovalType, state.gatePassType).then((x) => {
        alertService.clear();
        alertService.success(x);
        handleClearall();

      });

    } else {
      alertService.clear();
      alertService.info("Please follow every step to make request");
    }
  }
  const handleClearall = () => {
    actions.setLocation(null);
    actions.setCostCenter(null);
    actions.setSubCostCenter(null);
    actions.setEmpName(null);
    actions.setEmpID(null);
    actions.setGatePassType(null);

  };
  const handleChangeType = (event) => {
    actions.setGatePassType(event.target.value);
  };
  const handleChangeDepartment = (event) => {
    actions.setCostCenter(event.target.value);
    commonService.GetSubCostCenter(state.costCenter).then((x) => {
      debugger;
      actions.loadSubCostCenter(x);
    })

  }
  const handleChangeTypeSection = (event) => {
    actions.setSubCostCenter(event.target.value);
  }
  const handleChangeLocation = (event) => {
    actions.setLocation(event.target.value);
  }
  const handleChangeApproval = (event) => {
    debugger;
    setApprovalType(event.target.value);
  }
  const columns = [
    {
      field: "SubCostRequisitionApprovalID",
      headerName: "ID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "SubCostCenter",
      headerName: "Section",
      width: 300,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "ApprovalStatus",
      headerName: "Approval Status",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "IsActive",
      headerName: "Active",
      width: 80,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "FULL_NAME",
      headerName: "Auth. Name",
      width: 150,
      flex: 1,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "GatepassType",
      headerName: "GatepassType",
      width: 150,
      flex: 1,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    }
    
  ]

  return (
    <Grid container direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Sectionwise Approval Authority
        </Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Grid container direction="row" >
          <FormControl sx={{ m: 1, width: 300 }}>
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
          <FormControl sx={{ m: 1, width: 300 }}>
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
          <FormControl sx={{ m: 1, width: 300 }}>
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
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Location</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={state.location}
              onChange={handleChangeLocation}
              input={<OutlinedInput label="Location" />}
            >
              {state.ALLlocation.map((type, index) => (
                <ManuI key={index} value={type.LocationID}>
                  {type.Location}
                </ManuI>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Approval Type</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={ApprovalType}
              onChange={handleChangeApproval}
              input={<OutlinedInput label="Approval" />}
            >
              {Approval.map((type, index) => (
                <ManuI key={index} value={type.ApprovalStatusID}>
                  {type.ApprovalName}
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
          <Grid container xs={12} justifyContent="flex-end">
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              size="large"
              startIcon={<RiSave3Line />}
              onClick={() => {
                handleRequestSave();
              }}
            >
              Save
            </Button>
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              size="large"
              color="warning"
              startIcon={<AiOutlineClear />}
              onClick={() => {
                handleClearall();
              }}
            >
              Clear
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
            minHeight: 400,
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
          getRowId={(row) => row.SubCostRequisitionApprovalID}
          columns={columns}
          rows={ApprovalList}
          disableSelectionOnClick
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = ApprovalList.filter((row) =>

              selectedIDs.has(row.SubCostRequisitionApprovalID)
            );

            setSelectedRows(selectedRows);

          }}
          components={{
            Toolbar: GridToolbar,
          }}
        />


      </Paper>
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
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}

export { ApprovalList };
