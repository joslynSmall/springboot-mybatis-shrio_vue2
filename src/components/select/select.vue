<template>
  <el-select v-model="projectId" filterable placeholder="请选择" @change="changed">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
  // import {getFunctionTypeList} from '@/api/basic'
  import * as basic from '@/api/basic'

  export default {
    props: {
      url: {
        type: String,
        default: 'getFunctionTypeList'
      },
      value:String,
      params: {
        type: Object,
        default: function () {
          return {
            total: '',
            pageNum: 1,
            pageSize: 10
          }
        }
      }
    },
    data() {
      return {
        options: [],
        projectId: ''
      }
    },
    mounted() {
      setTimeout(() => {
        this._initData()
      }, 20)
    },
    methods: {
      _initData() {
        basic[this.url](this.params).then(response => {
          console.log(response);
          /* commObj.pages.total = response.data.totalPage
           this.list = response.data.result
           commObj.listLoading = false*/
          let arr = response.data.result;
          let op = new Array();
          var me = this;
          arr.forEach(function (item) {
            op.push(me.getObjFirst(item));
          })
          this.options = op;
        })
      },
      getObjFirst(obj) {
        let obj1 = new Object();
        var index = 0;
        // 过滤继承属性
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            console.log(prop);
            if (index == 0) {
              obj1.value = obj[prop];
            } else if (index == 1) {
              obj1.label = obj[prop];
            }else{
              break;
            }
          }
          index++;
        }
        return obj1;
      },
      changed(newValue){
        this.$emit('change', newValue)
      }
    }
  }
</script>
