<template>
  <div>
    <div class="search">
      <div class="common_hang">
        <div class="mech">操作人姓名</div>
        <el-input v-model="name" placeholder="请输入内容" clearable></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">手机号</div>
        <el-input
          v-model="mobile"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">用户类型</div>
        <el-select v-model="userType" placeholder="请选择" clearable>
          <el-option
            v-for="item in getDictList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getAgentList(1)">查询</el-button>
      <el-button type="primary" @click="addMenu">新增</el-button>
    </div>

    <div class="table_list">
      <el-table
        :data="getAgentListList"
        :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
        highlight-current-row
        border
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          width="40"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="alipayname"
          label="支付宝姓名"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="alipayid"
          label="支付宝账号"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="操作人"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="makedatestr"
          label="最后一次操作时间"
          width="190"
          align="center"
         
        ></el-table-column>

        <el-table-column label="操作" align="center" width="auto">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="small" @click="handleDel(scope.row)"
              >删除</el-button
            >
            <!-- <el-button size="small" @click="customerToAgent(scope.row)"
              >客户转代理人</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="pageClick"
        :page-size="pageSize"
        :current-page="pageNum"
        layout="total, prev, pager, next"
        :total="pageTotal"
        class="indexPage"
      >
      </el-pagination>
    </div>

    <el-dialog
      title=""
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form class="dia_from">
        <div class="two">
          <el-form-item label="姓名">
            <el-input
              v-model="dia_name"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              v-model="dia_mobile"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </div>
        <div class="two">
          <el-form-item label="支付宝姓名">
            <el-input
              v-model="alipayname"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="支付宝账号">
            <el-input
              v-model="alipayid"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </div>
        <div class="two">
          <el-form-item label="谁的客户">
            <el-input
              v-model="dia_reuserid"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="dia_usertype" placeholder="请选择" clearable>
              <el-option
                v-for="item in getDictList"
                :key="item.dd_key"
                :label="item.dd_value"
                :value="item.dd_key"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAgentList,
  addAgent,
  editAgent,
  deleteAgent,
  customerToAgent,
  getDict,
} from "../../api/api";
export default {
  data() {
    return {
      getDictList: "",
      name: "",
      mobile: "",
      userType: "",
      addhtmlcontent: "",
      getAgentListList: [],
      dialogFormVisible: false,
      alipayname: "",
      alipayid: "",
      dia_mobile: "",
      dia_name: "",
      dia_reuserid: "",
      dia_usertype: "",
      dia_userid: "",
      dia_userid: "",
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,

      currentRow: null,
    };
  },
  created() {
    this.getAgentList(1);
    this.getDict();
  },
  methods: {
    getDict() {
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        dict_type: "usertype",
      };
      getDict(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.getDictList = res;
        }
      });
    },

    // 获取表单
    getAgentList(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        usertype: "",
        mobile: this.mobile,
        name: this.name,
        //   htmlcontent: this.htmlcontent,
        pageNumber: page,
        pageSize: this.pageSize,
      };
      getAgentList(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.getAgentListList = res.rows;
          this.pageTotal = res.total;
        }
      });
    },
    // 确认新增或修改
    sureAdd() {
      var that = this;
      if (this.dia_userid == "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          alipayname: this.alipayname,
          alipayid: this.alipayid,
          mobile: this.dia_mobile,
          name: this.dia_name,
          reuserid: this.dia_reuserid,
          usertype: this.dia_usertype,
        };
        addAgent(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.dialogFormVisible = false;
            that.getAgentList(1);
            that.clearINput();
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "添加失败",
            });
          }
        });
      } else {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          alipayname: this.alipayname,
          alipayid: this.alipayid,
          mobile: this.dia_mobile,
          name: this.dia_name,
          userid: this.dia_userid,
          usertype: this.dia_usertype,
        };

        editAgent(reporParams).then((res) => { 
          console.log(res);
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.dialogFormVisible = false;
            that.getAgentList(1);
            that.clearINput();
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "修改失败",
            });
          }
        });
      }
    },
    //打开修改
    handleEdit(item) {
      this.dialogFormVisible = true;
      this.dia_userid = item.userid;
      this.alipayid = item.alipayid;
      this.alipayname = item.alipayname;
      this.dia_mobile = item.mobile;
      this.dia_reuserid = item.reuserid;
      this.dia_name = item.username;
      this.dia_usertype = item.usertypename;
    },
    // 删除
    handleDel(item) {
      console.log(item);
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          userid: item.userid,
        };
        deleteAgent(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.getAgentList(1);
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "删除失败",
            });
          }
        });
      });
    },

  // 客户转代理人
  customerToAgent(item) {
      console.log(item);
      var that = this;
      this.$confirm("客户确认要转代理人吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          userid: item.userid,
        };
        customerToAgent(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "转代理人成功",
            });
            that.getAgentList(1);
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "转代理人失败",
            });
          }
        });
      });
    },


    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getAgentList(page);
    },

    // 打开新增
    addMenu() {
      this.dia_userid = "";
      this.dialogFormVisible = true;
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getAgentList(1);
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getAgentList(1);
    },
    clearINput() {
      this.alipayname = "";
      this.alipayid = "";
      this.dia_mobile = "";
      this.dia_name = "";
      this.dia_reuserid = "";
      this.dia_usertype = "";
    },

    // handleNodeCheck() {},

    // handleCurrentChange(val) {
    //   this.currentRow = val;
    // },

    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
  },
};
</script>
<style>
/* 这是筛选项的内容 */
.common_hang {
  display: flex;
  width: 350px;
}
.common_hang .mech {
  width: 100px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #909399;
}
.common_hang .el-input {
  width: 210px;
}
.common_hang .el-input .el-input__inner {
  width: 210px;
  border-radius: 0;
  height: 35px;
}
.common_hang .el-select .el-input {
  width: 210px;
}
.search {
  /* margin-top: 20px; */
  display: flex;
  padding: 30px 10px 10px;
}
.el-pagination {
  text-align: right;
}
.table_list {
  padding: 10px;
}
.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.rolesTree {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 50px;
  margin-left: 10px;
}
.rolesTree .el-button {
  margin-right: 130px;
}
.el-tree-node__content {
  height: 30px;
}
.el-tree-node__label {
  font-size: 16px;
}
.el-dialog__header {
  padding: 0;
}
.el-dialog {
  width: 50%;
}
.dia_from .el-form-item,
.dia_from .two {
  display: flex;
}
.dia_from .el-form-item__label {
  width: 100px;
}
.el-dialog__body {
  padding-bottom: 0px;
}
</style>
