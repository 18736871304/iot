<template>
  <el-aside :class="isCollapse ? 'menu-collapsed' : 'menu-expanded'">
    <!-- 折叠按钮 -->
    <!--导航菜单   v-show="!collapsed"  :collapse="isCollapse"-->
    <el-menu
      background-color="#fff"
      text-color="#606266"
      active-text-color="#409eff"
      unique-opened
      router
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      @open="handleopen"
      @close="handleclose"
      @select="handleselect"
      :collapse="isCollapse"
    >
      <template v-for="(item, index) in rightList" >
        <el-submenu :key='index'
          :index="index + ''"
          style="text-align: left;  color:#fff"
        >
          <template slot="title">
            <i
              :class="item.icon"
              class="el-icon-message"
              style="margin-right:5px; color:#fff"
            ></i>
            <span slot="title">{{ item.menuname }}</span>
          </template>

          <el-menu-item
            class="child"
            v-for="(child, index) in item.childmenu"
            :index="child.path"
            :key="index"
            >{{ child.menuname }}</el-menu-item
          >
        </el-submenu>
        <!-- 预防一级菜单有内容 -->
        <el-menu-item
          :key="item.index"
          v-if="item.leaf && item.child.length > 0"
          :index="item.child[0].path"
          style="text-align: left; color:#fff"
        >
          <i
            :class="item.icon"
            class="el-icon-s-data"
            style="margin-right:5px; color:#fff"
          ></i>
          <span slot="title">{{ item.child[0].menuname }}</span>
        </el-menu-item>
      </template>
    </el-menu>

    <!--导航菜单-折叠后-->
  </el-aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeTab: "1", //默认显示的tab
      tabIndex: 1, //tab目前显示数
      // isCollapse: false,
      // rightList: [],
    };
  },

  computed: mapState({
    ...mapState(["isCollapse"]),
  
    rightList() {
      return eval("(" + this.$store.state.rightList + ")"); //用computed接收
    },
  }),

  created() {
    
  },

  methods: {
    handleopen() {},
    handleclose() {},

    handleselect: function(key, keyPath) {

      if (key == null) {
        return;
      }
      var aaa = "";
      var lists = this.rightList;

      for (let i = 0; i < lists.length; i++) {
        if (lists[i].childmenu) {
          var bbb = lists[i].childmenu;
          for (let j = 0; j < bbb.length; j++) {
            if (keyPath[1] == bbb[j].path || keyPath[0] == bbb[j].path) {
              aaa = bbb[j].menuname;
            }
          }
        } else {
          if (keyPath[1] == lists[i].path || keyPath[0] == lists[i].path) {
            aaa = lists[i].menuname;
          }
        }
      }
      keyPath.push(aaa);
      // childByValue是在父组件on监听的方法
      // 子父传值
      // 第二个参数this.childValue是需要传的值
      this.$emit("childByValue", keyPath);
    },
  },
};
</script>

<style>
.shrinkBtn {
  width: 100%;
  transform: rotate(180deg);
  font-size: 26px !important;
}
.expandBtn {
  font-size: 26px !important;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.header {
  width: 100%;
  /* background: #20a0ff; */
}

.el-icon-s-fold {
  font-size: 34px;
  color: #fff;
  line-height: 60px;
}

.username {
  font-size: 15px;
  color: #fff;
  display: inline-block;
}
.username span {
  margin-left: 10px;
  margin-right: 5px;
}

.main {
  display: flex;
  position: absolute;
  top: 64px;
  bottom: 0px;
  overflow: hidden;
}
.main aside {
  flex: 0 0 190px;
  width: 190px;
  background-color: rgb(42, 104, 201);
  overflow-y: hidden;
}

.el-menu-vertical-demo,
.child {
  background-color: #eef1f6;
}

.item {
  position: relative;
}
menu-collapsed.main aside
.submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}

.menu-collapsed {
  flex: 0 0 65px !important;
  width: 60px;
}

.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
}

.title {
  width: 200px;
  float: left;
  color: #fff;
}

.breadcrumb-inner {
  float: left;
}

.content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
      margin-top: 70px;
}


.fa-home {
  font-size: 20px;
}

.gg {
  position: absolute;
  top: 0px;
  left: 228px;
  z-index: 100;
}
.el-radio-group1 {
  position: absolute;
  top: 0px;
  left: 66px;
  z-index: 100;
}
.el-submenu__title .el-submenu__icon-arrow {
  color: #fff;
}
.el-submenu .el-menu-item{
  min-width: 100px;
      /* font-weight: bold; */
}
.el-submenu__title i{
  color: #606266!important;
}
.el-menu .is-active{
  background: #eef1f6 !important;
}
.el-submenu__title{
font-weight: bold;
}
</style>
