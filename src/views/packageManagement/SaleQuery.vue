<template>
  <div>
    <div class="search">
      <div class="common_hang">
        <div class="mech">套餐组名称</div>
        <el-input
          v-model="mobile"
          placeholder="请输入套餐组名称"
          clearable
        ></el-input>
      </div>

      <!-- <div class="common_hang">
        <div class="mech">套餐组来源</div>
        <el-input v-model="name" placeholder="请输入" clearable></el-input>
      </div> -->
      <div class="common_hang">
        <div class="mech">套餐组来源</div>

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

      <div class="common_hang">
        <div class="mech">套餐类型</div>
        <el-select v-model="value" placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </div>

      <el-button type="primary" @click="queryAssignSaleGroup(1)"
        >查询</el-button
      >
      <!-- <el-button type="primary" @click="addUser">新增</el-button> -->
    </div>

    <div class="table_list">
      <el-table
        :data="queryList"
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
          prop="groupname"
          label="套餐组名称"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="套餐组备注"
          width="auto"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="grouptypename"
          label="套餐组来源"
          width="auto"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="distributeusername"
          label="代理商"
          width="auto"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="querySaleplanList(scope.row)"
              >查看套餐</el-button
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
            <el-table-column prop="balancetype" align="center" label="结算类型">
              <template slot-scope="scope">
                <input
                  type="text"
                  v-model="scope.row.balancetype"
                  v-show="scope.row.dia_editTable"
                />
                <span v-show="!scope.row.dia_editTable">{{
                  scope.row.balancetypename
                }}</span>
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
            <el-table-column prop="plantype" align="center" label="套餐模式">
              <template slot-scope="scope">
                <input
                  type="text"
                  v-model="scope.row.plantype"
                  v-show="scope.row.dia_editTable"
                />
                <span v-show="!scope.row.dia_editTable">{{
                  scope.row.plantypename
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="disrecharge" align="center" label="是否显示">
              <template slot-scope="scope">
                <input
                  type="text"
                  v-model="scope.row.disrecharge"
                  v-show="scope.row.dia_editTable"
                />
                <span v-show="!scope.row.dia_editTable">{{
                  scope.row.disrechargename
                }}</span>
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
            <el-table-column prop="modifydate" align="center" label="更新时间">
              <template slot-scope="scope">
                <input
                  type="text"
                  v-model="scope.row.modifydate"
                  v-show="scope.row.dia_editTable"
                />
                <span v-show="!scope.row.dia_editTable">{{
                  scope.row.modifydate
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
            :total="dia_pageTotal"
            class="indexPage"
          >
          </el-pagination>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  queryAssignSaleGroup,
  querySaleplanList,
  getDict,
} from "../../api/api";
export default {
  data() {
    return {
      mobile: "",
      grouptype: "",
      getDictList: "",
      queryList: [],
      dia_queryList: [],
      userList: [],
      userid: "",
      dialogFormVisible: false,
      inputName: "",
      inputMobile: "",
      value: "",
      options: [
        {
          type: "01",
          name: "分配给我的",
        },
        {
          type: "02",
          name: "我分配的",
        },
      ],
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
    },
    // 获取表单
    queryAssignSaleGroup(page) {
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

    // 查看详情
    querySaleplanList(row, index) {
      var that = this;
      if (row.groupserialno != "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          groupserialno: row.groupserialno,
          querytype: row.grouptype,
        };
        querySaleplanList(reporParams).then((res) => {
          this.dia_queryList = res.rows;
          this.dia_pageTotal = res.total;
          that.dialogFormVisible = true;
        });
      }
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.queryAssignSaleGroup(page);
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
      this.dia_pageNum = page;
      // this.querySaleplanList(page)
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
</style>
