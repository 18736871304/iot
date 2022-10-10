<template>
  <el-col :span="24" class="header">
    <el-col :span="1">
      <!-- <img src="../../assets/user.png" alt="" class="logo_img"> -->
    </el-col>
    <el-col
      :span="14"
      :class="isCollapse ? 'nologo' : 'logo'"
      style=" font-size: 24px;"
      >{{ sysName }}</el-col
    >

    <el-col :span="2">
      <el-radio-group
        v-model="isCollapse"
        :class="isCollapse ? 'el-radio-group1' : 'el-radio-group gg'"
      >
        <i
          v-show="!isCollapse"
          class="el-icon-s-fold expandBtn"
          @click="Collapse"
        ></i>
        <i
          v-show="isCollapse"
          class="el-icon-s-fold shrinkBtn"
          @click="noCollapse"
        ></i>
      </el-radio-group>
    </el-col>

    <!-- <el-col :span="2" class="nav_head">
      <el-tooltip class="item" effect="dark" content="" placement="nav1">
        <p class="nav_head" multiBtn @click="$router.push('/page1')">
          nav1
        </p>
      </el-tooltip>
    </el-col>
    <el-col :span="2" class="nav_head">
      <el-tooltip class="item" effect="dark" content="" placement="nav2">
        <p class="nav_head" multiBtn @click="$router.push('/page2')">
          nav2
        </p>
      </el-tooltip>
    </el-col>
    <el-col :span="2" class="nav_head">
      <el-tooltip class="item" effect="dark" content="" placement="nav3">
        <p class="nav_head" multiBtn @click="$router.push('/page3')">
          nav3
        </p>
      </el-tooltip>
    </el-col>

    <el-col :span="2">
      <el-dropdown trigger="hover" placement="bottom" @command="handleCommand">
        <p class="el-dropdown-link nav_head" multiBtn command="profile">
          nav4<i class="el-icon-arrow-down el-icon--right"></i>
        </p>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人信息</el-dropdown-item>
          <el-dropdown-item command="updatePass">修改信息</el-dropdown-item>
          <el-dropdown-item command="logout">删除信息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col> -->

    <el-col :span="2" class="userinfo userinfo1">
      <el-dropdown trigger="hover">
        <div class="el-dropdown-link userinfo-inner">
          <img src="../../assets/user.png" />
          <div class="username">
            <span>用户，您好</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>

        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改头像</el-dropdown-item>
          <el-dropdown-item>项目仓库</el-dropdown-item> -->
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>
</template>

<script>
import { logout } from "../../api/api";
export default {
  data() {
    return {
      sysName: "业务管理系统",
      sysUserName: "",
      sysUserAvatar: "",
      isCollapse: false,
    };
  },

  methods: {
    Collapse: function() {
      this.isCollapse = true;
      this.$store.commit("setCollapse", true);
    },
    noCollapse: function() {
      this.isCollapse = false;
      this.$store.commit("setCollapse", false);
    },
    logout: function() {
      var that = this;

      this.$confirm("确认退出吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          var reporParams = {
            userToken: sessionStorage.getItem("token"),
          };
          logout(reporParams).then((res) => {
             sessionStorage.removeItem("rightList");
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("username");
              that.$router.push("/login");
            // if (res.code == "0") {
            //   sessionStorage.removeItem("rightList");
            //   sessionStorage.removeItem("token");
            //   sessionStorage.removeItem("username");
            //   that.$router.push("/login");
            // } else {
            //   // that.$message({
            //   //   type: "error",
            //   //   duration: 3000,
            //   //   message: "退出登录失败",
            //   // });
            //   that.$router.push("/login");
            // }
          });
        })
        .catch(() => {});
    },
    // nav1: function() {
    //   this.$router.push({
    //     path: "/from",
    //   });
    // },
    //个人信息路由跳转
    // handleCommand(command) {
    //   if (command === "profile") {
    //     this.$router.push({
    //       path: "/from",
    //     });
    //   } else if (command === "updatePass") {
    //     this.$router.push({
    //       path: "/list",
    //     });
    //   } else if (command == "logout") {
    //     this.$router.push({
    //       path: "/table",
    //     });
    //   }
    // },
  },
};
</script>
<style>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.header {
  width: 100%;
  height: 64px;
  background: url(../../assets/header.jpg) no-repeat center;
  background-size: 100% 100%;
}

.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
}
.logo_img {
  width: 60px;
  height: 60px;
}
.logo {
  width: 200px;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.nologo {
  display: none;
}

.nav_head {
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  margin: 0 auto;
}

.tools {
  padding: 0px 23px;
  width: 40px;
  line-height: 60px;
  cursor: pointer;
}
.el-icon-s-fold {
  font-size: 34px;
  color: #fff;
  line-height: 60px;
}
.userinfo-inner {
  display: inline-block;
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

.userinfo-inner img {
  width: 40px;
  height: 40px;
  margin: 10px auto;
  vertical-align: middle;
  border-radius: 50%;
}
.huanfu {
  width: 35px;
  height: 35px;
  color: #fff;
  fill: currentColor;
  margin: 12.5px auto;
}
.fangda {
  width: 30px;
  height: 30px;
  color: #fff;
  fill: currentColor;
  margin: 15px auto;
}
.userinfo {
  width: 60px;
  float: right;
  cursor: pointer;
}
.userinfo1 {
  width: 200px;
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
}

.el-menu {
  height: 100%;
}

.collapsed {
  width: 60px;
}
.item {
  position: relative;
}

.submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}

.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
}

.content-container {
  flex: 1;
  overflow-y: scroll;
  /* padding:0 15px 20px; */
  padding:0 0px 20px;
  /* background:#E3E9ED; */
  border-left: 15px solid #E3E9ED;
}

.title {
  width: 200px;
  float: left;
  color: #475669;
}

.breadcrumb-inner {
  float: right;
}

.content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
      margin-top: 70px;
}
</style>
