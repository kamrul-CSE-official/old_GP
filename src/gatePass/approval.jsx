import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useOvermind } from "../other/OvermindHelper";
import { Grid, Paper, Typography, TextField , Button } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { commonService, alertService, accountService } from "@/_services";
import {
  MdApproval,
  GrEject,
  AiOutlineClear,
} from "react-icons/all";
import { action,status } from "overmind";
function Approval() {
  const user = accountService.userValue;
  var row = [];
  var FinalList = [];
  var finalObject = {};
  const [approvalHeader, setapprovalHeader] = useState(row);
  const [approvalHeaderClick, setApprovalHeaderClick] = useState(null);
  const [approvalDetails, setApprovalDetails] = useState(null);
  const [headerID, setheaderID] = useState(0);
  const [gatePassStatusID, setGatePassStatusID] = useState(0);
  const [gatepassTypeID, setgatepassTypeID] = useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);

  useEffect(() => {
    commonService.GetPendingApproval(user.empID).then((x) => {
      actions.loadApprovalHeader(x);
      setapprovalHeader(x);
    });
  }, []);
  const handleRemarks = (event) => {
    actions.setRemarks(event.target.value);
  };
  const handleOnCellClick = (params) => {
    setApprovalHeaderClick(params.row);
    setApprovalDetails(null);
    debugger;
    setheaderID(params.row.GatePassReqHeaderID);
    setgatepassTypeID(params.row.GatePassTypeID);
    setGatePassStatusID(params.row.GatePassStatusID);
    commonService.GetPendingApprovalDetails(params.row.GatePassReqHeaderID, params.row.GatePassStatusID, user.empID).then((x) => {
      setApprovalDetails(x);
    });
  };
  const handleRequestAccept = () => {
     FinalList = [];
     finalObject = {};
      for(var i=0;i<selectedRows.length;i++){
        finalObject = {};
        finalObject['Type'] = 'A';
        finalObject['GatePassReqDetailID'] = selectedRows[i].GatePassReqDetailID;
        finalObject['GatePassReqHeaderID'] = headerID;
        finalObject['GatePassTypeID'] = gatepassTypeID;
        finalObject['GatePassReqStatusID'] = gatePassStatusID;
        finalObject['ApprovedBy'] = user.empID;
        finalObject['ApprovalRemarks'] = state.Remarks;
        FinalList.push(finalObject);
      }
      commonService.ApprovedGatePassRequest(FinalList).then((x)=>{
        debugger;
      alertService.clear();
      alertService.success(x);
      window.location.reload(true);
      });
    
  };
  const handleRequestReject = () => {
    FinalList = [];
    
    for(var i=0;i<selectedRows.length;i++){
      finalObject = {};
      finalObject['Type'] = 'R';
      finalObject['GatePassReqDetailID'] = selectedRows[i].GatePassReqDetailID;
      finalObject['GatePassReqHeaderID'] = headerID;
      finalObject['GatePassTypeID'] = gatepassTypeID;
      finalObject['GatePassReqStatusID'] = gatePassStatusID;
      finalObject['ApprovedBy'] = user.empID;
      FinalList.push(finalObject);
      
    }
    commonService.ApprovedGatePassRequest(FinalList).then((x)=>{
      alertService.clear();
      alertService.success(x);
      window.location.reload(true);
    });
    
  };
  const handleClear = () => {
    window.location.reload(true);
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
  const columns = [
    {
      field: "GatePassReqHeaderID",
      headerName: "ID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
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
      field: "Company",
      headerName: "Company",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "DepartmentAndSection",
      headerName: "Department & Section",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "Location",
      headerName: "Location",
      editable: false,
      width: 150,
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
      headerName: "Request Detail",
      editable: false,
      width: 380,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "GatePassStatus",
      headerName: "Gatepass Status",
      editable: false,
      width: 250,
      flex:1,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      flex:1
    },
    {
      field: "GatePassStatusID",
      headerName: "Gatepass Status ID",
      editable: false,
      hide: true,
      width: 10,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "GatePassTypeID",
      headerName: "GatePassTypeID",
      width: 20,
      hide: true,
      type: "number",
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      flex:1
    },
  ];

  const columnsForItems = [
    {
      field: "GatePassReqDetailID",
      headerName: "No",
      width: 20,
      hide: true,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "ItemID",
      headerName: "Item ID",
      width: 110,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "ItemDescription",
      headerName: "Item Description",
      width: 450,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "Remarks",
      headerName: "Remarks",
      editable: false,
      flex:1,
      width: 300,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
  ];
  const columnsForRequest = [
    {
      field: "GatePassReqDetailID",
      headerName: "No",
      width: 20,
      hide: true,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "EmpID",
      headerName: "User ID",
      width: 80,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "EmpName",
      headerName: "Request User Name",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
   
    {
      field: "Remarks",
      headerName: "Remarks",
      editable: false,
      width: 250,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
  ];

  const columnsForDriver = [
    {
      field: "GatePassReqDetailID",
      headerName: "No",
      width: 50,
      hide: true,
      editable: false,
      flex:1,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "EmpID",
      headerName: "User ID",
      width: 80,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "EmpName",
      headerName: "Request User Name",
      width: 250,
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: "ApxTime",
      headerName: "Apx. Return",
      headerClassName: "super-app-theme--header",
      width: 180,
      valueGetter: ({ value })=> 
      value && new Date(value), 
      editable: false,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "PickupTime",
      headerName: "Pickup Time",
      headerClassName: "super-app-theme--header",
      width: 180,
      valueGetter: ({ value })=> 
      value && new Date(value), 
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
      editable: false,
      width: 250,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
    },
    
  ];
  useEffect(() => {
    commonService.GetPendingApproval(user.empID).then((x) => {
      actions.loadApprovalHeader(x);
    });
  }, []);
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Paper className={classes.paper}>
        <Typography variant="body2" color="textPrimary" component="span">
          Approval
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
            getRowId={(row) => row.GatePassReqHeaderID}
            columns={columns}
            onCellDoubleClick={handleOnCellClick}
            rows={approvalHeader}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </Grid>
      <Grid container>
        {
          approvalDetails != null ?
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
                checkboxSelection
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRows = approvalDetails.filter((row) =>
                    selectedIDs.has(row.GatePassReqDetailID),
                    
                  );
        
                  setSelectedRows(selectedRows);
                  
                }}
                getRowId={(row) => row.GatePassReqDetailID}
                columns={approvalHeaderClick.GatePassTypeID == 1 || approvalHeaderClick.GatePassTypeID == 2
                  ? columnsForRequest
                  : approvalHeaderClick.GatePassTypeID == 3 || approvalHeaderClick.GatePassTypeID == 4
                    ? columnsForItems
                    : columnsForDriver}
                rows={approvalDetails}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div> : null
        }

      </Grid>
      {
        approvalDetails != null ?
        <><Grid container justifyContent="flex-start" style={{ marginTop: '15px'}}>
            <TextField
              sx={{ m: 1, width: "100%",marginLeft:6 }}
              id="outlined-basic"
              multiline
              rows={2}
              onChange={handleRemarks}
              label="Remarks For Approval or Rejection"
              variant="outlined" />
          </Grid><Grid container justifyContent="flex-end" style={{ marginTop: '15px' }}>
              <Button
                style={{ margin: "7px" }}
                variant="contained"
                size="medium"
                color="primary"
                startIcon={<MdApproval />}
                onClick={() => {
                  handleRequestAccept();
                } }
              >
                Accept
              </Button>
              <Button
                style={{ margin: "7px" }}
                variant="contained"
                size="medium"
                color="error"
                startIcon={<GrEject />}
                onClick={() => {
                  handleRequestReject();
                } }
              >
                Reject
              </Button>
              <Button
                style={{ margin: "7px" }}
                variant="contained"
                size="medium"
                color="warning"
                startIcon={<AiOutlineClear />}
                onClick={() => {
                  handleClear();
                } }
              >
                Clear
              </Button>
            </Grid></> : null
      }

    </Grid>
  );
}

export { Approval };
