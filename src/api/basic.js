import fetch from '@/utils/fetch'

// bug等级
export function getBugLevelList(params) {
  return fetch({
    url: '/bugLevel/bugLevelPageInfo',
    method: 'get',
    params
  })
}

export function insertBugLevel(params) {
  return fetch({
    url: '/bugLevel/insert',
    method: 'post',
    params
  })
}

export function updateBugLevel(params) {
  return fetch({
    url: '/bugLevel/update',
    method: 'post',
    params
  })
}

export function deleteBugLevelByPrimaryKey(params) {
  return fetch({
    url: '/bugLevel/delete',
    method: 'post',
    params
  })
}

// 功能表
export function getFunctionList(params) {
  return fetch({
    url: '/functionType/functionListPageInfo',
    method: 'get',
    params
  })
}

export function insertFunction(params) {
  return fetch({
    url: '/functionType/insert',
    method: 'post',
    params
  })
}

export function updateFunction(params) {
  return fetch({
    url: '/functionType/update',
    method: 'post',
    params
  })
}

export function deleteFunctionByPrimaryKey(params) {
  return fetch({
    url: '/functionType/delete',
    method: 'post',
    params
  })
}

export function getFunctionTypeList(params) {
  return fetch({
    url: '/functionType/functionTypePageInfo',
    method: 'get',
    params
  })
}

export function getFunctionTypeInfo(params) {
  return fetch({
    url: '/functionType/getFunctionTypeInfo',
    method: 'get',
    params
  })
}

export function insertFunctionType(params) {
  return fetch({
    url: '/functionType/insert',
    method: 'post',
    params
  })
}

export function updateFunctionType(params)
{
  return fetch({
    url: '/functionType/update',
    method: 'post',
    params
  })
}

export function deleteFunctionType(params)
{
  return fetch({
    url: '/functionType/delete',
    method: 'post',
    params
  })
}

export function getDifficultLevelList(params)
{
  return fetch({
    url: '/difficultLevel/difficultLevelPageInfo',
    method: 'get',
    params
  })
}

export function getDifficultLevelInfo(params)
{
  return fetch({
    url: '/difficultLevel/getDifficultLevelInfo',
    method: 'get',
    params
  })
}

export function insertDifficultLevel(params)
{
  return fetch({
    url: '/difficultLevel/insert',
    method: 'post',
    params
  })
}

export function updateDifficultLevel(params)
{
  return fetch({
    url: '/difficultLevel/update',
    method: 'post',
    params
  })
}

export function deleteDifficultLevel(params)
{
  return fetch({
    url: '/difficultLevel/delete',
    method: 'post',
    params
  })
}

export function getEmployeeList(params)
{
  return fetch({
    url: '/employee/getEmployeeList',
    method: 'get',
    params
  })
}

export function getEmployeeInfo(params)
{
  return fetch({
    url: '/employee/getEmployeeInfo',
    method: 'get',
    params
  })
}

export function insertEmployee(params)
{
  return fetch({
    url: '/employee/insert',
    method: 'post',
    params
  })
}

export function updateEmployee(params)
{
  return fetch({
    url: '/employee/update',
    method: 'post',
    params
  })
}

export function deleteEmployee(params)
{
  return fetch({
    url: '/employee/delete',
    method: 'post',
    params
  })
}

export function getModuleList(params)
{
  return fetch({
    url: '/module/modulePageInfo',
    method: 'get',
    params
  })
}

export function getModuleInfo(params)
{
  return fetch({
    url: '/module/getModuleInfo',
    method: 'get',
    params
  })
}

export function insertModule(params)
{
  return fetch({
    url: '/module/insert',
    method: 'post',
    params
  })
}

export function updateModule(params)
{
  return fetch({
    url: '/module/update',
    method: 'post',
    params
  })
}

export function deleteModule(params)
{
  return fetch({
    url: '/module/delete',
    method: 'post',
    params
  })
}

export function getPageList(params)
{
  return fetch({
    url: '/page/pagePageInfo',
    method: 'get',
    params
  })
}

export function getPageInfo(params)
{
  return fetch({
    url: '/page/getPageInfo',
    method: 'get',
    params
  })
}

export function insertPage(params)
{
  return fetch({
    url: '/page/insert',
    method: 'post',
    params
  })
}

export function updatePage(params)
{
  return fetch({
    url: '/page/update',
    method: 'post',
    params
  })
}

export function deletePage(params)
{
  return fetch({
    url: '/page/delete',
    method: 'post',
    params
  })
}

export function getProjectList(params)
{
  return fetch({
    url: '/project/projectPageInfo',
    method: 'get',
    params
  })
}

export function getProjectInfo(params)
{
  return fetch({
    url: '/project/getProjectInfo',
    method: 'get',
    params
  })
}

export function insertProject(params)
{
  return fetch({
    url: '/project/insert',
    method: 'post',
    params
  })
}

export function updateProject(params)
{
  return fetch({
    url: '/project/update',
    method: 'post',
    params
  })
}

export function deleteProject(params)
{
  return fetch({
    url: '/project/delete',
    method: 'post',
    params
  })
}

export function getOvertimeRecordList(params)
{
  return fetch({
    url: '/overtimeRecord/overtimeRecordPageInfo',
    method: 'get',
    params
  })
}

export function getOvertimeRecordInfo(params)
{
  return fetch({
    url: '/overtimeRecord/getOvertimeRecordInfo',
    method: 'get',
    params
  })
}

export function insertOvertimeRecord(params)
{
  return fetch({
    url: '/overtimeRecord/insert',
    method: 'post',
    params
  })
}

export function updateOvertimeRecord(params)
{
  return fetch({
    url: '/overtimeRecord/update',
    method: 'post',
    params
  })
}

export function deleteOvertimeRecord(params)
{
  return fetch({
    url: '/overtimeRecord/delete',
    method: 'post',
    params
  })
}

export function insertLeaveRecord(params)
{
  return fetch({
    url: '/leaveRecord/insert',
    method: 'post',
    params
  })
}

export function deleteLeaveRecord(params)
{
  return fetch({
    url: '/leaveRecord/delete',
    method: 'post',
    params
  })
}

export function updateLeaveRecord(params)
{
  return fetch({
    url: '/leaveRecord/update',
    method: 'post',
    params
  })
}

export function getLeaveRecordInfo(params)
{
  return fetch({
    url: '/leaveRecord/getModelDetailInfo',
    method: 'get',
    params
  })
}

export function getLeaveRecordPageInfoList(params)
{
  return fetch({
    url: '/leaveRecord/getPageInfo',
    method: 'get',
    params
  })
}

export function insertDuty(params)
{
  return fetch({
    url: '/duty/insert',
    method: 'post',
    params
  })
}

export function deleteDuty(params)
{
  return fetch({
    url: '/duty/delete',
    method: 'post',
    params
  })
}

export function updateDuty(params)
{
  return fetch({
    url: '/duty/update',
    method: 'post',
    params
  })
}

export function getDutyInfo(params)
{
  return fetch({
    url: '/duty/getDutyInfo',
    method: 'get',
    params
  })
}

export function getDutyList(params)
{
  return fetch({
    url: '/duty/dutyPageInfo',
    method: 'get',
    params
  })
}

export function insertOvertimeTime(params)
{
  return fetch({
    url: '/overtimeTime/insert',
    method: 'post',
    params
  })
}

export function deleteOvertimeTime(params)
{
  return fetch({
    url: '/overtimeTime/delete',
    method: 'post',
    params
  })
}

export function updateOvertimeTime(params)
{
  return fetch({
    url: '/overtimeTime/update',
    method: 'post',
    params
  })
}

export function getOvertimeTimeInfo(params)
{
  return fetch({
    url: '/overtimeTime/getOvertimeTimeInfo',
    method: 'get',
    params
  })
}

export function getOvertimeTimeList(params)
{
  return fetch({
    url: '/overtimeTime/overtimeTimePageInfo',
    method: 'get',
    params
  })
}

export function insertTechnologyPreference(params)
{
  return fetch({
    url: '/technologyPreference/insert',
    method: 'post',
    params
  })
}

export function deleteTechnologyPreference(params)
{
  return fetch({
    url: '/technologyPreference/delete',
    method: 'post',
    params
  })
}

export function updateTechnologyPreference(params)
{
  return fetch({
    url: '/technologyPreference/update',
    method: 'post',
    params
  })
}

export function getTechnologyPreferenceInfo(params)
{
  return fetch({
    url: '/technologyPreference/getTechnologyPreferenceInfo',
    method: 'get',
    params
  })
}

export function getTechnologyPreferenceList(params)
{
  return fetch({
    url: '/technologyPreference/technologyPreferencePageInfo',
    method: 'get',
    params
  })
}

export function insertTechnologyPreference_Rel(params)
{
  return fetch({
    url: '/technologyPreference_Rel/insert',
    method: 'post',
    params
  })
}

export function deleteTechnologyPreference_Rel(params)
{
  return fetch({
    url: '/technologyPreference_Rel/delete',
    method: 'post',
    params
  })
}

export function updateTechnologyPreference_Rel(params)
{
  return fetch({
    url: '/technologyPreference_Rel/update',
    method: 'post',
    params
  })
}

export function getTechnologyPreference_RelInfo(params)
{
  return fetch({
    url: '/technologyPreference_Rel/getTechnologyPreference_RelInfo',
    method: 'get',
    params
  })
}

export function getTechnologyPreference_RelList(params)
{
  return fetch({
    url: '/technologyPreference_Rel/technologyPreference_RelPageInfo',
    method: 'get',
    params
  })
}

export function insertBugState(params)
{
  return fetch({
    url: '/bugState/insert',
    method: 'post',
    params
  })
}

export function deleteBugState(params)
{
  return fetch({
    url: '/bugState/delete',
    method: 'post',
    params
  })
}

export function updateBugState(params)
{
  return fetch({
    url: '/bugState/update',
    method: 'post',
    params
  })
}

export function getBugStateInfo(params)
{
  return fetch({
    url: '/bugState/getBugStateInfo',
    method: 'get',
    params
  })
}

export function getBugStateList(params)
{
  return fetch({
    url: '/bugState/bugStatePageInfo',
    method: 'get',
    params
  })
}

export function insertRole(params)
{
  return fetch({
    url: '/role/insert',
    method: 'post',
    params
  })
}

export function deleteRole(params)
{
  return fetch({
    url: '/role/delete',
    method: 'post',
    params
  })
}

export function updateRole(params)
{
  return fetch({
    url: '/role/update',
    method: 'post',
    params
  })
}

export function getRoleInfo(params)
{
  return fetch({
    url: '/role/getRoleInfo',
    method: 'get',
    params
  })
}

export function getRoleList(params)
{
  return fetch({
    url: '/role/rolePageInfo',
    method: 'get',
    params
  })
}

export function insertTaskConfirmResult(params)
{
  return fetch({
    url: '/taskConfirmResult/insert',
    method: 'post',
    params
  })
}

export function deleteTaskConfirmResult(params)
{
  return fetch({
    url: '/taskConfirmResult/delete',
    method: 'post',
    params
  })
}

export function updateTaskConfirmResult(params)
{
  return fetch({
    url: '/taskConfirmResult/update',
    method: 'post',
    params
  })
}

export function getTaskConfirmResultInfo(params)
{
  return fetch({
    url: '/taskConfirmResult/getTaskConfirmResultInfo',
    method: 'get',
    params
  })
}

export function getTaskConfirmResultList(params)
{
  return fetch({
    url: '/taskConfirmResult/taskConfirmResultPageInfo',
    method: 'get',
    params
  })
}

export function insertBugRecord(params)
{
  return fetch({
    url: '/bugRecord/insert',
    method: 'post',
    params
  })
}

export function deleteBugRecord(params)
{
  return fetch({
    url: '/bugRecord/delete',
    method: 'post',
    params
  })
}

export function updateBugRecord(params)
{
  return fetch({
    url: '/bugRecord/update',
    method: 'post',
    params
  })
}

export function getBugRecordInfo(params)
{
  return fetch({
    url: '/bugRecord/getBugRecordInfo',
    method: 'get',
    params
  })
}

export function getBugRecordList(params)
{
  return fetch({
    url: '/bugRecord/bugRecordPageInfo',
    method: 'get',
    params
  })
}

export function insertConferenceRecord(params)
{
  return fetch({
    url: '/conferenceRecord/insert',
    method: 'post',
    params
  })
}

export function deleteConferenceRecord(params)
{
  return fetch({
    url: '/conferenceRecord/delete',
    method: 'post',
    params
  })
}

export function updateConferenceRecord(params)
{
  return fetch({
    url: '/conferenceRecord/update',
    method: 'post',
    params
  })
}

export function getConferenceRecordInfo(params)
{
  return fetch({
    url: '/conferenceRecord/getConferenceRecordInfo',
    method: 'get',
    params
  })
}

export function getConferenceRecordList(params)
{
  return fetch({
    url: '/conferenceRecord/conferenceRecordPageInfo',
    method: 'get',
    params
  })
}

export function insertConfeRecordEmployee_Rel(params)
{
  return fetch({
    url: '/confeRecordEmployee_Rel/insert',
    method: 'post',
    params
  })
}

export function deleteConfeRecordEmployee_Rel(params)
{
  return fetch({
    url: '/confeRecordEmployee_Rel/delete',
    method: 'post',
    params
  })
}

export function updateConfeRecordEmployee_Rel(params)
{
  return fetch({
    url: '/confeRecordEmployee_Rel/update',
    method: 'post',
    params
  })
}

export function getConfeRecordEmployee_RelInfo(params)
{
  return fetch({
    url: '/confeRecordEmployee_Rel/getConfeRecordEmployee_RelInfo',
    method: 'get',
    params
  })
}

export function getConfeRecordEmployee_RelList(params)
{
  return fetch({
    url: '/confeRecordEmployee_Rel/confeRecordEmployee_RelPageInfo',
    method: 'get',
    params
  })
}

export function insertGroup(params)
{
  return fetch({
    url: '/group/insert',
    method: 'post',
    params
  })
}

export function deleteGroup(params)
{
  return fetch({
    url: '/group/delete',
    method: 'post',
    params
  })
}

export function updateGroup(params)
{
  return fetch({
    url: '/group/update',
    method: 'post',
    params
  })
}

export function getGroupInfo(params)
{
  return fetch({
    url: '/group/getGroupInfo',
    method: 'get',
    params
  })
}

export function getGroupList(params)
{
  return fetch({
    url: '/group/groupPageInfo',
    method: 'get',
    params
  })
}

export function insertWorkPlan(params) {
  return fetch({
    url: '/workPlan/insert',
    method: 'post',
    params
  })
}

export function deleteWorkPlan(params) {
  return fetch({
    url: '/workPlan/delete',
    method: 'post',
    params
  })
}

export function updateWorkPlan(params) {
  return fetch({
    url: '/workPlan/update',
    method: 'post',
    params
  })
}

export function getWorkPlanInfo(params) {
  return fetch({
    url: '/workPlan/getWorkPlanInfo',
    method: 'get',
    params
  })
}

export function getWorkPlanList(params) {
  return fetch({
    url: '/workPlan/workPlanPageInfo',
    method: 'get',
    params
  })
}

export function insertProjectTasks(params) {
  return fetch({
    url: '/projectTasks/insert',
    method: 'post',
    params
  })
}

export function deleteProjectTasks(params) {
  return fetch({
    url: '/projectTasks/delete',
    method: 'post',
    params
  })
}

export function updateProjectTasks(params) {
  return fetch({
    url: '/projectTasks/update',
    method: 'post',
    params
  })
}

export function getProjectTasksInfo(params) {
  return fetch({
    url: '/projectTasks/getProjectTasksInfo',
    method: 'get',
    params
  })
}

export function getProjectTasksList(params) {
  return fetch({
    url: '/projectTasks/workPlanPageInfo',
    method: 'get',
    params
  })
}
