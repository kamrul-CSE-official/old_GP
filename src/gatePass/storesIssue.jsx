import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { makeStyles } from "@mui/styles";
import { useOvermind } from "../other/OvermindHelper";
import { commonService, alertService, accountService } from "@/_services";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Camera, FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import SignatureCanvas from "react-signature-canvas";
import "react-html5-camera-photo/build/css/index.css";
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
import {
  ImManWoman,
  AiOutlineCar,
  FaCameraRetro,
  AiOutlineSave,
  MdApproval,
} from "react-icons/all";
function Spare_Issue() {
  const user = accountService.userValue;
  const history = useHistory()
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
    button: {
      backgroundColor: "#f0e8ed"
    }
  }));

  const handleSaveSign = () => {
    debugger;
    var blobObject = dataURLtoBlob(
      sigPad.getTrimmedCanvas().toDataURL("image/png")
    );
    debugger;
    var fdataobj = new FormData();
    fdataobj.append("name", user.empID);
    fdataobj.append("file", blobObject);
    commonService.uploadVImage(fdataobj).then((x) => {
      alertService.clear();
      alertService.success(x);
      setreceiverSign(x);
      debugger;
    });
    debugger;
  };

  const handleClearSign = () => {
    sigPad.clear();
    setreceiverSign(null);
  };
  useEffect(() => {
    commonService.GetCompanies().then((x) => {
      actions.loadCompany(x);
    });
  }, []);
  var sigPad = {};
  const handleSaveImage = () => {
    var finalObject = {};
    finalObject["IssueHeaderID"] = state.issueHeaderID;
    finalObject["ReceiverImage"] = ImageReceiver;
    finalObject["ReceiverSign"] = receiverSign;
    if (ImageReceiver !== "" && receiverSign !== "") {
      commonService.ReceiverDetails(finalObject).then((x) => {
        setActiveStep(1);
        alertService.clear();
        alertService.success("SuccessFully Save");
        setReqDetails([]);
        setIssuedDetails([]);
        window.location.reload();
      });
    } else {
      alert("Please Put the sign and Image For Issue");
    }
  };

  const handleIssueRequest = () => {
    SetButtonDisable(true);
    var finalObject = {};
    finalObject["ReqHeaderID"] = state.reqCode;
    finalObject["EnteredBy"] = user.empID;
    finalObject["ReqCode"] = state.ReqCodeForIssueItem;
    finalObject["Remarks"] = state.issueRemarks;
    
    debugger;
    let finalArray = [];
    selectedRows.forEach((item) => {
      if (item.IssueQty !== undefined && item.intRecDetID != null) {
        debugger;
        finalArray.push(item);
      } else {
        alert("Your IssuedQty and GRN is Wrong or not Selected");
      }
    });
    finalObject["IssueSavingDetails"] = finalArray;
    if(finalArray.length != 0){

      commonService.StoreIssueSaving(finalObject).then((x) => {
        alertService.clear();
        alertService.success(x);
        debugger;
        actions.setIssueID(parseInt(x));
        setstepTwoLoading(true);
        commonService.StoreIssueNote(state.issueHeaderID).then((x) => {
          debugger;
       
            SetButtonDisable(false);
            setIssuedDetails(x);
            debugger;
            setstepTwoLoading(false);
            if(issuedDetails != undefined){
              setActiveStep(2);
            }
            
          
        });
      });
    }else{
      alert("Your IssuedQty and GRN is Wrong or not Selected");
    }
  };
  const handleRowEditCommit = (values) => {
    debugger;
    if (values != null) {
      reqDetails.forEach((item) => {
        if (item.ReqDetailID == values.id) {
          debugger;
          if (values.field == "IssueQty") {
            if (values.value <= item.ApprovedQty && values.value <= item.SIH && values.value <= item.ApprovedQty - item.IssuedQty) {
              Object.assign(item, {IssueQty: values.value});
              actions.setReqCodeForIssueItem(item.ReqCode);
              setReqDetails(reqDetails);
              debugger;
            } else {
              alertService.clear();
              Object.assign(item, {IssueQty: null});
              setReqDetails(reqDetails);
              alert("Your Issue Quantity is Wrong");
            }
          } else {
            item.DamageQty = values.value;
          }
          debugger;
        }
      });
    }

  }

  const handleAcceptNote = () => {
    setActiveStep(3);
  };
  const handleIssueRemarks = (event) => {
    actions.setIssueRemarks(event.target.value);
  };
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
    commonService.GetReqCompanyInfo(state.reqCode).then((x) => {
      actions.loadReqComInfo(x);
    });
    commonService.GetReqDetails(state.reqCode).then((x) => {
      setReqDetails(x);
    });
    debugger;
  };
  function handleTakePhoto(dataUri) {
    var blobObject = dataURLtoBlob(dataUri);
    var fdataobj = new FormData();
    fdataobj.append("name", user.empID);
    fdataobj.append("file", blobObject);
    commonService.uploadVImage(fdataobj).then((x) => {
      alertService.clear();
      alertService.success(x);
      setImageReceiver(x);
      debugger;
    });
  }
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  const handleChangeGRN = (event, id) => {
    reqDetails.forEach((item) => {
      var str = event.target.value.REC_NO;
      debugger;
      if (item.ReqDetailID === id && Math.round(parseFloat(item.IssueQty).toFixed(4)) <= Math.round(parseFloat(str.split("--")[1]).toFixed(4))) {
        Object.assign(item, {intRecDetID: event.target.value.intRecDetID});
        //item["intRecDetID"] = event.target.value.intRecDetID;
        setReqDetails(reqDetails);
        debugger;
      } else if (item.intRecDetID == null) {
        debugger;
        Object.assign(item, {intRecDetID: null});
        setReqDetails(reqDetails);
        //item["GRN"] = event.target.value;
      }
    });

    debugger;
  };
  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });
  const { state, actions } = useOvermind();
  const steps = ["Issue Item", "Verify Issue Item", "Authentication"];
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const [openD, setOpenD] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [reqDetails, setReqDetails] = useState([]);
  const [receiverSign, setreceiverSign] = React.useState(null);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [ImageReceiver, setImageReceiver] = React.useState(null);
  const [ButtonDisable, SetButtonDisable] = useState(false);
  const [stepTwoLoading, setstepTwoLoading] = useState(false);
  const [issuedDetails, setIssuedDetails] = React.useState([]);
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
      field: "IssueQty",
      headerName: "Issue Qty",
      type: "number",
      width: 80,
      editable: true,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "IssuedQty",
      headerName: "P Issued Qty",
      width: 80,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "GRN",
      headerName: "GRN",
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (item) => {
        return (

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <FormControl sx={{ width: 400, height: 50, marginTop: "3px" }}>
              <InputLabel sx={{ height: 50 }} id="demo-multiple-name-label">
                GRN
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={item.row.intRecDetID}
                sx={{ height: 40, width: 150, fontSize: 9 }}
                onChange={(e) => {
                  if (item.row.IssueQty !== undefined) {
                    handleChangeGRN(e, item.row.ReqDetailID);
                    debugger;
                  } else {
                    alert("Please Check the Issue Quantity First");
                    item.row.intRecDetID = null;
                    setGrnID(0);
                  }
                }}
                input={<OutlinedInput label="GRN" />}
              >
                {item.row.GRN.map((type, index) => (
                  <ManuI key={index} value={type} style={{ fontSize: 9 }}>
                    {type.REC_NO}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
          </div>

        );
      },
      editable: false,
      width: 150,
    },
    {
      field: "ReqCode",
      headerName: "ReqCode",
      width: 150,
      hide: true,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "DamageQty",
      headerName: "Damage Qty",
      width: 80,
      editable: true,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "UNIT",
      headerName: "UNIT",
      width: 30,
      hide: true,
      editable: false,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: "ApprovedQty",
      headerName: "ApprovedQty",
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
      field: "Remarks",
      headerName: "Remarks",
      width: 250,
      hide: true,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "PurchaseReqDetailID",
      headerName: "PurchaseReqDetailID",
      width: 10,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: "EnteredOn",
      headerName: "RequestOn",
      width: 200,
      type: "dateTime",
      hide: true,
      valueGetter: ({ value }) => value && new Date(value),
      editable: false,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: "intRecDetID",
      headerName: "intRecDetID",
      width: 10,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell'
    },

  ];

  const columnsForIssue = [
    {
      field: "DetID",
      headerName: "ID",
      width: 50,
      type: "number",
      hide: true,
      editable: false,
    },
    {
      field: "ITEM_CODE",
      headerName: "ITEM CODE",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "ITEM_DESC",
      headerName: "ITEM DESC",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "Unit",
      headerName: "Unit",
      width: 100,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "QTY",
      headerName: "Issue Qty",
      width: 100,
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
    <Grid container direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Stores Issue
        </Typography>
      </Paper>
      <Grid container direction="column" spacing={2}>
        <Box sx={{ width: "100%" }}>
          <Paper
            style={{
              marginTop: "50px",
              marginLeft: "60px",
              minHeight: "60px",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Paper>
          {activeStep == 1 ? (
            <Grid container xs={12}>
              <Paper style={{ marginTop: "50px", marginLeft: "60px" }}>
                <Grid container alignItems="center" direction="column">
                  <Grid container item alignItems="center" direction="row">
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
                    {
                      <TextField
                        sx={{ m: 1, width: 300 }}
                        id="outlined-basic"
                        disabled={true}
                        value={state.AllReqComInfo.map((label, index) => {
                          return label.Location;
                        })}
                        label="Location"
                        variant="outlined"
                      />
                    }
                    {
                      <TextField
                        sx={{ m: 1, width: 300 }}
                        id="outlined-basic"
                        disabled={true}
                        value={state.AllReqComInfo.map((label, index) => {
                          return label.CostCenter;
                        })}
                        label="Department"
                        variant="outlined"
                      />
                    }
                    {
                      <TextField
                        sx={{ m: 1, width: 300 }}
                        id="outlined-basic"
                        disabled={true}
                        value={state.AllReqComInfo.map((label, index) => {
                          return label.SubCostCenter;
                        })}
                        label="Section"
                        variant="outlined"
                      />
                    }
                    {
                      <TextField
                        sx={{ m: 1, width: 300 }}
                        id="outlined-basic"
                        value={state.issueRemarks}
                        onChange={handleIssueRemarks}
                        label="Issue Remarks"
                        variant="outlined"
                      />
                    }
                  </Grid>
                </Grid>
              </Paper>
              <Grid container xs={12}>
                {
                  <DataGrid
                    sx={{
                      m: 2,
                      boxShadow: 2,
                      border: 2,
                      minHeight: "300px",
                      marginTop: "50px",
                      marginLeft: "10px",
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
                    rows={reqDetails}
                    onCellEditCommit={handleRowEditCommit}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      const selectedRows = reqDetails.filter((row) =>
                        selectedIDs.has(row.ReqDetailID)
                      );

                      setSelectedRows(selectedRows);
                      debugger;
                    }}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                  />
                }
              </Grid>
            </Grid>
          ) : activeStep == 2 ? (
            <Grid container xs={12}>
              <DataGrid
              sx={{
                m: 2,
                boxShadow: 2,
                border: 2,
                minHeight: "300px",
                      marginTop: "50px",
                      marginLeft: "10px",
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
              getRowId={(row) => row.DetID}
              columns={columnsForIssue}
              rows={issuedDetails}
              disableSelectionOnClick
              loading={stepTwoLoading}
              components={{
                Toolbar: GridToolbar,
              }}
            />
              </Grid>
            
          ) : (
            <Grid container xs={12} alignItems="center" direction="column">
              <Paper
                style={{
                  marginTop: "50px",
                  marginLeft: "60px",
                  minHeight: "300px",
                }}
              >
                {ImageReceiver != null ? (
                  <img
                    src={
                      "https://192.168.1.253:8080/images/" + "" + ImageReceiver
                    }
                    height="400px"
                    width="400px"
                  ></img>
                ) : (
                  <Camera
                    onTakePhoto={(dataUri) => {
                      handleTakePhoto(dataUri);
                    }}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    imageType={IMAGE_TYPES.JPG}
                    isImageMirror={false}
                    isSilentMode={false}
                    isDisplayStartCameraError={true}
                  />
                )}
              </Paper>
              <Paper
                style={{
                  marginTop: "50px",
                  marginLeft: "60px",
                  minHeight: "400px",
                  width: "100%"
                }}
              >
                {receiverSign == null ? (
                  <SignatureCanvas
                    penColor="green"

                    canvasProps={{
                      width: 800,
                      height: 300,
                      className: "sigCanvas",
                    }}
                    ref={(ref) => {
                      sigPad = ref;
                    }}
                  />
                ) : (
                  <img
                    src={
                      "https://192.168.1.253:8080/images/" + "" + receiverSign
                    }
                    height="200px"
                    width="200px"
                  ></img>
                )}
                <Grid
                  container
                  justifyContent="flex-end"
                  className={classes.button}
                  style={{ marginTop: "15px", colors: "gray" }}
                >
                  <Button
                    style={{ margin: "20px", marginTop: "20px" }}
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={handleClearSign}
                  >
                    Clear
                  </Button>
                  <Button
                    style={{ margin: "20px", marginTop: "20px" }}
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={handleSaveSign}
                  >
                    Trim
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Box>
        <Grid container justifyContent="flex-end" style={{ marginTop: "15px" }}>
          {activeStep == 1 ? (
            <Button
              style={{ margin: "20px", marginTop: "20px" }}
              variant="contained"
              size="medium"
              color="primary"
              disabled={ButtonDisable}
              startIcon={<MdApproval />}
              onClick={() => {
                handleIssueRequest();
              }}
            >
              Issue
            </Button>
          ) : activeStep == 2 ? (
            <Button
              style={{ margin: "20px", marginTop: "20px" }}
              variant="contained"
              size="medium"
              color="primary"
              startIcon={<MdApproval />}
              onClick={() => {
                handleAcceptNote();
              }}
            >
              Accept
            </Button>
          ) : (
            <Button
              style={{ margin: "20px", marginTop: "20px" }}
              variant="contained"
              size="medium"
              color="primary"
              startIcon={<MdApproval />}
              onClick={() => {
                handleSaveImage();
              }}
            >
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export { Spare_Issue };
