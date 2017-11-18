<template>
  <div>
    <div>
      <img src="../../assets/homelogo_01.png" alt="" style="margin-bottom: -4px;">
    </div>
    <template v-for="item in routes" >
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden" >
        <template slot="title" class="el">
          <i v-if='item.icon' :class="item.icon"></i> {{item.name}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
            <!-- <icon-svg :icon-class="child.icon"/> -->
            
            <i :class="child.icon"></i>
              {{child.name}}<span class=""></span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
} 
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}
.el-menu--dark .el-submenu .el-menu .el-menu-item:hover{

 color: white;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
 background-color: #4ebce6;
 color: white;

}
 .is-active>span{
  display: inline-block;width: 0;height: 0;border-top:6px solid transparent;   border-bottom:6px solid transparent;   border-right:12px solid #fff;
  position: absolute;right: 0;top:38%;
}
.fa{margin-right: 10px}
</style>

