import { BehaviorSubject } from 'rxjs';
import { fetchWrapper, history } from '../_helpers/index';
import {accountService} from './account.service'

const userSubject = new BehaviorSubject(null);
const baseUrl = `https://192.168.1.253:8080/User`;
// const baseUrl = `http://localhost:8080/api/User`;
const baseUrlExternal = `https://192.168.1.253:4042/api/User`;
const baseUrlExternal1 = `https://192.168.1.253:4042/api/User`;
// const commonUrl = `https://192.168.1.253:4042/api/Common`;
const commonUrl = `http://localhost:8880/api/Common`;

const uploadUrl = `https://192.168.1.253:8080/FileUpload`;
const Requsition = `https://192.168.1.253:4042/api/Budget`;
// const Requsition = `http://localhost:8880/api/Budget`;

const testURL = `https://192.168.1.253:4042/api/User`;
// const testcommonUrl = `https://192.168.1.253:4042/api/Common`;
const testcommonUrl = `http://localhost:8880/api/Common`;

const AccountsTest = `https://192.168.1.253:8080/User`;                                
                                
export const commonService = {
    GetGatePassType,
    GetCompanies,
    GetCostCenter,
    GetSubCostCenter,
    GetApprovalUser,
    GetMainMenu,
    GetLocation,
    GetFirstApproval,
    GetSecondApproval,
    GetEmpID,
    GetService,
    GetAssetClass,
    GetAssetSubClassByAssetID,
    GetAllEmp,
    GetItem,
    GetStores,
    GetAssignMenuByEmpID,
    SaveRequest,
    GetPendingApproval,
    GetPendingApprovalDetails,
    ApprovedGatePassRequest,
    GetGatePassStatus,
    uploadVImage,
    GetAllPurpose,
    SaveEntry,
    GetEntryData,
    GetGatePassStatusForSecurityChk,
    UpdateStatusForSecuity,
    UpdateEntryData,
    GetReqCodeByCompany,
    GetReqCompanyInfo,
    GetReqDetails,
    GetGRNDetails,
    StoreIssueSaving,
    StoreIssueNote,
    ReceiverDetails,
    GetAllEntryDataStatus,
    StorePickList,
    UpdateTransportNo,
    GetGatePassForTransportNo,
    GetAllVehicleType,
    GetAllDriver,
    saveVehicleDetails,
    GetAllVehicleDetails,
    GetReqCodeByCompanyForPackingM,
    GetReqDetailsForPackingM,
    StoreIssueSavingPacking,
    StoreIssueNoteForPacking,
    ReceiverDetailsForPackingM,
    GetReqDetailsForChangeApp,
    UpdateReqDetailsForAuth,
    ReqCount,
    SaveSubCostCenterWiseApproval,
    ManuAccessRight,
    GetAllApprovalList,
    UpdateApprovalList,
    GetAllVehicleDetailsWithoutTrip,
    UserListForNotification,
    GetEntryDataForHide,
    UpdateVisibilyOfEntryDate,
    //Added By Mehedee
    RejectTransportAllocation,
    GetAllCompany,
    GetVehiclesForGoodsDelivery,
    GetCompanyAODForDelivery,
    GenerateGatePassForAOD,
};

//Added By Mehedee
function RejectTransportAllocation(RejectTransportAllocation){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(RejectTransportAllocation)
    };
    
    return fetch(`${commonUrl}/RejectTransportAllocation`, requestOptions).then(handleResponse);
}

function GetGatePassType() {
    
    return fetchWrapper.getWith(`${baseUrlExternal}/GetGatePassTypeGatepass`)
        .then(gatepasstype => {

            return gatepasstype;
        });
}
function GetEmpID(SubCostCenterID,GatepassTypeID) {
    return fetchWrapper.post(`${baseUrlExternal}/GetAllEmp`,{SubCostCenterID,GatepassTypeID})
        .then(empID => {
            debugger;
            return empID;              
        });
}
function ManuAccessRight(ID) {
    debugger;
    return fetchWrapper.post(`${AccountsTest}/AssignDefaultManu`,ID)
        .then(empID => {
            debugger;
            return empID;              
        });
}

function ReqCount() {
    debugger;
    return fetchWrapper.post(`${baseUrlExternal}/ReqCount`)
        .then(empID => {
            debugger;
            return empID;
        
        });
}

function GetCompanies() {
    return fetchWrapper.getWith(`${Requsition}/GetCompanies`)
        .then(companies => {
            
            return companies;
        });
}
function GetCostCenter() {
    return fetchWrapper.getWith(`${Requsition}/GetCostCenter`)
        .then(costcenter => {
            return costcenter;
        });
}
function GetSubCostCenter(CostCenterID) {
    debugger;
    return fetchWrapper.post(`${Requsition}/GetSubCostCenterByID`,{CostCenterID})
        .then(subcostcenter => {
              
            return subcostcenter;
        });
}
function GetApprovalUser() {
    return fetchWrapper.getWith(`${Requsition}/GetCompanies`)
        .then(user => {

            return user;
        });
}
function GetMainMenu() {
    return fetchWrapper.getWith(`${baseUrlExternal}/GetCompaniesGatepass`)
        .then(user => {

            return user;
        });
}
function GetGatePassStatusForSecurityChk(GatePassTypeID) {
    return fetchWrapper.post(`${commonUrl}/GetGatePassStatusForSecurityChk`,{GatePassTypeID})
        .then(user => {

            return user;
        });
}
function UpdateApprovalList(UpdateStatusDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(UpdateStatusDetails)
    };
    debugger;
    
    return fetch(`${commonUrl}/UpdateApprovalList`, requestOptions).then(handleResponse);
    
}

function GetReqDetailsForChangeApp(RequestBy) {
    debugger;
    return fetchWrapper.post(`${baseUrlExternal}/GetReqDetailsForChangeApp`,{RequestBy})
        .then(requestDetails => {
              
            return requestDetails;
        });

    }
function GetGatePassForTransportNo() {
    return fetchWrapper.post(`${commonUrl}/GetGatePassForTransportNo`)
        .then(user => {

            return user;
        });
}
function GetEntryDataForHide() {
    return fetchWrapper.post(`${commonUrl}/GetEntryDataForHide`)
        .then(user => {

            return user;
        });
}
function UserListForNotification() {
    return fetchWrapper.post(`${commonUrl}/UserListForNotification`)
        .then(user => {

            return user;
        });
}
function GetAllApprovalList() {
    return fetchWrapper.post(`${commonUrl}/GetAllApprovalList`)
        .then(user => {
            return user;
        });
}
function GetAssignMenuByEmpID(EmpID,ButtonID) {
    return fetchWrapper.post(`${baseUrl}/GetUserAllowedMenubyEmpID`,{EmpID,ButtonID})
        .then(user => {

            return user;
        });
}
function UpdateStatusForSecuity(UpdateStatusDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(UpdateStatusDetails)
    };
    debugger;
    
    return fetch(`${commonUrl}/UpdateStatus`, requestOptions).then(handleResponse);
    
}
function UpdateVisibilyOfEntryDate(UpdateEntryDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(UpdateEntryDetails)
    };
    debugger;
    
    return fetch(`${commonUrl}/UpdateVisibilyOfEntryDate`, requestOptions).then(handleResponse);
    
}
function UpdateReqDetailsForAuth(UpdateStatusDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(UpdateStatusDetails)
    };
    debugger;
    
    return fetch(`${baseUrlExternal}/UpdateReqDetailsForAuth`, requestOptions).then(handleResponse);
    
}
function UpdateEntryData(UpdateStatusDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(UpdateStatusDetails)
    };
    
    return fetch(`${commonUrl}/UpdateEntryOutTime`, requestOptions).then(handleResponse);
    
}
function UpdateTransportNo(UpdateTransportDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(UpdateTransportDetails)
    };
    
    return fetch(`${commonUrl}/UpdateTransportNo`, requestOptions).then(handleResponse);
    
}


function GetLocation(CompanyID) {
    return fetchWrapper.post(`${Requsition}/GetLocationsByCompany`,{CompanyID})
        .then(location => {
        return location;
        });
}
function GetFirstApproval(ApprovalStatusID,SubCostCenterID,GatepassType,LocationID) {
    debugger;
    return fetchWrapper.post(`${testURL}/GetApprovalUserGatepass`, {ApprovalStatusID,SubCostCenterID,GatepassType,LocationID})
        .then(location => {
            debugger;
            return location;
        });
}
function GetSecondApproval(ApprovalStatusID,SubCostCenterID,GatepassType,LocationID) {
    debugger;
    return fetchWrapper.post(`${testURL}/GetApprovalUserGatepass`,{ApprovalStatusID,SubCostCenterID,GatepassType,LocationID})
        .then(location => {  
            return location;
        });
}
function GetGatePassStatus(EmpID) {
    return fetchWrapper.post(`${commonUrl}/GetGatePassStatus`,{EmpID})
        .then(status => {

            return status;
        });
}
function GetService() {
    return fetchWrapper.getWith(`${baseUrlExternal}/GetServiceDepartmentGatepass`)
        .then(service => {
            
            return service;
           
        });
}
function GetAssetClass() {
    return fetchWrapper.post(`${baseUrlExternal}/GetAssetClassGatepass`)
        .then(assets => {

            return assets;
        });
}
function GetAssetSubClassByAssetID(AssetClassID) {
    return fetchWrapper.post(`${baseUrlExternal}/GetAssetSubClassByAssetIDGatepass`,{AssetClassID})
  
        .then(subassets => {
            return subassets;
        });
}
function GetAllEmp(SubCostCenterID,GatepassTypeID) {
    return fetchWrapper.post(`${baseUrlExternal1}/GetAllEmp`,{SubCostCenterID,GatepassTypeID})
  
        .then(emp => {
            return emp;
        });
}
function GetStores() {
    return fetchWrapper.getWith(`${Requsition}/GetStores`)
       .then(emp => {
            return emp;
        });
}
function GetItem(StoresID) {
    return fetchWrapper.post(`${baseUrlExternal}/GetItemDescriptionGatepass`,{StoresID})
       .then(emp => {
           
            return emp;
        });
}
function GetPendingApproval(EmpID) {
    return fetchWrapper.post(`${commonUrl}/GetPendingApproval`,{EmpID})
       .then(emp => {
            return emp;
        });
}
function GetAllPurpose() {
    return fetchWrapper.getWith(`${commonUrl}/GetAllPurpose`)
       .then(emp => {
            return emp;
        });
}
function SaveEntry(name,purpose,image,ToWhom,Remarks,Driver) {
    return fetchWrapper.post(`${commonUrl}/SaveEntry`,{"Name":name,"Purpose":purpose,"Image":image,"ToWhom":ToWhom,"Remarks":Remarks,"Driver":Driver})
       .then(emp => {
            return emp;
        });
}
function GetEntryData() {
    return fetchWrapper.getWith(`${commonUrl}/GetEntryData`,)
       .then(emp => {
            return emp;
        });
}
function GetReqCodeByCompany(CompanyID) {
    return fetchWrapper.post(`${testURL}/GetReqCodeByCompany`,{CompanyID})
       .then(emp => {
            return emp;
        });
}
function GetReqCodeByCompanyForPackingM(CompanyID) {
    return fetchWrapper.post(`${testURL}/GetReqCodeByCompanyForPackingM`,{CompanyID})
       .then(emp => {
            return emp;
        });
}

function GetReqCompanyInfo(ReqHeaderID) {
    return fetchWrapper.post(`${testURL}/GetReqCompanyInfo`,{ReqHeaderID})
       .then(emp => {
            return emp;
        });
}
function GetReqDetails(ReqHeaderID) {
    return fetchWrapper.post(`${testURL}/GetReqDetails`,{ReqHeaderID})
       .then(emp => {
            return emp;
        });
}
function GetReqDetailsForPackingM(ReqHeaderID) {
    return fetchWrapper.post(`${testURL}/GetReqDetailsForPackingM`,{ReqHeaderID})
       .then(emp => {
            return emp;
        });
}
function StorePickList(ReqHeaderID) {
    return fetchWrapper.post(`${testcommonUrl}/StorePickList`,{ReqHeaderID})
       .then(emp => {
            return emp;
        });
}
function SaveSubCostCenterWiseApproval(SubCostCenterID,LocationID,EmpID,ApprovalStatusID,GatepassType) {
    return fetchWrapper.post(`${testcommonUrl}/SaveSubCostCenterWiseApproval`,{SubCostCenterID,LocationID,EmpID,ApprovalStatusID,GatepassType})
       .then(emp => {
            return emp;
        });
}
function GetGRNDetails(ITEM_CODE) {
    debugger;
    return fetchWrapper.post(`${testURL}/GetGRNDetails`,{ITEM_CODE})
       .then(emp => {
            return emp;
        });
}
function StoreIssueNote(IssueHeaderID) {
    debugger;
    return fetchWrapper.post(`${testcommonUrl}/StoreIssueNote`,{IssueHeaderID})
       .then(emp => {
            return emp;
        });
}
function StoreIssueNoteForPacking(IssueHeaderID) {
    debugger;
    return fetchWrapper.post(`${testcommonUrl}/StoreIssueNoteForPacking`,{IssueHeaderID})
       .then(emp => {
            return emp;
        });
}
function GetAllEntryDataStatus(PurposeTypeID,FromDate,ToDate) {
    debugger;
    return fetchWrapper.post(`${testcommonUrl}/GetAllEntryDataStatus`,{PurposeTypeID,FromDate,ToDate})
       .then(emp => {
            return emp;
        });
}
function GetAllVehicleType() {
    debugger;
    return fetchWrapper.post(`${testcommonUrl}/GetAllVehicleType`)
       .then(emp => {
            return emp;
        });
}
function GetAllDriver() {
    debugger;
    return fetchWrapper.post(`${testcommonUrl}/GetAllDriver`)
       .then(emp => {
            return emp;
        });
}
function GetAllVehicleDetails() {
    debugger;
    return fetchWrapper.post(`${testcommonUrl}/GetAllVehicleDetails`)
       .then(emp => {
            return emp;
        });
}
function GetAllVehicleDetailsWithoutTrip() {
    debugger;
    return fetchWrapper.post(`${testcommonUrl}/GetAllVehicleDetailsWithoutTrip`)
       .then(emp => {
            return emp;
        });
}

function saveVehicleDetails(VehicleNo,DriverID,VehicleType,Active,Remarks) {
    debugger;
    return fetchWrapper.post(`${testcommonUrl}/saveVehicleDetails`,{VehicleNo,DriverID,VehicleType,Active,Remarks})
       .then(emp => {
            return emp;
        });
}


function ApprovedGatePassRequest(ApprovedGatePassRequest) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(ApprovedGatePassRequest)
    };
    debugger;
    return fetch(`${commonUrl}/ApprovedGatePassRequest`, requestOptions).then(handleResponse);
   
}

function SaveRequest(RequestVM) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(RequestVM)
    };
    debugger;
    return fetch(`${testcommonUrl}/SaveGatePassRequest`, requestOptions).then(handleResponse);
}
function StoreIssueSaving(RequestVM) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(RequestVM)
    };
    debugger;
    return fetch(`${testcommonUrl}/StoreIssueSaving`, requestOptions).then(handleResponse);
   
}
function StoreIssueSavingPacking(RequestVM) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(RequestVM)
    };
    debugger;
    return fetch(`${testcommonUrl}/StoreIssueSavingPacking`, requestOptions).then(handleResponse);
   
}
function ReceiverDetails(RequestVM) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(RequestVM)
    };
    debugger;
    return fetch(`${testcommonUrl}/ReceiverDetails`, requestOptions).then(handleResponse);
   
}
function ReceiverDetailsForPackingM(RequestVM) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(RequestVM)
    };
    debugger;
    return fetch(`${testcommonUrl}/ReceiverDetailsForPackingM`, requestOptions).then(handleResponse);
   
}


function uploadVImage(upload) {
    const requestOptions = { method: "POST", body: upload, 'content-type': 'multipart/form-data' };
    
    return fetch(`${uploadUrl}/ImageUpload`,requestOptions).then(handleResponseWithoutJson);
    
   
}
function GetPendingApprovalDetails(GatePassReqHeaderID,StatusID,ApproveUserID) {
    return fetchWrapper.post(`${commonUrl}/GetPendingApprovalDetail`,{GatePassReqHeaderID,StatusID,ApproveUserID})
       .then(emp => {
            return emp;
        });
}
function handleResponse(response) {
    return response.text().then(text => {
        
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && accountService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                accountService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function handleResponseWithoutJson(response) {
    return response.text().then(text => {
        
        const data = text;
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && accountService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                accountService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function GetAllCompany() {
    
    return fetchWrapper.getWith(`${commonUrl}/GetAllCompany`)
        .then(companyList => {
            debugger
            return companyList;
        });
}


function GetVehiclesForGoodsDelivery() {
    debugger;
    return fetchWrapper.getWith(`${testcommonUrl}/GetVehiclesForGoodsDelivery`)
       .then(vehicle => {
            return vehicle;
        });
}

function GetCompanyAODForDelivery(CompanyCode) {
    return fetchWrapper.post(`${commonUrl}/GetCompanyAODForDelivery`,{CompanyCode})
       .then(companyDetails => {
            return companyDetails;
        });
}

function GenerateGatePassForAOD(AODForGatePass) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(AODForGatePass)
    };
    debugger;
    
    return fetch(`${commonUrl}/GenerateGatePassForAOD`, requestOptions).then(handleResponse);
    
}

