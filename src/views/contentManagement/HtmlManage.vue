<template>
  <div>
    <div class="search">
      <div class="common_hang">
        <div class="mech">说明</div>
        <el-input
          v-model="htmlcontent"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </div>
      <el-button type="primary" @click="queryLable(1)">查询</el-button>
      <el-button type="primary" @click="addMenu">新增</el-button>
    </div>

    <div class="table_list">
      <el-table
        :data="queryLableList"
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
          label="说明"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="usercode"
          label="操作人"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="makedate"
          label="最后一次操作时间"
          width="190"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="small" @click="handleDel(scope.row)"
              >删除</el-button
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
      @opened="show()"
      @closed="hide()"
    >
      <!-- -->
      <el-form>
        <!-- <el-form-item label="说明">
          <el-input
            v-model="addhtmlcontent"
            placeholder="请输入标签管理说明"
            clearable
          ></el-input>
        </el-form-item> -->
        <div style="text-align: left;">说明：</div>
        <el-form-item label="">
          <div id="editorElem" ref="editor"></div>
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
import E from "wangeditor";
let editor;
import {
  queryLable,
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
      queryLableList: [],
      dialogFormVisible: false,
      menuName: "",
      htmlserialno: "",
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,

      currentRow: null,
      checkStrictly: false,
      defaultCheckedNode: [],
      rolesTree: [],

      defaultProps: {
        children: "childmenu",
        label: "menuname",
      },
    };
  },
  created() {
    this.queryLable(1);
  },
  methods: {
    // 获取表单
    queryLable(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        htmlcontent: this.htmlcontent,
        pageNumber: page,
        pageSize: this.pageSize,
      };
      queryLable(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.queryLableList = res.rows;
          this.pageTotal = res.total;
        }
      });
    },
    // 确认新增或修改
    sureAdd() {
      console.log(this.editor);
      var that = this;
      if (this.htmlserialno == "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          htmlcontent: this.editor.txt.text(),
        };
        addLable(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.dialogFormVisible = false;
            that.queryLable(1);
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
          htmlcontent: this.editor.txt.text(),
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
            that.queryLable(1);
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

    // 删除
    handleDel(item) {
      // this.htmlserialno = item.htmlserialno;
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          htmlserialno: item.htmlserialno,
        };
        deleteLable(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.queryLable(1);
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
      this.queryLable(page);
    },
    //打开修改
    handleEdit(item) {
      this.dialogFormVisible = true;

      this.$nextTick(() => {
        this.show();
        this.editor.txt.html(item.htmlcontent);
      });

     
      // this.editor.txt.html(item.htmlcontent);

      // this.addhtmlcontent = item.htmlcontent;
      this.htmlserialno = item.htmlserialno;
      this.remark = item.usercode;
    },
    // 打开新增
    addMenu() {
      this.htmlserialno = "";
      this.dialogFormVisible = true;
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.queryLable(1);
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.queryLable(1);
      // this.hide()
    },
    clearINput() {
      // this.addhtmlcontent = "";
      this.htmlserialno = "";
      // this.hide()
    },

    handleNodeCheck() {},

    handleCurrentChange(val) {
      this.currentRow = val;
    },

    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },

    show() {
      // this.$nextTick(() => {
      editor = new E("#editorElem");
      this.editor = editor;
      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        // "image", // 插入图片
        "table", // 表格
        "undo", // 撤销
        "redo", // 重复
      ];
      editor.create();
      // this.editor.txt.html('haha');
      // });
    },
    // 关闭时清空数据避免重叠
    hide() {
      // 销毁编辑器
      this.editor.destroy();
      this.editor = null;
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
.w-e-text p {
  text-align: left;
}
.el-dialog{
   width: 51%;
}
</style>
