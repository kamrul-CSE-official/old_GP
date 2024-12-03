import { trTR } from "@mui/x-data-grid";
import { createOvermind } from "overmind";
import { createHook } from "overmind-react";
import { MdSentimentVerySatisfied } from "react-icons/md";

export const useOvermind = createHook();
export const overmind = createOvermind({
  state: {
    gatePassType: 0,
    AllGatePass: [],
    Companies: [],
    company: [],
    AllCostCenter: [],
    costCenter: [],
    AllSubCostCenter: [],
    subCostCenter: [],
    ALLlocation: [],
    location: [],
    AllFirstApproval: [],
    firstApproval: [],
    AllSecondApproval: [],
    secondApproval: [],
    GetAllEMP: [],
    empDetails: [],
    AllServices: [],
    service: [],
    AllAssets: [],
    assets: [],
    AllSubAssets: [],
    subAssets: [],
    AllEmp: [],
    employee: [],
    requestEmp: [],
    requestEmpID: [],
    UserRequest: [],
    Remarks : "",
    Quantity:0,
    AllItems:[],
    items:[],
    itemsName:[],
    AllStores:[],
    stores:[],
    AllApprovalHeader:[],
    ApprovalHeaderID:[],
    AllApprovalDetails : [],
    ApprovalDetails:[],
    requestSaveData :{},
    ApprovalMessage : "",
    AllStatus : [],
    AllPurpose :[],
    purpose : [],
    Name : "",
    vimage : "",
    GetEntryData : [],
    sidebaropen : true,
    AssigMenuByID : [],
    activeStep : 0,
    reqCode : [],
    reqCodeNo:[],
    AllreqCode: [],
    AllReqComInfo:[],
    ReqComInfo:[],
    AllGRNDetails : [],
    GRNDetails : [],
    SelectedGRN : "",
    itemCode : "",
    RequestDetails : [],
    issueRemarks : "",
    issueHeaderID : 0,
    IssueDetails : [],
    ReqCodeForIssueItem:"",
    AllVehicleType:[],
    AllDriver:[],
    TransportType:0,
    DriverID :0,
    ButtonID :0,
    entryRemarks : "",
    entryDriver : "",
    vehicleNo : "",
    vehicleRemarks : "",
    AllCompanyName : [],
    companyDetails : [],
    CompanyCode : "",
    DriverName : "",
    EntryID  : 0,
  },
  actions: {
    setGatePassType({ state }, type) {
      state.gatePassType = type;
    },
    setRE({ state }, type) {
      state.gatePassType = type;
    },
    setVehicleNo({ state }, type) {
      state.vehicleNo = type;
    },
    setButtonID({ state }, type) {
      state.ButtonID = type;
    },
    loadGatePass({ state }, all) {
      state.AllGatePass = all;
    },
    loadCompany({ state }, all) {
      state.Companies = all;
    },
    setCompany({ state }, company) {
      state.company = company;
    },
    loadCostCenter({ state }, all) {
      state.AllCostCenter = all;
    },
    setCostCenter({ state }, all) {
      state.costCenter = all;
    },
    loadSubCostCenter({ state }, all) {
      state.AllSubCostCenter = all;
    },
    setSubCostCenter({ state }, all) {
      state.subCostCenter = all;
    },
    loadLocation({ state }, all) {
      state.ALLlocation = all;
      debugger;
    },
    setLocation({ state }, all) {
      state.location = all;
    },
    loadFirstApproval({ state }, all) {
      state.AllFirstApproval = all;
    },
    setFirstApproval({ state }, all) {
      state.firstApproval = all;
    },
    loadSecondApproval({ state }, all) {
      state.AllSecondApproval = all;
    },
    setSecondApproval({ state }, all) {
      state.secondApproval = all;
    },
    loadEmpDetails({ state }, all) {
      state.GetAllEMP = all;
    },
    setEmpDetails({ state }, all) {
      state.empDetails = all;
    },
    loadServices({ state }, all) {
      state.AllServices = all;
    },
    setService({ state }, all) {
      state.service = all;
    },
    loadAssets({ state }, all) {
      state.AllAssets = all;
    },
    setAssets({ state }, all) {
      state.assets = all;
    },
    loadSubAssets({ state }, all) {
      state.AllSubAssets = all;
    },
    setSubAssets({ state }, all) {
      state.subAssets = all;
    },
    loadAllEmp({ state }, all) {
      state.AllEmp = all;
    },
    setEmployee({ state }, all) {
      state.employee = all;
    },
    setEmpName({ state }, all) {
      state.requestEmp = all;
    },
    setEmpID({ state }, all) {
      state.requestEmpID = all;
    },
    setUserRequest({ state }, all) {
      state.UserRequest = all;
    },
    loadAllItem({ state }, all) {
        state.AllItems = all;
      },
      setItem({ state }, all) {
        state.items = all;
      },
      setItemName({ state }, all) {
        state.itemsName = all;
      },
      loadStores({ state }, all) {
        state.AllStores = all;
      },
      setStore({ state }, all) {
        state.stores = all;
      },
      setRemarks({state},all){
          state.Remarks = all;
      },

      //Added By Mehedee
      setVehicleRejectRemarks({state},all){
        state.vehicleRemarks = all;
      },
      setQuantity({state},all){
        state.Quantity = all;
      },
      setDriver({state},all){
        state.Driver = all;
      },
      setRequestSaveData({state},all){
        state.requestSaveData = all
      },
      loadApprovalHeader({state},all){
        debugger;
        state.AllApprovalHeader = all
      },
      setApprovalHeader({state},all){
        state.ApprovalHeaderID = all
      },
      loadApprovalDetails({state},all){
        debugger;
        state.AllApprovalDetails = all
      },
      setApprovalDetails({state},all){
        state.ApprovalDetails = all
      },
      setApprovalMessage({state},all){
        state.ApprovalMessage = all
      },
      loadStatus({state},all){
        state.AllStatus = all
        debugger;
      },
      loadAllPurpose({state},all){
        debugger;
        state.AllPurpose = all
      },
      setAllPurpose({state},all){
        state.purpose = all
        debugger;
      },
      setVecImage({state},all){
        state.vimage = all
        debugger;
      },
      setName({state},all){
        state.Name = all
      },
      loadEntryData({state},all){
        state.GetEntryData = all
      },
      setSidebar({state},all){
        state.sidebaropen = all
        debugger;
      },
      setAssigMenu({state},all){
        state.AssigMenuByID = all
        debugger;
      },
      setActiveStep({state},all){
        state.activeStep = all
        debugger;
      },
      setReqCode({state},all){
        state.reqCode = all
        debugger;
      },
      loadReqCode({state},all){
        state.AllreqCode = all
        debugger;
      },
      setReqComInfo({state},all){
        state.ReqComInfo = all
        debugger;
      },
      loadReqComInfo({state},all){
        state.AllReqComInfo = all
        debugger;
      },
      setGrnNo({state},all){
        state.GRNDetails = all
        debugger;
      },
      loadGrnNo({state},all){
       state.AllGRNDetails = all;
        debugger;
      },
      setSelectedGrnNo({state},all){
        state.SelectedGRN = all;
         debugger;
       },
       setItemCode({state},all){
        state.itemCode = all;
         debugger;
       },
       setRequestDetails({state},all){
        state.SelectedGRN = all;
         debugger;
       },
       loadRequestDetails({state},all){
        state.RequestDetails = all;
         debugger;
       },
       setIssueRemarks({state},all){
        state.issueRemarks = all;
         debugger;
       },
       setReqCodeNo({state},all){
        state.reqCodeNo = all
        debugger;
      },
      setIssueID({state},all){
        state.issueHeaderID = all
        debugger;
      },
       setIssueDetails({state},all){
        state.IssueDetails = all
        debugger;
       },
       setReqCodeForIssueItem({state},all){
        state.ReqCodeForIssueItem = all
        debugger;
       },
       setDriverForTransportRecord({state},all){
        state.DriverID = all
        debugger;
       },
       setVehicleType({state},all){
        state.TransportType = all
        debugger;
       },
       loadVehicleType({state},all){
        state.AllVehicleType = all;
         debugger;
       },
       loadDriver({state},all){
        state.AllDriver = all;
         debugger;
       },
       setEntryRemarks({state},all){
        state.entryRemarks = all;
         debugger;
       },
       setDriver({state},all){
        state.entryDriver = all;
         debugger;
       },
       setCompanyDetails({ state }, type) {
        state.companyDetails = type;
      },

      loadAllCompany({ state }, all) {
        state.AllCompanyName = all;
      },

      setCompanyCode({ state }, type) {
        state.CompanyCode = type;
      },

      setDriverName({state}, type){
        state.DriverName = type;
      },
      setEntryID({state}, type){
        state.EntryID = type;
      }
             
  },
});
