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
        <el-input v-model="iccid" placeholder="请输入" clearable></el-input>
      </div> -->
      <div class="common_hang">
        <div class="mech">是否下发</div>
        <el-select v-model="distribute" placeholder="请选择" clearable>
          <el-option
            v-for="item in distributeList"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </div>

      <el-button type="primary" @click="querySimCardIssueList(1)"
        >查询</el-button
      >
    </div>

    <div class="table_list">
      <el-table
        :data="MenuGroupList"
        :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
        highlight-current-row
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          type="index"
          width="40"
          align="center"
        ></el-table-column>

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
          prop="distributeusername"
          label="代理商"
          width="auto"
          align="center"
        ></el-table-column>
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
    <div class="rolesTree">
      <div class="common_hang">
        <div class="mech">选择代理商</div>
        <el-select v-model="agentuserserialno" placeholder="请选择">
          <el-option
            v-for="item in rolesTree"
            :key="item.agentid"
            :label="item.username"
            :value="item.agentid"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getCheckedKeys">下发</el-button>
    </div>
  </div>
</template>

<script>
import {
  querySimCardIssueList,
  queryAgentUser,
  issueSimCard,
  getDict
} from "../../api/api";
export default {
  data() {
    return {
      cardType: "",
      cardno: "",
      // iccid: "",
      MenuGroupList: [],
      rolesTree: [], //选择代理商
      agentuserserialno: "",
      cardserialnoArray: "",
      distribute: "01",
      distributeList: [
        {
          type: "01",
          name: "未下发",
        },
        {
          type: "02",
          name: "已下发",
        },
      ],

      cardtypeList: [
    
      ],
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
    };
  },
  created() {
    this.querySimCardIssueList(1);
    this.queryAgentUser();
    this.getDict()
  },
  methods: {
    getDict(){
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
    querySimCardIssueList(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        distributequerytype: this.distribute,
        cardtype: this.cardType,
        cardno: this.cardno,
        groupquerytype: "02",
        pageNumber: page,
        pageSize: this.pageSize,
      };
      querySimCardIssueList(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.MenuGroupList = res.rows;
          this.pageTotal = res.total;
        }
      });
    },
    // 获取代理人
    queryAgentUser() {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
      };
      queryAgentUser(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          that.rolesTree = res.data;
        }
      });
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.querySimCardIssueList(page);
    },

    getCheckedKeys() {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        agentuserserialno: this.agentuserserialno,
        cardserialnoArray: this.cardserialnoArray,
      };
      issueSimCard(reporParams).then((res) => {
        if (res.code == "0") {
          that.$message({
            type: "success",
            duration: 3000,
            message: "下发成功",
          });


          that.querySimCardIssueList(1)
        } else {
          that.$message({
            type: "error",
            duration: 3000,
            message: "下发失败",
          });
        }
      });
    },
    handleSelectionChange(val) {
      var cardserialnoArray = [];
      val.forEach((item) => {
        cardserialnoArray.push(item.cardserialno);
      });
      this.cardserialnoArray = cardserialnoArray.toString();
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
</style>
