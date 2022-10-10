<template>
  <div class="table_list">
    <el-table
      :data="queryList"
      border
      :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column
        prop="groupname"
        align="center"
        label="套餐组名称"
        width="210"
      >
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.groupname"
            v-show="scope.row.editTable"
          />
          <span v-show="!scope.row.editTable">{{ scope.row.groupname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        align="center"
        label="套餐组备注"
        width="210"
      >
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.remark"
            v-show="scope.row.editTable"
          />
          <span v-show="!scope.row.editTable">{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="grouptypename"
        align="center"
        label="套餐组来源"
        width="210"
      >
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.grouptypename"
            v-show="scope.row.editTable"
          />
          <span v-show="!scope.row.editTable">{{
            scope.row.grouptypename
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="dia_edit(scope.row)"
            >查看/修改套餐</el-button
          >
          <!-- <el-button type="danger" size="small" @click="handleDel(scope.row)"
              >删除</el-button
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
    <div class="rolesTree">
      <div class="common_hang">
        <div class="mech">选择代理人</div>
        <el-select v-model="username" placeholder="请选择">
          <el-option
            v-for="item in rolesTree"
            :key="item.agentid"
            :label="item.username"
            :value="item.agentid"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getCheckedKeys">分配</el-button>
    </div>

    <el-dialog
      title=""
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="table_list">
        <el-table
          :data="dia_queryList"
          border
          :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
          style="width: 100%;"
        >
          <el-table-column
            prop="planname"
            align="center"
            label="套餐内容"
            width="140"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.planname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="costprice"
            align="center"
            label="低价"
            width="60"
          >
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.costprice"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.costprice
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="saleprice"
            align="center"
            label="售价"
            width="60"
          >
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.saleprice"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.saleprice
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="peakprice"
            align="center"
            label="最高价"
            width="70"
          >
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.peakprice"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.peakprice
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="balancetype" align="center" label="结算类型"  width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.balancetypename }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="flow" align="center" label="流量">
            <template slot-scope="scope">
              <span>{{ scope.row.flow }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="virtualflow" align="center" label="虚量">
            <template slot-scope="scope">
              <span>{{ scope.row.virtualflow }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stop_flow" align="center" label="提前停卡">
            <template slot-scope="scope">
              <span>{{ scope.row.stop_flow }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="plantype" align="center" label="套餐模式">
            <template slot-scope="scope">
              <span>{{ scope.row.plantypename }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="disrecharge" align="center" label="是否显示">
            <template slot-scope="scope">
              <span>{{ scope.row.disrechargename }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="rechargeamount"
            align="center"
            label="充值金额"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.rechargeamount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="modifydate" align="center" label="更新时间" width="220">
            <template slot-scope="scope">
              <span>{{ scope.row.modifydate }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="套餐操作"
            align="center"
            fixed="right"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                v-show="dia_isEdit"
                size="small"
                type="primary"
                @click="dia_handleEdit(scope.row, scope)"
                >修改</el-button
              >
              <el-button
                v-show="!dia_isEdit"
                size="small"
                type="primary"
                @click="dia_handleSave(scope.row)"
                >保存</el-button
              >
              <el-button
                v-show="!dia_isEdit"
                size="small"
                type="primary"
                @click="dia_tuihui(scope.row)"
                >退回</el-button
              >
              <!-- <el-button
                v-show="dia_isEdit"
                size="small"
                type="danger"
                @click="dia_handleDel(scope.row)"
                >删除</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          @current-change="dia_pageClick"
          :page-size="dia_pageSize"
          :current-page="dia_pageNum"
          layout="total, prev, pager, next"
          :total="dia_pageTotal"
          class="indexPage"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryAssignSaleGroup,
  distributeToUser,
  queryAgentUser,
  querySaleplanList,
  editSaleplan,
  updatePlanDistribute
} from "../../api/api";
export default {
  data() {
    return {
      queryList: [],
      rolesTree: [],
      groupdistributeserialnoArray: "",
      username: "",
      dia_queryList: [],
      dialogFormVisible: false,
      dia_isEdit: true,
      groupserialno: "",
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
    this.queryAssignSaleGroup(1);
    this.queryAgentUser();
  },
  methods: {
    // 获取表单
    queryAssignSaleGroup(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        // groupname: this.groupname,
        // grouptype: this.grouptype,
        querytype: "02",
        pageNumber: page,
        pageSize: this.pageSize,
      };
      queryAssignSaleGroup(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          var list = res.rows;
          var array = [];
          list.map((item, index) => {
            array.push(Object.assign(item, { editTable: false }));
          });

          this.queryList = array;
          this.pageTotal = res.total;
        }
      });
    },
    // 获取代理人
    queryAgentUser() {
      console.log("aaa");
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
      };
      queryAgentUser(reporParams).then((res) => {
        console.log(res);
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

    //打开编辑套餐
    dia_edit(item) {
      // this.dialogFormVisible = true;
      this.dia_groupserialno = item.groupserialno;
      // this.dia_groupdistributeserialno = item.groupdistributeserialno;
      this.dia_grouptype = item.grouptype;
      this.querySaleplanList(1);
    },
    // 查看详情
    querySaleplanList(page) {
      var that = this;
console.log(page)
      if (this.dia_groupserialno != "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          groupserialno: this.dia_groupserialno,
          querytype: this.dia_grouptype,

          pageNumber: page,
          pageSize: this.dia_pageSize,
        };
        querySaleplanList(reporParams).then((res) => {
          this.dia_queryList = res.rows;
          this.dia_pageTotal = res.total;
          that.dialogFormVisible = true;
        });
      }
    },

    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.queryAssignSaleGroup(1);
    },

    clearINput() {
      this.inputMobile = "";
      this.inputName = "";
      this.userid = "";
    },
    dia_pageClick(page) {
      console.log(page)
      this.dia_pageNum = page;
      this.querySaleplanList(page)
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.queryAssignSaleGroup(page);
    },

    handleSelectionChange(val) {
      console.log(val);
      var groupdistributeserialnoArray = [];
      val.forEach((item) => {
        groupdistributeserialnoArray.push(item.groupdistributeserialno);
      });

      this.groupdistributeserialnoArray = groupdistributeserialnoArray.toString();
    },

    getCheckedKeys(row) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        groupdistributeid: this.groupdistributeserialnoArray,
        distributeuserid: this.username,
      };
      distributeToUser(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          that.$message({
            type: "success",
            duration: 3000,
            message: "分配成功",
          });
        }
      });
    },

    // 修改
    dia_handleEdit(row, index) {
      row.dia_editTable = true;
      this.dia_isEdit = false;
    },
    // 确认修改套餐价格
    dia_handleSave(row, index) {
      row.editTable = false;
      var that = this;
      if (row.planserialno != "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          // groupserialno: this.dia_groupserialno,
          // planname: row.planname,

          // saleprice: row.saleprice,
          // planserialno: row.planserialno,
          costprice: row.costprice,
          saleprice: row.saleprice,
          peakprice: row.peakprice,
          distributeserialno: row.distributeserialno,
          // flow: row.flow,
          // balancetype: row.balancetype, //结算类型
          // plantype: row.plantype, //套餐模式
          // rechargeamount: row.rechargeamount,
          // virtual_flow: row.virtualflow, //虚量
          // disrecharge: row.disrecharge, //是否显示
          // stop_flow: row.stop_flow,
        };

        updatePlanDistribute(reporParams).then((res) => {
          if (res.code == "0") {
            that.dia_isEdit = true;
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.querySaleplanList(1);
          } else {
            that.dia_isEdit = false;
            that.$message({
              type: "error",
              duration: 3000,
              message: res.msg,
            });
          }
        });
      } else {
        that.$message({
        type: "error",
        duration: 3000,
        message: '缺少必要参数',
      });
      }
    
    },
    dia_tuihui() {
      this.dia_isEdit = true;
      this.querySaleplanList(1);
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
.el-pagination {
  text-align: right;
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
.el-dialog {
  width: 83%;
}
.cell input {
    width: 100%;
    height: 25px;
}
</style>
