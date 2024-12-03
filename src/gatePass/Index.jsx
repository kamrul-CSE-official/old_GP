import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
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
import { accountService } from "@/_services";
import { Request } from "./Request";
import { Approval } from "./Approval";
import { Dashboard } from "./Dashboard";
import { ApprovalList } from "./approvalList";
import { Entry } from "./Entry";
import { Status } from "./Status";
import { SecurityExit } from "./SecurityExit";
import {AllEntryStatus} from "./AllEntryStatus";
import {Spare_Issue} from "./storesIssue";
import {StorePickList} from "./storePickList";
import {DriverAllowcation} from "./driverAllowcation";
import {VehicleRecord} from "./vehicleRecord";
import {Packing_Issue} from "./packingMIssue";
import {GatepassReport} from "./gatepassReport";
import { Change_Approval } from "./changeapproval";
import {VehicleAssignReport} from "./vehicleAssignReport";
import {Alart} from "./alart";
import {EntryData} from "./entryDataCntl";
import { GoodsDeliveryAOD } from "./goodsDeliveryAOD";
import { GatePassAODReport } from "./gatePassAODReport";
import sidebarimage from "../Assets/sidebar.jpg";
import { Nav, PrivateRoute, Alert } from '@/_components';
import { commonService, alertService } from "@/_services";
import {makeStyles} from '@mui/styles';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  FaGoogle,
  FaMicrosoft,
  FaResolving,
  FaRegShareSquare,
  FaStamp,
  FaPhabricator,
  FaShirtsinbulk,
  FaArrowLeft,
  FaSignOutAlt,
  FaAccusoft,
  FaStore,
  FaUserCheck,
  FaCarAlt,
  FaCarSide,
  FaHands,
  FaBookOpen,
  FaSlideshare,
  FaAutoprefixer,
  FaBullhorn,
  FaTencentWeibo,
  FaCaravan,
  FaFileArchive,
} from "react-icons/fa";
import { useOvermind } from "../other/OvermindHelper";
function GatePass({ history, match }) {
  const iconsFa = {
    FaGoogle:FaGoogle,
    FaMicrosoft:FaMicrosoft,
    FaResolving:FaResolving,
    FaRegShareSquare:FaRegShareSquare,
    FaStamp:FaStamp,
    FaPhabricator:FaPhabricator,
    FaShirtsinbulk:FaShirtsinbulk,
    FaArrowLeft:FaArrowLeft,
    FaSignOutAlt:FaSignOutAlt,
    FaAccusoft:FaAccusoft,
    FaStore:FaStore,
    FaUserCheck:FaUserCheck,
    FaCarAlt:FaCarAlt,
    FaCarSide:FaCarSide,
    FaHands:FaHands,
    FaBookOpen: FaBookOpen,
    FaSlideshare : FaSlideshare,
    FaAutoprefixer: FaAutoprefixer,
    FaBullhorn: FaBullhorn,
    FaTencentWeibo:FaTencentWeibo,
    FaCaravan: FaCaravan,
    FaFileArchive: FaFileArchive
}
const dynamicRouter ={
  Request : Request,
  Approval : Approval,
  Dashboard : Dashboard,
  ApprovalList : ApprovalList,
  Entry : Entry,
  Status : Status,
  SecurityExit : SecurityExit,
  Spare_Issue : Spare_Issue,
  AllEntryStatus : AllEntryStatus,
  StorePickList : StorePickList,
  DriverAllowcation:DriverAllowcation,
  VehicleRecord:VehicleRecord,
  Packing_Issue:Packing_Issue,
  GatepassReport:GatepassReport,
  Change_Approval : Change_Approval,
  VehicleAssignReport: VehicleAssignReport,
  Alart : Alart,
  EntryData: EntryData,
  GoodsDeliveryAOD: GoodsDeliveryAOD,
  GatePassAODReport: GatePassAODReport
}
  const user = accountService.userValue;
  const { path } = match;
  const { state, actions } = useOvermind();
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width:1,
      background:
        "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
    },
  }));

  useEffect(() => {
    commonService.GetAssignMenuByEmpID(user.empID,  window.localStorage.getItem("ButtonID")).then((x) => {
      debugger;
      actions.setAssigMenu(x);
    });
  }, []);
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
    >
      <Grid container item xs={2} style={{ marginRight: "40px" }}>
        <ProSidebar
          style={{ minHeight: "95vh" }}
          image={sidebarimage}
          collapsed={state.sidebaropen}
        >
          <SidebarHeader>
            <div
              style={{
                padding: "24px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: "1px",
                overflow: "hidden",
                alignItems: "center",
                verticalAlign: "middle",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <span>
                <FaAccusoft
                  style={{ minHeight: 35, minWidth: 35, margin: 10 }}
                />
              </span>
              <span>N-HUB</span>
            </div>
          </SidebarHeader>

          <Menu iconShape="square">
            {state.AssigMenuByID.map(function (item, i) {
              const Icon = iconsFa[item.icons];
              return (
                <MenuItem icon={<Icon/>}>
                  {item.menuName} <Link to={item.menu} />
                </MenuItem>
              );
            })}
          </Menu>
          <SidebarFooter>
            <div>
              <Typography >
              <FaSignOutAlt
                style={{ minHeight: 20, minWidth: 20, margin: 5 }}
                onClick={accountService.logout}
                title="Logout"
              ></FaSignOutAlt>
              Logout</Typography>
            </div>
            <div>
              <Typography>
              <FaArrowLeft
                style={{ minHeight: 20, minWidth: 20, margin: 5 }}
                title="Expend"
                onClick={() => {
                  actions.setSidebar(!state.sidebaropen);
                }}
              ></FaArrowLeft>
              {state.sidebaropen?"Unfold":"Fold"}</Typography>
            </div>
          </SidebarFooter>
        </ProSidebar>
      </Grid>
      <Grid container item xs={9} spacing={2}>
        <Switch>
        {state.AssigMenuByID.map(function (item, i) {
          const RouterComponent = dynamicRouter[item.menu];
              return (
                <PrivateRoute path={`${path}/${item.menu}`} component={RouterComponent} />
               
              );
            })}
         
        </Switch>
      </Grid>
    </Grid>
  );
}

export { GatePass };
