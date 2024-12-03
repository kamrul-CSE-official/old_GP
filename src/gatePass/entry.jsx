import React, { useEffect, useState, useStyles } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@mui/styles";
import { Camera, FACING_MODES, IMAGE_TYPES  } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import {
  ImManWoman,
  AiOutlineCar,
  FaCameraRetro,
  AiOutlineSave,
  MdApproval
} from "react-icons/all";
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
import { useOvermind } from "../other/OvermindHelper";
import { fetchWrapper, history } from '../_helpers/index';
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { commonService, alertService, accountService } from "@/_services";
import Webcam from "react-webcam";

function Entry() {
  const user = accountService.userValue;
  const { state, actions } = useOvermind();
  const webcamRef = React.useRef(null);

  useEffect(() => {
    commonService.GetAllPurpose().then((x) => {
      actions.loadAllPurpose(x);
      
    });
    commonService.GetEntryData().then((x) => {
      setentryData(x);
      commonService.UserListForNotification().then((x)=>{
        setnotificationUser(x);
      });
    });
  }, []);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setdataURI(imageSrc);
    
    var blobObject = dataURLtoBlob(imageSrc);
    var fdataobj = new FormData();
    fdataobj.append("name", user.empID);
    fdataobj.append("file", blobObject);
    commonService.uploadVImage(fdataobj).then((x) => {
      alertService.clear();
      alertService.success(x);
      setOpen(false);
    });
  }, [webcamRef]);

  const handleName = (event) => {
    actions.setName(event.target.value);
  };
  const handleDriver = (event) => {
    actions.setDriver(event.target.value);
  };
  
  const handleRemarks = (event) => {
    actions.setEntryRemarks(event.target.value);
  };
  
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
      
    }
    commonService.UpdateEntryData(FinalList).then((x) => {
      alertService.clear();
      alertService.success(x);
    });
    
  };
  function NotifyWhatsapp(obj) {
    debugger;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer EAAINrUm0pZC0BABslHlZCNmVnuOtQ2lQkxh2LarMGPqsFHlgXOHqf2BA7NsZCFLpiolu54O94Op1LdnZAu0VWRgOCdvxyXpXkh6VncwqG6bwZBb17UWy1ZCZCRKsXm86sC0FDbdMTti5fKpDQvrjMbyAMFQS5RUwZAQZBaQrbFGikKu9a2AhQ6s1o' },
        body: JSON.stringify({
          "messaging_product": "whatsapp",
          "to": obj,
          "type": "template",
          "template": {
              "name": "tata",
              "language": {
                  "code": "en"
              }
          }
      
    })
    };
    debugger;
    
    return fetch(`https://graph.facebook.com/v14.0/105603162206282/messages`, requestOptions).then();
    
}
  const saveEntryData = () => {
    
    alertService.clear();
    debugger;
    commonService
      .SaveEntry(state.Name, state.purpose, state.vimage,state.requestEmpID,state.entryRemarks,state.entryDriver)
      .then((x) => {
        alertService.success(x);
        actions.setName("");
        actions.setVecImage("");
        actions.setEntryRemarks("");
        actions.setDriver("");
        //actions.setAllPurpose(null);
       // actions.setEmpID(null);
        commonService.GetEntryData().then((x) => {
          if (state.purpose == 8){
           for(var i =0; i< notificationUser.length;i++){
            NotifyWhatsapp(notificationUser[i].PhoneNo);
            debugger;
           }
          }
          setentryData(x);
        });
        
      });
  };
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
  const videoConstraints = {
    width: 100,
    height: 100,
    facingMode: "user",
  };
  function handleTakePhoto (dataUri) {
    setimageShow(0);
    var blobObject = dataURLtoBlob(dataUri);
    var fdataobj = new FormData();
    fdataobj.append("name", user.empID);
    fdataobj.append("file", blobObject);
    commonService.uploadVImage(fdataobj).then((x) => {
      alertService.clear();
      alertService.success(x);
      actions.setVecImage(x);
      debugger;
      setOpen(false);
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

  const classes = useStyles();
  const [entryState, setEntryState] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataURI, setdataURI] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [entryData, setentryData] = useState([]);
  const [notificationUser, setnotificationUser] = useState([]);
  const [imageShow, setimageShow] = useState(0);
  const [image, setImage] = useState("");
  const [openD, setOpenD] = useState(false);

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });
  const handleChangePurpose = (event, value) => {
    
    actions.setAllPurpose(event.target.value);

    if(state.purpose == 2){
      commonService.GetAllEmp(0).then((x) => {
        actions.loadAllEmp(x);
      });
    }
  };

  const handleEmpChange = (event, value) => {
    actions.setEmpName(value.EmpName);
    actions.setEmpID(value.EmpID);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function imageShowFn(value) {
    setimageShow(1);
    setImage("https://192.168.1.253:8080/images/" + "" + value);
    setOpen(true);
    console.log(image);
    
  }

  const columns = [
    {
      field: "EntryID",
      headerName: "ID",
      width: 20,
      type: "number",
      editable: false,
    },
    {
      field: "Name",
      headerName: "Name/Vehicle",
      width: 250,
      editable: false,
    },
    {
      field: "Purpose",
      headerName: "Purpose",
      width: 250,
      editable: false,
    },
    {
      field: "InTime",
      headerName: "InTime",
      width: 200,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      editable: false,
    },
    {
      field: "OutTime",
      headerName: "OutTime",
      type: "dateTime",
      valueGetter: ({ value }) => {
        if ((value = Date("1/1/1"))) {
          new Date(null);
        }else{
          new Date(value)
        }
      },
      editable: false,
      width: 150,
    },
    {
      field: "Image",
      headerName: "Image",
      flex:1,
      renderCell: (Image) => {
        return (
          <div>
            {
              Image.row.Image != null? 
                <strong>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                      imageShowFn(Image.row.Image);
                    }}
                  >
                    Open
                  </Button>
                </strong>:null
              
            }
          </div>
           
          
        );
      },
      editable: false,
      width: 150,
    },
  ];
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Entry
        </Typography>
      </Paper>
      {imageShow == 0 ? (
        <Modal
          open={open}
          onClose={handleClose}
          style={{
            margin: 0,
            position: "absolute",
            top: "5%",
            left: "5%",
          }}
        >
          <Paper className={classes.bopaper}>
          <Camera
          
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          imageType = {IMAGE_TYPES.JPG}
          isImageMirror = {false}
          isSilentMode = {false}
          isDisplayStartCameraError = {true}
    />
          </Paper>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          style={{
            margin: 0,
            position: "absolute",
            top: "5%",
            left: "5%",
          }}
        >
          <Paper className={classes.bopaper}>
            <img src={image} width="700" height="500"></img>
          </Paper>
        </Modal>
      )}
      <Grid container alignItems="center" direction="column">
        <Grid item alignItems="center" direction="row">
          <Button
            style={{ margin: "7px" }}
            variant="contained"
            size="medium"
            color="error"
            startIcon={<ImManWoman />}
            onClick={() => {
              setEntryState(1);
            }}
          >
            Human Entry
          </Button>
          <Button
            style={{ margin: "7px" }}
            variant="contained"
            size="medium"
            color="warning"
            startIcon={<AiOutlineCar />}
            onClick={() => {
              setEntryState(2);
            }}
          >
            Vehicle Entry
          </Button>
        </Grid>
        <Grid container item alignItems="center" direction="column">
          <Grid item alignItems="center" direction="row">
            {entryState === 2 ? (
              <TextField
                sx={{ m: 1, width: 300 }}
                id="outlined-basic"
                onChange={handleName}
                label="Vehicle No"
                variant="outlined"
              />
             
            ) : (
              <TextField
                sx={{ m: 1, width: 300 }}
                id="outlined-basic"
                onChange={handleName}
                label="Name"
                variant="outlined"
              />
              
            )}
            
              {entryState === 2 ? (
                <TextField
                  sx={{ m: 1, width: 300 }}
                  id="outlined-basic"
                  onChange={handleDriver}
                  label="Driver Name"
                  variant="outlined"
                />
               
              ):null
            }
             <TextField
                sx={{ m: 1, width: 300 }}
                id="outlined-basic"
                onChange={handleRemarks}
                label="Remarks"
                variant="outlined"
              />
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Purpose</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={state.purpose}
                onChange={handleChangePurpose}
                input={<OutlinedInput label="Purpose" />}
              >
                {state.AllPurpose.map((type, index) => (
                  <ManuI key={index} value={type.PurposeTypeID}>
                    {type.PurposeType}
                  </ManuI>
                ))}
              </Select>
            </FormControl>
            {
               state.purpose == 2 || state.purpose == 6 ? <Autocomplete
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
             />:null
            }
          </Grid>
          <Grid item alignItems="center" direction="row">
              <Button
                style={{ margin: "7px" }}
                variant="contained"
                size="medium"
                color="error"
                startIcon={<FaCameraRetro />}
                onClick={() => {
                  setOpen(true);
                  setimageShow(0);
                }}
              >
                Capture photo
              </Button>
            
            <Button
              style={{ margin: "7px" }}
              variant="contained"
              size="medium"
              color="warning"
              startIcon={<AiOutlineSave />}
              onClick={() => {
                saveEntryData();
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>

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
            rows={entryData}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = entryData.filter((row) =>
            
                selectedIDs.has(row.EntryID)
              );
              
              setSelectedRows(selectedRows);
              
            }}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
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
    </Grid>
  );
}

export { Entry };
