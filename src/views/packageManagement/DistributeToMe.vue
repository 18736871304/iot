<template>
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
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.grouptypename"
            v-show="scope.row.editTable"
          />
          <span v-show="!scope.row.editTable">{{ scope.row.grouptypename }}</span>
        </template>
      </el-table-column>

      <el-table-column label="套餐操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="distributeSaleplan(scope.row)"
            >分配</el-button
          >
          <el-button size="small" type="primary" @click="dia_edit(scope.row)"
            >查看套餐</el-button
          >
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
import { queryAssignSaleGroup, distributeSalepla,querySaleplanList } from "../../api/api";
export default {
  data() {
    return {
      queryList: [],
      dia_queryList: [],
      dialogFormVisible: false,
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
  },
  methods: {
    // 获取表单
    queryAssignSaleGroup(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        // groupname: this.groupname,
        // grouptype: this.grouptype,
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
      // this.clearINput();
      this.queryAssignSaleGroup(1);
    },


    dia_pageClick(page) {
      this.dia_pageNum = page;
      this.querySaleplanList(page)
    },





    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.queryAssignSaleGroup(page);
    },
    distributeSaleplan(row) {

      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        groupdistributeid: row.groupdistributeserialno,
        groupserialno: row.groupserialno,
      };
      distributeSaleplan(reporParams).then((res) => {
   
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
  },
};
</script>

<style>
.el-pagination {
  text-align: right;
}
.el-dialog {
  width: 83%;
}
</style>
