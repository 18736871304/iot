<template>
  <div>
    <div class="search">
      <div class="common_hang">
        <div class="mech">卡来源</div>
        <el-select v-model="cardType" placeholder="请选择" clearable>
          <el-option
            v-for="item in cardtypeList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="common_hang">
        <div class="mech">卡号</div>
        <el-input v-model="cardno" placeholder="请输入" clearable></el-input>
      </div>
      <!-- <div class="common_hang">
        <div class="mech">iccid</div>
        <el-input
          v-model="iccid"
          placeholder="请输入"
          clearable
        ></el-input>
      </div> -->
      <!-- <div class="common_hang">
        <div class="mech">套餐类型</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </div> -->

      <el-button type="primary" @click="querySimCardList(1)">查询</el-button>
      <div class="elUpload">
        <el-upload
          action="http://101.132.129.58:8083/api/simCard/simCardImport"
          :http-request="onUpload"
          :show-file-list="false"
        >
          <el-button size="small" style="height:35px" type="primary"
            >上传文件</el-button
          >
        </el-upload>
      </div>
    </div>

    <div class="table_list">
      <el-table
        :data="userList"
        border
        :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          width="40"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="makedatestr"
          label="生成日期"
          width="240"
          align="center"
         
        ></el-table-column> -->
        <el-table-column
          prop="cardno"
          label="卡号"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="iccid"
          label="iccid"
          width="auto"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cardtypename"
          label="卡来源"
          width="auto"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cardstatename"
          label="卡状态"
          width="auto"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="groupname"
          label="套餐组"
          width="auto"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="false"
          prop="cardname"
          label="套餐"
          width="auto"
          align="center"
        ></el-table-column>

        <!-- <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
              >查看套餐</el-button
            >
            <el-button type="danger" size="small" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
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
      <!-- <el-dialog
        title=""
        :visible.sync="dialogFormVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div class="table_list">
          <el-table
            :data="dia_queryList"
            :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
            style="width: 100%;"
          >
            <el-table-column
              prop="groupname"
              align="center"
              label="套餐内容"
              width="140"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.groupname
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              align="center"
              label="低价"
              width="60"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.remark
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="grouptype"
              align="center"
              label="售价"
              width="60"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="grouptype"
              align="center"
              label="最高价"
              width="70"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="grouptype" align="center" label="结算类型">
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="grouptype" align="center" label="流量">
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="grouptype" align="center" label="虚量">
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="grouptype" align="center" label="提前停卡">
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="grouptype" align="center" label="套餐模式">
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="grouptype" align="center" label="是否显示">
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="grouptype" align="center" label="充值金额">
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="grouptype" align="center" label="更新时间">
              <template slot-scope="scope">
                <span v-show="!scope.row.editTable">{{
                  scope.row.grouptype
                }}</span>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            background
            @current-change="dia_pageClick"
            :page-size="dia_pageSize"
            :current-page="dia_pageNum"
            layout="total, prev, pager, next"
            :total="pageTotal"
            class="indexPage"
          >
          </el-pagination>
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { querySimCardList, getDict } from "../../api/api";
export default {
  data() {
    return {
      cardType: "",
      cardno: "",
      iccid: "",
      dia_queryList: [],
      userList: [],
      userid: "",
      dialogFormVisible: false,
      inputName: "",
      inputMobile: "",
      value: "",
      cardtypeList: [],
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      dia_pageTotal: 0,
      dia_pageSize: 10,
      dia_pageNum: 1,
    };
  },
  created() {
    this.querySimCardList(1);
    this.getDict();
  },
  methods: {
    getDict() {
      getDict({
        userToken: sessionStorage.getItem("token"),
        dict_type: "sourcetype",
      }).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.cardtypeList = res;
        }
      });
    },
    // 获取表单
    querySimCardList(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        groupquerytype: "",
        cardtype: this.cardType,
        cardno: this.cardno,
        iccid: this.iccid,
        pageNumber: page,
        pageSize: this.pageSize,
      };
      querySimCardList(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.userList = res.rows;
          this.pageTotal = res.total;
        }
      });
    },
    // 确认新增或修改
    sureAdd() {
      var that = this;
      if (this.userid == "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          mobile: this.inputMobile,
          name: this.inputName,
        };
        addUser(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.dialogFormVisible = false;
            that.querySimCardList(1);
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
          mobile: this.inputMobile,
          name: this.inputName,
          userid: this.userid,
        };
        editUser(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.dialogFormVisible = false;
            that.querySimCardList(1);
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

    handleEdit(item) {
      this.inputMobile = item.mobile;
      this.inputName = item.realname;
      this.userid = item.userserialno;
      this.dialogFormVisible = true;
    },
    handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          userid: item.userserialno,
        };
        deleteUser(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.querySimCardList(1);
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
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.querySimCardList(page);
    },
    // 打开新增
    addUser() {
      this.dialogFormVisible = true;
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.querySimCardList(1);
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.querySimCardList(1);
    },
    clearINput() {
      this.inputMobile = "";
      this.inputName = "";
      this.userid = "";
    },

    dia_pageClick(page) {
      this.dia_pageNum = page;
      // this.querySaleplanList(page)
    },
    // 上传文件
    onUpload(item) {
      var that = this;
      if (this.reportserialno == "") {
        this.$message({
          type: "error",
          duration: 3000,
          message: "请保存数据之后再上传文件",
        });
        return;
      }
      let formData = new FormData();

      let file = item.file;
      formData.append("myfiles", file);
      formData.append("cardtype", this.cardType);
      // formData.append("buzid", that.reportserialno);
      formData.append("userToken", sessionStorage.getItem("token"));

      let config = {
        headers: { "Content-Type": "multipart/form-data" }, //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
      }; //添加请求头
      axios
        .post("http://101.132.129.58:8083/api/simCard/simCardImport", formData, config)
        .then((response) => {
          console.log(response);
          if ((response.code = "0")) {
            that.querySimCardList(1);
            that.$message({
              type: "success",
              duration: 3000,
              message: "上传成功",
            });


          }
        });
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
.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-dialog {
  width: 83%;
}
.elUpload {
  margin-left: 10px;
}
</style>
