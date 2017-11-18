import store from '../store'
export  { baseObj }
var baseObj = {
  title: '',
  listLoading: true,
  loadingText:'拼命加载中...',
  pages: {
    total: '',
    pageNum: 1,
    pageSize: 10
  },
  dialogFormVisible: false,
  detailFormVisible: false,
  dialogFormVisible_1: false,
  dialogFormVisibleBUG: false,
  isEdit: 0,
  // 权限判断
  hasBtnPermission: function(permission) {
    if (store.getters.permissions.indexOf(permission) > -1) {
      return true
    } else {
      return false
    }
  }
}
