import React, { useEffect, useState } from "react";
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
import { makeStyles } from "@mui/styles";
import {
  AiFillDelete,
  MdAddCircleOutline,
  RiSave3Line,
  AiOutlineClear,
} from "react-icons/all";
import { useOvermind } from "../other/OvermindHelper";
import { commonService, alertService, accountService } from "@/_services";
import { el } from "date-fns/locale";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
function Request() {
  var requestUserData = [];
  var requestItemData = [];
  var requestDriverData = [];
  const user = accountService.userValue;
  const { state, actions } = useOvermind();
  const [defaultvalue, setdDefaultvalue] = useState('');
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [apxValue, setApxValue] = useState("");
  const [pickValue, setPickValue] = useState("");
  const [destination, setDestination] = useState("");
  const [requestUser, setrequestUser] = useState(requestUserData);
  const [requestItem, setrequestItem] = useState(requestItemData);
  const [requestDriver, setrequestDriver] = useState(requestDriverData);
  const [subCostCenter, setSubCostCenter] = useState(0);
  var requestListData = [];
  const handleDelete = (clickedUser) => {
    setrequestUser(requestUser.filter((requestuser) => requestuser.id !== clickedUser.id));
    console.log(clickedUser.id);
  };
  const handleDeleteVehicle = (clickedUser) => {
    debugger;
    setrequestDriver(requestDriver.filter((vehicle) => vehicle.id !== clickedUser.id));
    console.log(clickedUser.id);
  };
  const handleDeleteItem = (clickedUser) => {
    debugger;
    setrequestItem(requestItem.filter((item) => item.id !== clickedUser.id));
    console.log(clickedUser.id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeTime = (newValue) => {
    setApxValue(newValue);
  }
  const handleChangePickTime = (newValue) => {
    setPickValue(newValue);
  }
  
  const handleDestination = (newValue) => {
    setDestination(newValue.target.value);
  }
  
  const handleClearall = () => {
    actions.setCompany(null);
    actions.setLocation(null);
    actions.setCostCenter(null);
    actions.setService(null);
    actions.setSubCostCenter(null);
    actions.setStore(null);
    actions.setEmpName(null);
    actions.setEmpID(null);
    actions.setFirstApproval(null);
    actions.setSecondApproval(null);
    actions.setQuantity(null);
    actions.setGatePassType(null);
    setrequestUser([]);
    setrequestItem([]);
    setrequestDriver([]);
    setApxValue("");
    setPickValue("");
    setDestination("");

  };
  const handleRequestSave = () => {


    if (state.gatePassType == 1 || state.gatePassType == 2) {
      requestListData = requestUser;
    } else if (state.gatePassType == 3 || state.gatePassType == 4) {
      requestListData = requestItem;
    } else {
      requestListData = requestDriver;
    }
    var payload = {
      objReq: {
        CompanyID: state.company,
        ServiceDepartmentID: state.service,
        CostCenterID: state.costCenter,
        SubCostCenterID: state.subCostCenter,
        LocationID: state.location,
        FirstAppUserID: state.firstApproval,
        SecAppUserID: state.secondApproval,
        GatePassTypeID: state.gatePassType,
        GatePassStatusID: 1,
        EnteredBy: user.empID,
      },
      lstReqDetail: requestListData,
    };
    if (
      state.company != null &&
      state.costCenter != null &&
      state.subCostCenter != null &&
      state.location != null &&
      state.firstApproval != null &&
      state.secondApproval != null &&
      state.gatePassType != null &&
      requestListData.length != 0
    ) {
      debugger;
      commonService.SaveRequest(payload).then((x) => {
        alertService.clear();
        alertService.success(x);
        handleClearall();
        window.location.reload();
      });
    } else {
      alertService.clear();
      alertService.info("Please follow every step to make request");
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });
  useEffect(() => {
    commonService.GetGatePassType().then((x) => {
      actions.loadGatePass(x);
    });
  }, []);
  const handleRemarks = (event) => {
    actions.setRemarks(event.target.value);
  };
  const handleChangeType = (event) => {
    actions.setGatePassType(event.target.value);
    actions.setFirstApproval(null);
    actions.setSecondApproval(null);
    setrequestItem([]);
    commonService.GetCompanies().then((x) => {
      actions.loadCompany(x);
    });
    if (state.location != null) {
      commonService
        .GetFirstApproval(1, state.subCostCenter, state.gatePassType, state.location)
        .then((x) => {
          actions.loadFirstApproval(x);
          commonService
            .GetSecondApproval(2, state.subCostCenter, state.gatePassType, state.location)
            .then((x) => {
              actions.loadSecondApproval(x);
            });
        });

    }
    debugger;
    if (
      (state.subCostCenter != [] && state.gatePassType == 3) ||
      state.gatePassType == 4
    ) {
      commonService.GetStores().then((x) => {
        actions.loadStores(x);
      });
    } else if (
      (state.subCostCenter != [] && state.gatePassType == 1) ||
      state.gatePassType == 2
    ) {
      commonService.GetAllEmp(state.subCostCenter, state.gatePassType).then((x) => {
        debugger;
        actions.loadAllEmp(x);
      });
    } else {
      commonService.GetAllEmp(state.subCostCenter, state.gatePassType).then((x) => {
        actions.loadAllEmp(x);
      });
    }
  };

  const handleAdditemToGrid = (item) => {
    debugger;
    if (state.gatePassType == 1 || state.gatePassType == 2) {
      const found = requestUser.some(el => el.EmpID === item.EmpID);
      if (!found) {
        setrequestUser([...requestUser, item]);
      } else {
        alertService.info("You Already Added this");
      }

    } else if (state.gatePassType == 5) {
      const found = requestDriver.some(el => el.EmpID === item.EmpID);
      if (!found) {
        setrequestDriver([...requestDriver, item]);
      } else {
        alertService.info("You Already Added this");
      }
    } else {
      const found = requestItem.some(el => el.ItemID === item.ItemID);
      if (!found) {
        setrequestItem([...requestItem, item]);
      } else if (el.ItemID == 0 && el.ItemDescription == '' && el.Quantity == 0) {
        alertService.info("Please reselect the store item");
      }
      else {
        alertService.info("You Already Added this");
      }

    }
  };
  const handleChangeStore = (event) => {
    actions.setStore(event.target.value);
    actions.setItem(0);
    actions.setItemName("");
    actions.setQuantity(0);
    setInputValue("");
    commonService.GetItem(state.stores).then((x) => {
      actions.loadAllItem(x);
    });
  };
  const handleItemChange = (event, value) => {
    actions.setItem(value.ItemID);
    actions.setItemName(value.ItemDescription);
  };
  const handleQuantity = (event) => {
    actions.setQuantity(event.target.value);
  };

  const handleEmpChange = (event, value) => {
    actions.setEmpName(value.EmpName);
    actions.setEmpID(value.EmpID);
  };

  const handleChangeCompany = (event) => {
    actions.setCompany(event.target.value);
    commonService.GetCostCenter().then((x) => {
      actions.loadCostCenter(x);
      commonService.GetLocation(state.company).then((x) => {
        debugger;
        actions.loadLocation(x);
        commonService.GetStores().then((x) => {
          actions.loadStores(x);
        });
      });
    });
  };
  const handleChangeDepartment = (event) => {
    actions.setCostCenter(event.target.value);
    commonService.GetSubCostCenter(state.costCenter).then((x) => {
      debugger;
      actions.loadSubCostCenter(x);
      if (state.location != null) {
        commonService
          .GetFirstApproval(1, state.subCostCenter, state.gatePassType, state.location)
          .then((x) => {
            actions.loadFirstApproval(x);
            commonService
              .GetSecondApproval(2, state.subCostCenter, state.gatePassType, state.location)
              .then((x) => {
                actions.loadSecondApproval(x);
              });
          });

      }
    });
  };
  const handleChangeTypeSection = (event) => {
    actions.setSubCostCenter(event.target.value);
    debugger;
    commonService.GetLocation(state.company).then((x) => {
      debugger;
      actions.loadLocation(x);
      commonService.GetStores().then((x) => {
        actions.loadStores(x);
      });
    });



    if (state.subCostCenter != []) {
      commonService.GetAllEmp(state.subCostCenter, state.gatePassType).then((x) => {
        debugger;
        actions.loadAllEmp(x);
        if (state.location != null) {
          commonService
            .GetFirstApproval(1, state.subCostCenter, state.gatePassType, state.location)
            .then((x) => {
              actions.loadFirstApproval(x);
              commonService
                .GetSecondApproval(2, state.subCostCenter, state.gatePassType, state.location)
                .then((x) => {
                  actions.loadSecondApproval(x);
                });
            });

        }
      });
    }
  };
  const handleChangeLocation = (event) => {
    actions.setLocation(event.target.value);
    if (state.location != null) {
      commonService
        .GetFirstApproval(1, state.subCostCenter, state.gatePassType, state.location)
        .then((x) => {
          actions.loadFirstApproval(x);
          commonService
          .GetSecondApproval(2, state.subCostCenter, state.gatePassType, state.location)
          .then((x) => {
            actions.loadSecondApproval(x);
          });
        });
    }
  };
  const handleFirstAppChange = (event) => {
    actions.setFirstApproval(event.target.value);
    if ((state.location != null)) {
      commonService
        .GetSecondApproval(2, state.subCostCenter, state.gatePassType, state.location)
        .then((x) => {
          actions.loadSecondApproval(x);
        });
    }
  };
  const handleSecondAppChange = (event) => {
    actions.setSecondApproval(event.target.value);
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 70,
      renderCell: (ItemID) => (
        <>
          <AiFillDelete
            color="red"
            style={{ height: "25px", width: "25px" }}
            onClick={() => handleDeleteItem(ItemID)}
          />
        </>
      ),
    },
    {
      field: "id",
      headerName: "No",
      headerClassName: "super-app-theme--header",
      width: 20,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "ItemID",
      headerName: "Item ID",
      headerClassName: "super-app-theme--header",
      width: 70,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "itemDescription",
      headerName: "Item Description",
      headerClassName: "super-app-theme--header",
      width: 250,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      headerClassName: "super-app-theme--header",
      width: 70,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "Remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 300,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      flex: 1
    },
  ];
  const columnsForRequest = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 70,
      renderCell: (RequestUserID) => (
        <>
          <AiFillDelete
            color="red"
            style={{ height: "25px", width: "25px" }}
            onClick={() => handleDelete(RequestUserID)}
          />
        </>
      ),
    },
    {
      field: "id",
      headerName: "No",
      headerClassName: "super-app-theme--header",
      width: 20,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "EmpID",
      headerName: "User ID",
      headerClassName: "super-app-theme--header",
      width: 80,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "RequestUserName",
      headerName: "Request User Name",
      headerClassName: "super-app-theme--header",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "Remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 250,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      flex: 1
    },
  ];

  const columnsForDriver = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 70,
      renderCell: (RequestVehicle) => (
        <>
          <AiFillDelete
            color="red"
            style={{ height: "25px", width: "25px" }}
            onClick={() => handleDeleteVehicle(RequestVehicle)}
          />
        </>
      ),
    },
    {
      field: "id",
      headerName: "No",
      headerClassName: "super-app-theme--header",
      width: 50,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "EmpID",
      headerName: "User ID",
      headerClassName: "super-app-theme--header",
      width: 80,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "RequestUserName",
      headerName: "Request User Name",
      headerClassName: "super-app-theme--header",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "ApxTime",
      headerName: "Apx. Return",
      headerClassName: "super-app-theme--header",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "PickupTime",
      headerName: "PickupTime",
      headerClassName: "super-app-theme--header",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "Destination",
      headerName: "Destination",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "Remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 250,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
  ];
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
      minHeight: "560px",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "middle",
      boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "25px",
      color: "gray",
    },

    firstPaper: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginLeft: "30px",
    },
  }));
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          GATE PASS REQUEST
        </Typography>
      </Paper>

      <Grid item container direciton="row" spacing={2}>
        <Grid item xs={4} direction="column">
          <Paper className={classes.firstPaper}>
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
              <InputLabel id="demo-multiple-name-label">Company</InputLabel>
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
              <InputLabel id="demo-multiple-name-label">
                First Approval
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={state.firstApproval}

                onChange={handleFirstAppChange}
                input={<OutlinedInput label="Gatepass Type" />}
              >
                {state.AllFirstApproval.map((type, index) => (
                  <ManuI key={index} value={type.SubCostRequisitionApprovalID}>
                    {type.ApproveUser}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Second Approval
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={state.secondApproval}
                onChange={handleSecondAppChange}
                input={<OutlinedInput label="Gatepass Type" />}
              >
                {state.AllSecondApproval.map((type, index) => (
                  <ManuI key={index} value={type.SubCostRequisitionApprovalID}>
                    {type.ApproveUser}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={8} direction="column">
          <Paper>
            <Button
              variant="contained"
              size="large"
              style={{ margin: 20 }}
              startIcon={<MdAddCircleOutline />}
              onClick={() => {
                setOpen(true);
              }}
            >
              Add
            </Button>

            <div style={{ height: 400, width: "100%" }}>
              <Modal
                open={open}
                onClose={handleClose}
                style={{
                  margin: 0,
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                }}
              >
                <Paper style={{ minHeight: "50vh", width: "60%" }}>
                  <Grid
                    item
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Search Employee/Item
                    </Typography>
                    {state.gatePassType == 3 || state.gatePassType == 4 ? (
                      <div className="div-Center">
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-multiple-name-label">
                            Store
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={state.stores}
                            onChange={handleChangeStore}
                            input={<OutlinedInput label="Stores" />}
                          >
                            {state.AllStores.map((type, index) => (
                              <ManuI key={index} value={type.StoresID}>
                                {type.Stores}
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
                          onChange={handleItemChange}
                          onInputChange={(e, value, reason) => {
                            setInputValue(value);
                            if (!value) {
                              setOpenD(false);
                            }
                          }}
                          filterOptions={filterOptions}
                          options={state.AllItems}
                          getOptionLabel={(option) => option.ItemDescription}
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Item"
                              variant="outlined"
                            />
                          )}
                        />
                        <TextField
                          sx={{ m: 1, width: 300 }}
                          id="outlined-basic"
                          type="number"
                          onChange={handleQuantity}
                          label="Quantity"
                          variant="outlined"
                        />
                      </div>
                    ) : state.gatePassType == 5 ? (
                      <div>
                        {/* <Typography style={{ fontSize: 9, color: "red" }}>
                          ** Only Admin and Senior Executive or upper level Rankers can do this request **
                        </Typography> */}
                        <Autocomplete
                          sx={{ m: 1, width: 300, marginTop: 2 }}
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
                         <div style={{ marginLeft: "10px", marginTop: "2px" }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="Apx. Pickup Time"
                              value={pickValue}
                              onChange={handleChangePickTime}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                          
                        </div>
                        <div style={{ marginLeft: "10px", marginTop: "2px" }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="Apx. Return"
                              value={apxValue}
                              onChange={handleChangeTime}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                          
                        </div>
                        
                        <div style={{ marginTop: "2px" }}>
                        <TextField
                            sx={{ m: 1, width: 300 }}
                            id="outlined-basic"
                            onChange={handleDestination}
                            label="Destination"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
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

                      </div>
                    )}
                    <TextField
                      sx={{ m: 1, width: 300 }}
                      id="outlined-basic"
                      multiline
                      rows={3}
                      onChange={handleRemarks}
                      label="Remarks"
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<MdAddCircleOutline />}
                      onClick={() => {
                        if (
                          state.gatePassType == 1 ||
                          state.gatePassType == 2
                        ) {
                          if (state.requestEmpID != 0 && state.Remarks != "") {
                            var obj = {
                              id: requestUser.length + 1,
                              EmpID: state.requestEmpID,
                              RequestUserName: state.requestEmp,
                              Remarks: state.Remarks,
                            }
                            handleAdditemToGrid(obj);
                          } else {
                            alertService.info("Please Select Employee or Reason is mandatory");
                          }

                        } else if (
                          state.gatePassType == 3 ||
                          state.gatePassType == 4
                        ) {
                          if (state.items != []) {
                            var obj = {
                              id: requestItem.length + 1,
                              ItemID: state.items,
                              itemDescription: state.itemsName,
                              Quantity: state.Quantity,
                              Remarks: state.Remarks,
                              Store: state.stores,
                            };
                            handleAdditemToGrid(obj);
                          } else {
                            alertService.info("Please Select Item");
                          }
                        } else {
                          if (state.requestEmpID != 0 && apxValue != "" && destination != '' && pickValue != "" && pickValue < apxValue) {
                            var obj = {
                              id: requestDriver.length + 1,
                              EmpID: state.requestEmpID,
                              RequestUserName: state.requestEmp,
                              ApxTime : apxValue,
                              PickupTime : pickValue,
                              Destination : destination,
                              Remarks: state.Remarks,
                            };
                            handleAdditemToGrid(obj);
                          } else {
                            alertService.info("Please Select All Details");
                          }
                        }
                      }}
                    >
                      ADD
                    </Button>
                  </Grid>
                </Paper>
              </Modal>
              <Modal></Modal>
              {requestUser ? (
                <Box
                  sx={{
                    height: 300,
                    textAlign: "center",
                    fontSize: 14,
                    width: 1,
                    "& .super-app-theme--header": {
                      backgroundColor: "rgba(118, 107, 105, 0.24)",
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
                >
                  <DataGrid
                    style={{ margin: "10px" }}
                    getRowId={(row) => row.id}
                    rows={
                      state.gatePassType == 1 || state.gatePassType == 2
                        ? requestUser
                        : state.gatePassType == 3 || state.gatePassType == 4
                          ? requestItem
                          : requestDriver
                    }
                    columns={
                      state.gatePassType == 1 || state.gatePassType == 2
                        ? columnsForRequest
                        : state.gatePassType == 3 || state.gatePassType == 4
                          ? columns
                          : columnsForDriver
                    }
                    pageSize={4}
                    rowsPerPageOptions={[4]}
                    disableSelectionOnClick
                  />
                </Box>
              ) : null}
            </div>
          </Paper>
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
      </Grid>
    </Grid>
  );
}

export { Request };
