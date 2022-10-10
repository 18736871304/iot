<template>
  <el-col :span="24" class="main">
    <!-- 侧边导航 -->
    <Main v-on:childByValue="childByValue"></Main>
    <!-- 导航内容 -->
    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <!-- 顶部导航 -->
        <el-row class="content-tabs">
          <el-button
            type="primary"
            v-for="item in editableTabs"
            :key="item.name"
            class="tabStyle"
          >
            <router-link :to="item.content">{{ item.title }} </router-link>
            <i
              class="el-icon-close el-icon--right"
              @click.stop="removeTab(item.name, $event)"
            ></i>
          </el-button>
        </el-row>
        <div class="hengxian"></div>
        <!-- 具体内容 -->
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </div>
    </section>
  </el-col>
</template>

<script>
import Main from "./main";
export default {
  data() {
    return {
      collapsed: false,
      activeTab: "1", //默认显示的tab
      tabIndex: 1, //tab目前显示数
      editableTabsValue: "",
      editableTabs: [],
      lists: [],
      rouStyle: "",
    };
  },

  components: {
    Main,
  },

  methods: {
    handleopen() {},
    handleclose() {},
    handleselect: function() {},

    //添加面包屑  子父传值， 父元素在这里接受子元素传递过来的值
    childByValue(data, e) {
      var that = this;
      var tabs = this.editableTabs;
      if (tabs.length != 0) {
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].content == data[1] || tabs[i].content == data[0]) {
            return;
          }
        }
      }
      this.editableTabsValue = data[0];
      let navpath = data[1];
      if (data.length == "2" || data[1] == data[2]) {
        navpath = data[0];
      }
      let newTabName = ++this.tabIndex + "";
      if (data.length == "2") {
        this.editableTabs.push({
          title: data[1],
          name: newTabName,
          content: navpath,
        });
      } else {
        this.editableTabs.push({
          title: data[2],
          name: newTabName,
          content: navpath,
        });
      }
      this.editableTabsValue = newTabName;
    },

    //移除tabs
    removeTab(data) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === data[1]) {
        tabs.forEach((tab, index) => {
          if (tab.name === data[index].name) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== data);
    },
  },
};
</script>

<style>
.hengxian {
  height: 13px;
  width: 100%;
  background: #e3e9ed;
  margin-top: 55px;
  z-index: 99;
  position: fixed;
  top: 64px;
}
.breadcrumb-container {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding-left: 30px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
}

.title {
  width: 200px;
  float: left;
  /* color: #475669; */
}

.breadcrumb-inner {
  float: left !important;
  font-size: 21px;
  line-height: 50px;
}

.content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
  margin-top: 70px;
}
.tabStyle,
.tabStyle:hover {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  float: left;
  padding: 10px 7px;
}
.el-icon--right {
  margin-left: 10px;
}
a {
  color: #fff;
  text-decoration: none;
}
.router-link-active {
  color: #606266;
}
.content-tabs {
  margin-bottom: 15px;
  background: #fff;
  padding: 10px 20px;
  margin-left: -15px;
  position: fixed;
  z-index: 200;
  display: flex;
  width: 100%;
  height: 55px;
  overflow: hidden;
  top: 64px;
}
</style>
