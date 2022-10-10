<template>
  <div>
    <div class="search">
      <div class="common_hang">
        <div class="mech">套餐组名称</div>
        <el-input
          v-model="groupname"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">套餐组来源</div>
        <!-- <el-input
          v-model="grouptype"
          placeholder="请输入内容"
          clearable
        ></el-input> -->
        <el-select v-model="grouptype" placeholder="请选择" clearable>
          <el-option
            v-for="item in getDictList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <el-button
        type="primary"
        class="topSearch"
        @click="queryAssignSaleGroup(1)"
        >查询</el-button
      >
      <el-button type="primary" class="topSearch" @click="addGroup"
        >新增</el-button
      >
    </div>
    <!-- highlight-current-row
        @current-change="handleCurrentChange" -->
    <div class="table_list">
      <el-table
        :data="queryList"
        border
        :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
        style="width: 100%;"
      >
        <el-table-column
          prop="groupname"
          align="center"
          label="套餐组名称"
          width="180"
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
          width="180"
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
        <el-table-column prop="grouptypename" align="center" label="套餐组来源">
          <!-- <template slot-scope="scope">
            <input
              type="text"
              v-model="scope.row.grouptype"
              v-show="scope.row.editTable"
            />
            <span v-show="!scope.row.editTable">{{ scope.row.grouptype }}</span>
          </template> -->
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.grouptypename"
              placeholder="请选择"
              v-show="scope.row.editTable"
            >
              <el-option
                v-for="item in getDictList"
                :key="item.dd_key"
                :label="item.dd_value"
                :value="item.dd_key"
              >
              </el-option>
            </el-select>
            <span v-show="!scope.row.editTable">{{ scope.row.grouptypename }}</span>
          </template>
        </el-table-column>
        <el-table-column label="套餐组操作" align="center" width="280">
          <template slot-scope="scope">
            <el-button
              v-show="isEdit"
              size="small"
              type="primary"
              @click="handleEdit(scope.row, scope)"
              >修改</el-button
            >
            <el-button
              v-show="!isEdit"
              size="small"
              type="primary"
              @click="handleSave(scope.row)"
              >保存</el-button
            >
            <el-button
              v-show="!isEdit"
              size="small"
              type="primary"
              @click="tuihui(scope.row)"
              >退回</el-button
            >
            <el-button
              v-show="isEdit"
              size="small"
              type="danger"
              @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="套餐操作" align="center" width="280">
          <template slot-scope="scope">
            <el-button
              v-show="isEdit"
              size="small"
              type="primary"
              @click="edit(scope.row)"
              >编辑套餐</el-button
            >
            <!-- <el-button
              size="small"
              type="primary"
              @click="allocation(scope.row)"
              >分配</el-button
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
      <div class="table_list">
        <div class="dia_head">
          <el-button
            type="primary"
            class="topSearch  dia_add"
            @click="dia_addGroup"
            >新增</el-button
          >
        </div>
        <el-table
          :data="dia_queryList"
          border
          :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
          style="width: 100%;"
        >
        <el-table-column  
            prop="planname"
            align="center"
            label="套餐名称"
            width="140"
          >
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.planname"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.planname
              }}</span>
            </template>
          </el-table-column>
          <el-table-column   v-if="false"
            prop="planname"
            align="center"
            label="套餐内容"
            width="140"
          >
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.planname"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.planname
              }}</span>
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
          <el-table-column prop="balancetype" align="center" label="结算类型" width="100">
        
            <template slot-scope="scope">
            <el-select
              v-model="scope.row.balancetype"
              placeholder="请选择"
              v-show="scope.row.dia_editTable"
            >
              <el-option
                v-for="item in balanceList"
                :key="item.dd_key"
                :label="item.dd_value"
                :value="item.dd_key"
              >
              </el-option>
            </el-select>
            <span v-show="!scope.row.dia_editTable">{{ scope.row.balancetypename}}</span>
          </template>


          </el-table-column>
          <el-table-column prop="flow" align="center" label="流量">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.flow"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.flow
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="virtualflow" align="center" label="虚量">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.virtualflow"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.virtualflow
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stop_flow" align="center" label="提前停卡">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.stop_flow"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.stop_flow
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="plantype" align="center" label="套餐模式"    width="140">
            <!-- <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.plantype"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.plantype
              }}</span>
            </template> -->
            <template slot-scope="scope">
            <el-select
              v-model="scope.row.plantype"
              placeholder="请选择"
              v-show="scope.row.dia_editTable"
            >
              <el-option
                v-for="item in planList"
                :key="item.dd_key"
                :label="item.dd_value"
                :value="item.dd_key"
              >
              </el-option>
            </el-select>
            <span v-show="!scope.row.dia_editTable">{{scope.row.plantypename}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="disrecharge" align="center" label="是否显示" width="90">
            <!-- <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.disrecharge"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.disrecharge
              }}</span>
            </template> -->

            <template slot-scope="scope">
            <el-select
              v-model="scope.row.disrecharge"
              placeholder="请选择"
              v-show="scope.row.dia_editTable"
            >
              <el-option
                v-for="item in yesnoList"
                :key="item.dd_key"
                :label="item.dd_value"
                :value="item.dd_key"
              >
              </el-option>
            </el-select>
            <span v-show="!scope.row.dia_editTable">{{ scope.row.disrechargename}}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="rechargeamount"
            align="center"
            label="充值金额"
          >
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.rechargeamount"
                v-show="scope.row.dia_editTable"
              />
              <span v-show="!scope.row.dia_editTable">{{
                scope.row.rechargeamount
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="modifydate" align="center" label="更新时间" width="220">
            <template slot-scope="scope">
              <!-- <input
                type="text"
                v-model="scope.row.modifydate"
                v-show="scope.row.dia_editTable"
              /> -->
              <span>{{
                scope.row.modifydate
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="套餐操作" align="center"  fixed="right" width="220">
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
              <el-button
              v-show="dia_isEdit"
                size="small"
                type="danger"
                @click="dia_handleDel(scope.row)"
                >删除</el-button
              >
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
// import { log } from "console";
import {
  queryAssignSaleGroup,
  addSaleplanGroup,
  updateSaleplanGroup,
  deleteSaleplanGroup,
  querySaleplanList,
  addSaleplan,
  editSaleplan,
  deleteSaleplan,
  getDict,
} from "../../api/api";
export default {
  data() {
    return {
      isEdit: true,
      dia_isEdit: true,
      getDictList: "",
      grouptype: "",
      groupname: "",
      queryList: [],
      dia_queryList: [],
      dialogFormVisible: false,
      dia_groupserialno: "",
      dia_groupdistributeserialno: "",
      dia_grouptype: "",
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
    this.getDict();
  },
  methods: {
    // 套餐组类型
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
          this.getDictList = res;
        }
      });

      getDict({
        userToken: sessionStorage.getItem("token"),
        dict_type: "balancetype",
      }).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.balanceList = res;
        }
      });
      getDict({
        userToken: sessionStorage.getItem("token"),
        dict_type: "yesno",
      }).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.yesnoList = res;
        }
      });
      getDict({
        userToken: sessionStorage.getItem("token"),
        dict_type: "plantype",
      }).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.planList = res;
        }
      });



    },
    // 结算类型
    // 获取表单
    queryAssignSaleGroup(page) {
      this.isEdit = true;
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        groupname: this.groupname,
        grouptype: this.grouptype,
        querytype: "01",
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
    // 修改
    handleEdit(row, index) {
      row.editTable = true;
      this.isEdit = false;
    },

    // 确认修改/新增
    handleSave(row, index) {
      console.log(row)
      row.editTable = false;
      var that = this;
      if (row.groupserialno != "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          groupserialno: row.groupserialno,
          groupname: row.groupname,
          remark: row.remark,
          grouptype: row.grouptypename,
        };

        updateSaleplanGroup(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.queryAssignSaleGroup(1);
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "修改失败",
            });
          }
        });
      } else {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          groupname: row.groupname,
          remark: row.remark,
          grouptype: row.grouptypename,
        };
        addSaleplanGroup(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.queryAssignSaleGroup(1);
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "添加失败",
            });
          }
        });
      }
    },
    // 删除
    handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          groupserialno: item.groupserialno,
        };
        deleteSaleplanGroup(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.queryAssignSaleGroup(1);
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
    // 新增数据（增加一行）
    addGroup() {
      var List = this.queryList;
      var cardNumObj = {};
      //定义一个空的对象
      cardNumObj = {
        editTable: true,
        groupname: "",
        groupserialno: "",
        grouptype: "",
        remark: "",
      };
      List.unshift(cardNumObj);
      this.isEdit = false;
    },
    tuihui() {
      this.isEdit = true;
      this.queryAssignSaleGroup(1);
    },

    // 新增数据（增加一行）
    dia_addGroup() {
      this.dia_isEdit=false
      var List = this.dia_queryList;
      var cardNumObj = {};
      //定义一个空的对象
      cardNumObj = {
        dia_editTable: true,
        disrecharge: "",
        balancetype: "",
        peakprice: "",
        modifydate: "",
        virtualflow: "",
        planserialno: "",
        saleprice: "",
        rechargeamount: "",
        costprice: "",
        plantype: "",
        flow: "",
      };
      List.unshift(cardNumObj);
    },
    // 查询套餐
    querySaleplanList(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        groupserialno: this.dia_groupserialno,
        // groupserialno: "00000000000000000002",
        querytype: this.dia_grouptype,

        pageNumber: page,
        pageSize: this.dia_pageSize,
      };
      querySaleplanList(reporParams).then((res) => {
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
            array.push(Object.assign(item, { dia_editTable: false }));
          });
          this.dia_queryList = array;
          // this.dia_queryList = list;
          this.dia_pageTotal = res.total;
        }
      });
    },

    //打开编辑套餐
    edit(item) {
      this.dialogFormVisible = true;
      this.dia_groupserialno = item.groupserialno;
      this.dia_groupdistributeserialno = item.groupdistributeserialno;
      this.dia_grouptype = item.grouptype;
      this.querySaleplanList(1);
    },
    // 修改
    dia_handleEdit(row, index) {
      row.dia_editTable = true;
      this.dia_isEdit=false
    },
    // 确认修改/新增
    dia_handleSave(row, index) {
      
      row.editTable = false;
      var that = this;
      if (row.planserialno != "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          // groupserialno: this.dia_groupserialno,
          planname: row.planname,
      
          saleprice: row.saleprice,
          planserialno: row.planserialno,
          costprice: row.costprice,
          saleprice: row.saleprice,
          peakprice: row.peakprice,
          distributeserialno: row.distributeserialno,
          flow: row.flow,
          balancetype: row.balancetype,//结算类型
          plantype: row.plantype,//套餐模式
          rechargeamount: row.rechargeamount,
          virtual_flow: row.virtualflow,//虚量
          disrecharge:row.disrecharge,//是否显示
          stop_flow:row.stop_flow
        };

        editSaleplan(reporParams).then((res) => {
          if (res.code == "0") {
            that.dia_isEdit=true
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.querySaleplanList(1);
          } else {
            that.dia_isEdit=false
            that.$message({
              type: "error",
              duration: 3000,
              message: res.msg,
            });
          }
        });
      } else {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          groupserialno: this.dia_groupserialno,
          groupdistributeserialno: this.dia_groupdistributeserialno,
       
          planname: row.planname,
          // planname: "1",
          flow: row.flow,
          balancetype: row.balancetype,
       
          plantype: row.plantype,
          rechargeamount: row.rechargeamount,
     
          stopflow: row.stopflow,
          virtualflow: row.virtualflow,
          costprice: row.costprice,
          saleprice: row.saleprice,
          peakprice: row.peakprice,
          stop_flow:row.stop_flow
        };
        addSaleplan(reporParams).then((res) => {
          if (res.code == "0") {
            that.dia_isEdit=true
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.querySaleplanList(1);
          } else {
            that.dia_isEdit=false
            that.$message({
              type: "error",
              duration: 3000,
              message: res.msg,
            });
          }
        });
      }
    },
    dia_tuihui(){
      this.dia_isEdit=true
      this.querySaleplanList(1)
    },
    // 删除
    dia_handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          planserialno: item.planserialno,
        };
        deleteSaleplan(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.querySaleplanList(1);
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: res.msg,
            });
          }
        });
      });
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.queryAssignSaleGroup(page);
    },
    dia_pageClick(page) {
      this.dia_pageNum = page;
      this.querySaleplanList(page);
    },

    // 打开新增
    // addMenu() {
    //   this.htmlserialno = "";
    //   this.dialogFormVisible = true;
    // },
    sureAdd() {},
    handleClose() {
      this.dialogFormVisible = false;
      this.queryAssignSaleGroup(1);
    },

    // allocation(row){
    //   console.log(row)
    // }

    // 取消新增
    // cancel() {
    //   this.dialogFormVisible = false;
    //   this.clearINput();
    //   this.queryAssignSaleGroup (1);
    // },
    // clearINput() {
    //   this.addhtmlcontent = "";
    //   this.htmlserialno = "";
    // },

    // handleCurrentChange(val) {
    //   this.getRolesTree(val);
    //   this.currentRow = val;
    // },
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
.el-dialog {
  width: 89%;
}
.el-dialog__header {
  padding: 0;
}
.topSearch {
  height: 35px;
}
.dia_head {
  margin-bottom: 20px;
  text-align: left;
  margin-left: 30px;
}
.cell input {
  width: 100%;
  height: 25px;
}

.cell .el-select input {
  height: 31px;
}
.el-input__icon{
  line-height:32px;
}
</style>
