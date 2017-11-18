import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

/* login */
const Login = _import('login/index')

/* dashboard */
const dashboard = _import('dashboard/index')

/* error page */
const Err404 = _import('404')

/* demo page */
const Form = _import('page/form')
const Table = _import('table/index')

const BugLevelAdd = _import('basic/bugLevel/bugLevelAdd')
const BugLevelEdit = _import('basic/bugLevel/bugLevelEdit')
const BugLevelView = _import('basic/bugLevel/bugLevelView')
const BugLevelList = _import('basic/bugLevel/bugLevelList')

const FunctionType = _import('basic/functionType')
const DifficultLevel = _import('basic/difficultLevel')
const Employee = _import('basic/employee')
const Page = _import('basic/page')
const Project = _import('basic/project')
const Module = _import('basic/module')
const cmFunction = _import('basic/function')
const Group = _import('basic/group')
const Duty = _import('basic/duty')
const OvertimeTime = _import('basic/overtimeTime')
const TechnologyPreference = _import('basic/technologyPreference')
const TechnologyPreference_Rel = _import('basic/technologyPreference_Rel')
const TaskConfirmResult = _import('basic/taskConfirmResult')
const Role = _import('basic/role')
const BugState = _import('basic/bugState')
const LeaveRecord = _import('business/leaveRecord')
const OvertimeRecord = _import('business/overtimeRecord')
const BugRecord = _import('business/bugRecord')
const ConferenceRecord = _import('business/conferenceRecord')
const ConfeRecordEmployee_Rel = _import('business/confeRecordEmployee_Rel')
const Formpages = _import('basic/formpages')
const Projecttasks = _import('business/projectTasks')
const ProjectConfirmation = _import('business/projectConfirmation')
const WorkPlan = _import('business/workPlan')
Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'fa fa-list-alt',
    children: [
      { path: 'index', component: Form, name: 'Form', icon: 'zonghe', meta: { role: [1,2] } }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', component: Table, name: 'Table', meta: { role: ['1'] }}]
  },
  {
    path: '/basic',
    component: Layout,
    redirect: 'noredirect',
    name: '基础信息',
    icon: 'fa fa-list-alt',
    children: [
      { path: 'bugLevelList', component: BugLevelList, name: 'Bug等级', icon: 'fa fa-list-ol'},
      { path: 'bugLevelAdd', component: BugLevelAdd, name: 'Bug等级新增', icon: 'fa fa-list-ol'},
      { path: 'bugLevelEdit', component: BugLevelEdit, name: 'Bug等级编辑', icon: 'fa fa-list-ol'},
      { path: 'bugLevelView', component: BugLevelView, name: 'Bug等级查看', icon: 'fa fa-list-ol'},
      { path: 'functionType', component: FunctionType, name: '功能类型', icon: 'fa fa-crosshairs' },
      { path: 'difficultLevel', component: DifficultLevel, name: '功能难度等级', icon: 'fa fa-exclamation-triangle' },
      { path: 'employee', component: Employee, name: '员工信息', icon: 'fa fa-user' },
      { path: 'duty', component: Duty, name: '职位信息', icon: 'fa fa-users' },
      { path: 'page', component: Page, name: '页面信息', icon: 'fa fa-file-text' },
      { path: 'project', component: Project, name: '项目信息', icon: 'fa fa-book' },
      { path: 'module', component: Module, name: '模块信息', icon: 'fa fa-sitemap' },
      { path: 'function', component: cmFunction, name: '功能信息', icon: 'fa fa-newspaper-o' },
      { path: 'overtimeTime', component: OvertimeTime, name: '时段信息', icon: 'fa fa-edit' },
      { path: 'technologyPreference', component: TechnologyPreference, name: '技术偏好信息', icon: 'fa fa-edit' },
      { path: 'technologyPreference_Rel', component: TechnologyPreference_Rel, name: '技术偏好与员工信息', icon: 'fa fa-edit' },
      { path: 'group', component: Group, name: '项目组信息', icon: 'fa fa-window-restore' },
      { path: 'bugState', component: BugState, name: 'Bug状态', icon: 'fa fa-window-restore' },
      { path: 'role', component: Role, name: '角色信息', icon: 'fa fa-window-restore' },
      { path: 'taskConfirmResult', component: TaskConfirmResult, name: '任务确认结果', icon: 'fa fa-window-restore' }

    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: 'noredirect',
    name: '日常管理',
    icon: 'fa fa-list-alt',
    children: [
      { path: 'workPlan', component: WorkPlan, name: '项目工作计划信息', icon: 'fa fa-edit' },
      { path: 'overtimeRecord', component: OvertimeRecord, name: '加班记录信息', icon: 'fa fa-edit' },
      { path: 'leaveRecord', component: LeaveRecord, name: '请假记录', icon: 'fa fa-edit' },
      { path: 'bugRecord', component: BugRecord, name: 'Bug记录信息', icon: 'fa fa-window-restore' },
      { path: 'conferenceRecord', component: ConferenceRecord, name: '会议记录信息', icon: 'fa fa-window-restore' },
      { path: 'confeRecordEmployee_Rel', component: ConfeRecordEmployee_Rel, name: '会议记录与员工信息', icon: 'fa fa-window-restore' },
      { path: 'formpages', component: Formpages, name: '项目工作计划', icon: 'fa fa-th-large' },
      { path: 'projectTasks', component: Projecttasks, name: '项目工作任务', icon: 'fa fa-window-restore' },
      { path: 'projectConfirmation', component: ProjectConfirmation, name: '项目工作任务确认', icon: 'fa fa-window-restore'}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
