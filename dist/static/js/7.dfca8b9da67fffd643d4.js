webpackJsonp([7],{264:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(277),i=n(299),o=n(8),r=o(a.a,i.a,null,null,null);e.default=r.exports},272:function(t,e,n){"use strict";function a(t){return n.i(j.a)({url:"/bugLevel/bugLevelPageInfo",method:"get",params:t})}function i(t){return n.i(j.a)({url:"/bugLevel/insert",method:"post",params:t})}function o(t){return n.i(j.a)({url:"/bugLevel/update",method:"post",params:t})}function r(t){return n.i(j.a)({url:"/bugLevel/delete",method:"post",params:t})}function u(t){return n.i(j.a)({url:"/functionType/pageInfo",method:"get",params:t})}function l(t){return n.i(j.a)({url:"/functionType/getInfo",method:"get",params:t})}function s(t){return n.i(j.a)({url:"/functionType/insert",method:"post",params:t})}function c(t){return n.i(j.a)({url:"/functionType/update",method:"post",params:t})}function f(t){return n.i(j.a)({url:"/functionType/delete",method:"post",params:t})}function p(t){return n.i(j.a)({url:"/difficultLevel/pageInfo",method:"get",params:t})}function d(t){return n.i(j.a)({url:"/difficultLevel/getInfo",method:"get",params:t})}function m(t){return n.i(j.a)({url:"/difficultLevel/insert",method:"post",params:t})}function h(t){return n.i(j.a)({url:"/difficultLevel/update",method:"post",params:t})}function g(t){return n.i(j.a)({url:"/difficultLevel/delete",method:"post",params:t})}function v(t){return n.i(j.a)({url:"/employee/pageInfo",method:"get",params:t})}function b(t){return n.i(j.a)({url:"/employee/getInfo",method:"get",params:t})}function y(t){return n.i(j.a)({url:"/employee/insert",method:"post",params:t})}function _(t){return n.i(j.a)({url:"/employee/update",method:"post",params:t})}function w(t){return n.i(j.a)({url:"/employee/delete",method:"post",params:t})}function T(t){return n.i(j.a)({url:"/module/modulePageInfo",method:"get",params:t})}function I(t){return n.i(j.a)({url:"/module/insert",method:"post",params:t})}function S(t){return n.i(j.a)({url:"/module/update",method:"post",params:t})}function k(t){return n.i(j.a)({url:"/module/delete",method:"post",params:t})}function L(t){return n.i(j.a)({url:"/page/pagePageInfo",method:"get",params:t})}function F(t){return n.i(j.a)({url:"/page/insert",method:"post",params:t})}function z(t){return n.i(j.a)({url:"/page/update",method:"post",params:t})}function C(t){return n.i(j.a)({url:"/page/delete",method:"post",params:t})}function x(t){return n.i(j.a)({url:"/project/projectPageInfo",method:"get",params:t})}function N(t){return n.i(j.a)({url:"/project/insert",method:"post",params:t})}function D(t){return n.i(j.a)({url:"/project/update",method:"post",params:t})}function V(t){return n.i(j.a)({url:"/project/delete",method:"post",params:t})}e.B=a,e.C=i,e.D=o,e.E=r,e.m=u,e.q=l,e.n=s,e.o=c,e.p=f,e.w=p,e.A=d,e.x=m,e.y=h,e.z=g,e.r=v,e.v=b,e.s=y,e.t=_,e.u=w,e.i=T,e.j=I,e.k=S,e.l=k,e.e=L,e.f=F,e.g=z,e.h=C,e.a=x,e.b=N,e.c=D,e.d=V;var j=n(90)},277:function(t,e,n){"use strict";var a=n(28),i=n.n(a),o=n(272);e.a={data:function(){return{list:null,listLoading:!0,state:"insert",form:{functionTypeName:""},params:{functionTypeId:""},pages:{total:"",pageNum:1,pageSize:10},dialogFormVisible:!1}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.listLoading=!0,n.i(o.m)(this.pages).then(function(e){console.log(e),t.pages.total=e.data.totalPage,t.list=e.data.result,t.listLoading=!1})},insertFunctionType:function(){var t=this;return new i.a(function(e,a){n.i(o.n)(t.form).then(function(n){t.dialogFormVisible=!1,e()}).catch(function(t){a(t)})})},updateFunctionType:function(){var t=this;return new i.a(function(e,a){n.i(o.o)(t.form).then(function(n){t.dialogFormVisible=!1,e()}).catch(function(t){a(t.msg)})})},deleteFunctionType:function(){var t=this;return new i.a(function(e,a){n.i(o.p)(t.params).then(function(n){t.dialogFormVisible=!1,e()}).catch(function(t){a(t.msg)})})},getFunctionTypeInfo:function(){var t=this;return new i.a(function(e,a){n.i(o.q)(t.params).then(function(n){t.dialogFormVisible=!1,e()}).catch(function(t){a(t.msg)})})},handleShow:function(t,e,n){this.dialogFormVisible=!0,"insert"==n?this.state="insert":"update"==n?(this.form.functionTypeId=e.functionTypeId,this.form.functionTypeName=e.functionTypeName,this.state="update"):"show"==n&&(this.form=e,this.state="show")},handleSure:function(){"insert"==this.state?n.i(o.n)(this.form):"update"==this.state?n.i(o.o)(this.form):"show"==this.state&&n.i(o.q)(this.form)},handleDelete:function(t,e){var a=this;this.$confirm("确认删除？").then(function(t){a.params.functionTypeId=e.functionTypeId,n.i(o.p)(a.params),done()}).catch(function(t){})},handleSizeChange:function(t){this.pages.pageSize=t,this.fetchData()},handleCurrentChange:function(t){this.pages.pageNum=t,this.fetchData()}}}},299:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{on:{click:function(e){t.handleShow("","","insert")}}},[t._v("新增功能类型")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:t.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:t.list,"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"ID",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.$index)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"功能类型ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.functionTypeId)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"功能类型名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.functionTypeName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"创建时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.createTime)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("i",{staticClass:"el-icon-time"}),t._v(" "),n("span",[t._v(t._s(e.row.updateTime))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"small"},on:{click:function(n){t.handleShow(e.$index,e.row,"show")}}},[t._v("查看")]),t._v(" "),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(n){t.handleShow(e.$index,e.row,"update")}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(n){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":t.currentPage6,"page-size":t.pages.pageSize,"page-sizes":[10,20,30,40],layout:"total, sizes, prev, pager, next, jumper",total:t.pages.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),n("el-dialog",{attrs:{title:"新增功能类型",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[n("el-form",{attrs:{model:t.form}},[n("el-form-item",{attrs:{label:"功能类型名称","label-width":t.formLabelWidth}},[n("el-input",{attrs:{"auto-complete":"off"},model:{value:t.form.functionTypeName,callback:function(e){t.form.functionTypeName=e},expression:"form.functionTypeName"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.handleSure()}}},[t._v("确 定")])],1)],1)],1)},i=[],o={render:a,staticRenderFns:i};e.a=o}});
//# sourceMappingURL=7.dfca8b9da67fffd643d4.js.map