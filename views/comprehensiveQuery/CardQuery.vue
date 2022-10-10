<template>
  <div>
    <div class="search">
      <div class="common_hang">
        <div class="mech">卡来源</div>
        <el-input
          v-model="htmlcontent"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </div>
       <div class="common_hang">
        <div class="mech">卡号</div>
        <el-input
          v-model="htmlcontent"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </div>
          <div class="common_hang">
        <div class="mech">是否售出</div>
        <el-select v-model="distribute" placeholder="请选择">
          <el-option
            v-for="item in distributeList"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="querySimCardInfoList(1)">查询</el-button>
      <!-- <el-button type="primary" @click="addMenu">新增</el-button> -->
    </div>

    <div class="table_list">
      <el-table
        :data="querySimCardInfoListList"
        border
        :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          width="40"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="htmlcontent"
          label="卡号"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="usercode"
          label="套餐组"
          width="130"
          align="center"
        ></el-table-column>
         <el-table-column
          prop="usercode"
          label="总流量"
          width="130"
          align="center"
        ></el-table-column>
         <el-table-column
          prop="usercode"
          label="使用量"
          width="130"
          align="center"
        ></el-table-column>
         <el-table-column
          prop="usercode"
          label="实际用量"
          width="130"
          align="center"
        ></el-table-column>

             <el-table-column
          prop="usercode"
          label="使用百分比"
          width="130"
          align="center"
        ></el-table-column>
             <el-table-column
          prop="usercode"
          label="卡状态"
          width="130"
          align="center"
        ></el-table-column>
              <el-table-column
          prop="usercode"
          label="开/停卡"
          width="130"
          align="center"
        ></el-table-column>
              <el-table-column
          prop="usercode"
          label="次月包"
          width="130"
          align="center"
        ></el-table-column>
              <el-table-column
          prop="usercode"
          label="代理商"
          width="130"
          align="center"
        ></el-table-column>


        <el-table-column label="操作" align="center" width="290">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >查询详情</el-button
            >
            <el-button type="danger" size="small" @click="handleDel(scope.row)"
              >账户交易记录</el-button
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
    </div>

    <el-dialog
      title=""
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item label="说明">
          <el-input
            v-model="addhtmlcontent"
            placeholder="请输入标签管理说明"
            clearable
          ></el-input>
        </el-form-item>
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
  querySimCardInfoList,
  addLable,
  updateLable,
  deleteLable,
  getMenuListByMenuGroup,
  createMenuRelation,
} from "../../api/api";
export default {
  data() {
    return {
      htmlcontent: "",
      addhtmlcontent: "",
      querySimCardInfoListList: [],
      dialogFormVisible: false,

      menuName: "",
      htmlserialno: "",
       distribute:'01',
       distributeList: [
        {
          type:"01",
          name: "已售出",
        },
        {
          type: "02",
          name: "未售出",
        }
      ],
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,

      currentRow: null,
      checkStrictly: false,
      defaultCheckedNode: [],
      rolesTree: [],

   
    };
  },
  created() {
    this.querySimCardInfoList(1);
  },
  methods: {
    // 获取表单
    querySimCardInfoList(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        menugroupname: this.menuName,
        pageNumber: page,
        pageSize: this.pageSize,
      };
      querySimCardInfoList(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.querySimCardInfoListList = res.data;
          this.pageTotal = res.total;
        }
      });
    },
    // 确认新增或修改
    sureAdd() {
      var that = this;
      if (this.htmlserialno == "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          htmlcontent: this.addhtmlcontent,
        };
        addLable(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.dialogFormVisible = false;
            that.querySimCardInfoList(1);
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
          htmlcontent: this.addhtmlcontent,
          htmlserialno: this.htmlserialno,
          remark: this.remark,
        };

        updateLable(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.dialogFormVisible = false;
            that.querySimCardInfoList(1);
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
      this.addhtmlcontent = item.htmlcontent;
      this.htmlserialno = item.htmlserialno;
      this.remark = item.usercode;
    },
    // 删除
    handleDel(item) {
      // this.htmlserialno = item.htmlserialno;
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          enugroupserialno: item.htmlserialno,
        };
        deleteLable(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.getUserList(1);
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
      this.querySimCardInfoList(page);
    },

    // 打开新增
    addMenu() {
      this.htmlserialno = "";
      this.dialogFormVisible = true;
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.querySimCardInfoList(1);
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.querySimCardInfoList(1);
    },
    clearINput() {
      this.addhtmlcontent = "";
      this.htmlserialno = "";
    },

    handleNodeCheck() {},
    getRolesTree(item) {
      if (item == null) {
      } else {
        this.htmlserialno = item.htmlserialno;
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          htmlserialno: item.htmlserialno,
        };
        getMenuListByMenuGroup(reporParams).then((res) => {
          this.rolesTree = res;
          this.getArray(this.rolesTree, "true", []);
        });
      }
    },

    //获取默认选中的数组
    getArray(data, name, lst) {
      var tempArr = lst,
        _this = this;
      data.map((item) => {
        if (item.checked == name) {
          tempArr.push(item.menuid);
          if (!!item.childmenu && typeof item.childmenu == "object") {
            _this.getArray(item.childmenu, name, tempArr);
          }
        } else {
          if (!!item.childmenu && typeof item.childmenu == "object") {
            _this.getArray(item.childmenu, name, tempArr);
          }
        }
      });
      this.$refs.rolestree.setCheckedKeys(tempArr);
      return tempArr;
    },

    getCheckedKeys() {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        htmlserialno: this.htmlserialno,
        menuRelaTionStr: this.$refs.rolestree.getCheckedKeys().toString(),
      };
      createMenuRelation(reporParams).then((res) => {
        //  this.htmlserialno=''
        if (res.code == "0") {
          that.$message({
            type: "success",
            duration: 3000,
            message: "关联成功",
          });
        } else {
          that.$message({
            type: "error",
            duration: 3000,
            message: "关联失败",
          });
        }
      });
    },

    handleCurrentChange(val) {
      this.getRolesTree(val);
      this.currentRow = val;
    },

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
</style>
