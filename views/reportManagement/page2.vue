<template>
  <div>
    <div>
      <div class="search">
        <div class="common_hang">
          <div class="mech">案件概况</div>
          <el-input
            v-model="selectCaseinfo"
            clearable
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="common_hang">
          <div class="mech">申请人</div>

          <el-input
            v-model="selectApplicant"
            clearable
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="common_hang">
          <div class="mech">被申请人</div>
          <el-input
            v-model="organName"
            clearable
            placeholder="请输入内容"
          ></el-input>
        </div>
        <el-button type="primary" @click="getOrgan">查询</el-button>
        <el-button type="primary" @click="addOrgan">新增</el-button>
      </div>

      <div class="table_list">
        <el-table
          :data="datalist"
          border
          stripe
          highlight-current-row
          style="width: 100%;"
          :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
        >
          <el-table-column
            type="index"
            width="40"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="makedatestr"
            label="案件录入时间"
            width="180"
            align="center"
     
          ></el-table-column>
          <el-table-column
            prop="caseno"
            label="案号"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="caseinfo"
            label="案件概况"
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="applicant"
            label="申请人"
            width="160"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="respondent"
            label="被申请人"
            align="center"
            width="160"
          ></el-table-column>

          <el-table-column
            prop="examuserid"
            label="操作人"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            label="报告下载"
            prop="pdfurl"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.pdfurl" size="small">
                <a
                  target="_blank"
                  :href="scope.row.pdfurl"
                  style="color: #8F9198;"
                  >点击下载</a
                ></el-button
              >
              <el-button v-else size="small" @click="handlClick(scope.row)"
                >生成报告</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="handleDel(scope.$index, scope.row)"
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
    </div>

    <!-- 弹窗 -->
    <el-dialog
      title=""
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      customClass="customWidth"
      :close-on-click-modal="false"
    >
      <div class="cropper-content">
        <div style="width:48%;overflow-y:scroll; height:660px;">
          <div class="from_title">案情基本介绍</div>
          <el-form label-width="80px">
            <el-form-item label="案件概况">
              <el-input
                type="textarea"
                v-model="caseinfo"
                data-con="caseinfo"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
            <div class="two">
              <el-form-item label="案号">
                <el-input
                  type="textarea"
                  v-model="caseno"
                  data-con="caseno"
                  autosize
                  resize="none"
                  @focus="picFocusStatus"
                  @blur="shanchu"
                ></el-input>
              </el-form-item>
              <el-form-item label="申请人">
                <el-input
                  type="textarea"
                  v-model="applicant"
                  data-con="applicant"
                  autosize
                  resize="none"
                  @focus="picFocusStatus"
                  @blur="shanchu"
                ></el-input>
              </el-form-item>
            </div>
            <div class="two">
              <el-form-item label="被申请人">
                <el-input
                  type="textarea"
                  v-model="respondent"
                  data-con="respondent"
                  autosize
                  resize="none"
                  @focus="picFocusStatus"
                  @blur="shanchu"
                ></el-input>
              </el-form-item>
              <el-form-item label="第三人">
                <el-input
                  type="textarea"
                  v-model="thirdpeople"
                  data-con="thirdpeople"
                  autosize
                  resize="none"
                  @focus="picFocusStatus"
                  @blur="shanchu"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item label="案由">
              <el-input
                type="textarea"
                v-model="casereason"
                data-con="casereason"
                :autosize="{ minRows: 1, maxRows: 5 }"
                :rows="1"
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
                class="ss"
                wrap="virtual"
              ></el-input>
            </el-form-item>
            <el-form-item label="诉讼请求">
              <el-input
                type="textarea"
                v-model="claims"
                data-con="claims"
                :autosize="{ minRows: 1, maxRows: 5 }"
                :rows="1"
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="from_title">诉讼风险审查</div>
          <div class="from_small_title">基本审查</div>
          <el-form label-width="100%" class="from2">
            <el-form-item
              :label="item.examcontent"
              v-for="(item, index) in lawsuit01"
              :key="index"
            >
              <el-input
                type="textarea"
                v-model="item.examresult"
                data-con="lawsuit01"
                :data-num="index"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="100%" class="from2">
            <div class="from_small_title">证据材料</div>

            <el-form-item
              :label="'证据' + (index + 1)"
              v-for="(item, index) in evidence"
              :key="index"
            >
              <el-input
                type="textarea"
                v-model="item.content"
                data-con="evidence"
                :data-num="index"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>

            <el-form-item label="是否能形成证据链">
              <el-input
                type="textarea"
                v-model="ischain"
                data-con="ischain"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
            <el-form-item label="法律分析（法律依据）">
              <el-input
                type="textarea"
                v-model="lawbase"
                data-con="lawbase"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
            <el-form-item label="案情分析（案件分析）">
              <el-input
                type="textarea"
                v-model="caseanaly"
                data-con="caseanaly"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
            <el-form-item label="案情分析（风险提示）">
              <el-input
                type="textarea"
                v-model="riskreminde"
                data-con="riskreminde"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="from_title">标的风险审查</div>
          <el-form label-width="100%" class="from2">
            <el-form-item
              :label="item.examcontent"
              v-for="(item, index) in object01"
              :key="index"
            >
              <el-input
                type="textarea"
                v-model="item.examresult"
                data-con="object01"
                :data-num="index"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>

            <el-form-item label="诉讼请求⾦额">
              <el-input
                type="textarea"
                v-model="applyamnt"
                data-con="applyamnt"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
            <el-form-item label="保全⾦额">
              <el-input
                type="textarea"
                v-model="amnt"
                data-con="amnt"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="from_title">⼀票否决审查</div>
          <el-form label-width="100%" class="from2">
            <el-form-item label="⼀票否决制（有即填，⽆即填写⽆）">
              <el-input
                type="textarea"
                v-model="isoneveto"
                data-con="isoneveto"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>

            <el-form-item
              :label="item.examcontent"
              v-for="(item, index) in lawsuit02"
              :key="index"
            >
              <el-input
                type="textarea"
                v-model="item.examresult"
                data-con="lawsuit02"
                :data-num="index"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-form label-width="100%" class="from2">
            <div class="from_small_title">标的风险</div>
            <div v-for="(item, index) in object02" :key="index">
              <el-form-item :label="item.examcontent">
                <el-input
                  type="textarea"
                  v-model="item.examresult"
                  data-con="object02"
                  :data-num="index"
                  autosize
                  resize="none"
                  @focus="picFocusStatus"
                  @blur="shanchu"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>

          <div class="from_title">审查结论</div>

          <el-form
            label-width="100%"
            class="from2"
            style="margin-bottom: 25px;"
          >
            <el-form-item label="关键风险">
              <el-input
                type="textarea"
                v-model="keyrisk"
                data-con="keyrisk"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="是否需要申请⼈出具关于某项具体材料真实、合法、有效的承诺"
            >
              <el-input
                type="textarea"
                v-model="needpromise"
                data-con="needpromise"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>

            <el-form-item label="诉讼风险" label-width="30%" class="radio">
              <el-radio v-model="lawsuitrisk" label="1">高</el-radio>
              <el-radio v-model="lawsuitrisk" label="2">中</el-radio>
              <el-radio v-model="lawsuitrisk" label="3">低</el-radio>
            </el-form-item>
            <el-form-item label="标的风险" label-width="30%" class="radio">
              <el-radio v-model="objectrisk" label="1">高</el-radio>
              <el-radio v-model="objectrisk" label="2">中</el-radio>
              <el-radio v-model="objectrisk" label="3">低</el-radio>
            </el-form-item>

            <el-form-item label="结论">
              <el-input
                type="textarea"
                v-model="conclusion"
                data-con="conclusion"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
            <el-form-item label="审查律师" class="data">
              <el-input
                type="textarea"
                v-model="examuserid"
                data-con="examuserid"
                autosize
                resize="none"
                @focus="picFocusStatus"
                @blur="shanchu"
              ></el-input>
            </el-form-item>
            <el-form-item label="签署日期" class="data">
              <!-- <el-input
                type="textarea"
                v-model="signdate"
                autosize
                resize="none"
              ></el-input> -->
              <el-date-picker
                v-model="signdate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
          <!-- <div class="dingwei"> -->
          <div slot="footer" class="dialog-footer " style="text-align:right;">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="sureAdd">确 定</el-button>
          </div>
          <!-- </div> -->
        </div>

        <div style="width:50%;">
          <div class="pop">
            <div class="elUpload">
              <el-upload
                action="http://101.132.129.58:8081/api/law/uploadUwFile"
                :http-request="onUpload"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">上传文件</el-button>
              </el-upload>
            </div>

            <el-popover
              placement="bottom"
              width="255"
              popper-class="el_pop"
              trigger="click"
            >
              <ol>
                <li
                  class="fileList"
                  v-for="(item, index) in fileList"
                  :key="index"
                  @click="selectFile(item)"
                >
                  {{ item.filename }}
                </li>
              </ol>
              <!-- <div
                class="fileList"
                v-for="(item, index) in fileList"
                :key="index"
                @click="selectFile(item)"
              >
                {{ item.filename }}
              </div> -->
              <el-button
                size="small"
                type="primary"
                slot="reference"
                class="openfile"
                >打开文件</el-button
              >
            </el-popover>
          </div>
          <!-- 截图 -->
          <div class="cropper-box">
            <div class="cropper">
              <vue-cropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.outputSize"
                :outputType="option.outputType"
                :info="option.info"
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :full="option.full"
                :fixedBox="option.fixedBox"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :centerBox="option.centerBox"
                :height="option.height"
                :infoTrue="option.infoTrue"
                :maxImgSize="option.maxImgSize"
                :enlarge="option.enlarge"
                :mode="option.mode"
                :high="option.high"
                @realTime="realTime"
                @imgLoad="imgLoad"
              >
              </vue-cropper>
            </div>
            <!--底部操作工具按钮-->
            <div class="footer-btn">
              <div class="scope-btn">
                <label class="btn" for="uploads" style="display:none"
                  >选择封面</label
                >
                <!--   @change="selectImg($event)" -->
                <input
                  type="file"
                  id="uploads"
                  style="position:absolute; clip:rect(0 0 0 0);"
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                />
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  icon="el-icon-zoom-in"
                  @click="changeScale(1)"
                  >放大</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  icon="el-icon-zoom-out"
                  @click="changeScale(-1)"
                  >缩小</el-button
                >
                <el-button size="mini" type="danger" plain @click="rotateLeft"
                  >↺ 左旋转</el-button
                >
                <el-button size="mini" type="danger" plain @click="rotateRight"
                  >↻ 右旋转</el-button
                >
              </div>
              <div class="upload-btn">
                <el-button size="mini" type="success" @click="uploadImg('blob')"
                  >上传截图 <i class="el-icon-upload"></i
                ></el-button>
              </div>
              <img src="" alt="" style="display:none" />
            </div>
          </div>
          <!--预览效果图-->
          <div class="show-preview">
            <div class="preview">
              <img
                v-for="(item, index) in fileImgList"
                :key="index"
                :src="item.disfile"
                @click="selectListImg(item)"
                style="previews_img"
              />
            </div>
          </div>
          <!-- 分页 -->
          <!-- <el-pagination
            small
            :page-size="pageSize1"
            @current-change="currentChangeHandle"
            :current-page="currentPage"
            layout="total, prev, pager, next"
            :total="total"
            :pager-count="pagerCount"
          >
          </el-pagination> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getReportList,
  addReport,
  editReport,
  deleteReport,
  getReportOhterInfo,
  tencentOcr,
  uploadUwFile,
  getfileList,
  getfileListSec,
  createLawPdf,
} from "../../api/api";
import axios from "axios";
export default {
  data() {
    return {
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,

      activeNames: ["1"],

      // currentPage: 1,
      // pagerCount: 5,
      // total: 60,
      // pageSize1: 5,

      dialogFormVisible: false,
      dialogTableVisible: false,
      name: this.Name,
      previews: {},
      option: {
        img: "", //裁剪图片的地址
        outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
        outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
        info: true, //图片大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 230, //默认生成截图框宽度
        autoCropHeight: 150, //默认生成截图框高度
        fixed: false, //是否开启截图框宽高固定比例
        fixedNumber: [1.53, 1], //截图框的宽高比例
        full: false, //false按原比例裁切图片，不失真
        fixedBox: false, //固定截图框大小，不允许改变
        canMove: true, //上传图片是否可以移动
        canMoveBox: true, //截图框能否拖动
        original: true, //上传图片按照原始比例渲染
        centerBox: true, //截图框是否被限制在图片里面
        height: false, //是否按照设备的dpr 输出等比例图片
        infoTrue: true, //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, //限制图片最大宽度和高度
        enlarge: 1, //图片根据截图框输出比例倍数
        high: true, //是否根据dpr生成适合屏幕的高清图片
        mode: "930px 950px", //图片默认渲染方式
      },
      // 筛选项
      selectCaseinfo: "",
      selectApplicant: "",
      selectRespondent: "",
      // 录入信息
      caseinfo: "", //案件概况
      caseno: "", //案号
      applicant: "", //申请人
      respondent: "", //被申请人
      thirdpeople: "", //第三人
      casereason: "", //案由
      claims: "", //诉讼请求

      ischain: "", //是否能形成证据链
      lawbase: "", //法律依据，法律基础,
      caseanaly: "", //'案件分析
      riskreminde: "", //风险提示

      applyamnt: "", //诉讼请求金额
      amnt: "", //保全金额
      isoneveto: "", //是否一票否决

      keyrisk: "", //关键风险
      needpromise: "", //是否需要承诺
      lawsuitrisk: "", //诉讼风险
      objectrisk: "", //标的风险
      conclusion: "", //结论
      examuserid: "", //审查律师
      signdate: "", //签署日期
      reportserialno: "", //主键
      lawsuit01: [
        {
          examcontent: "申请⼈主体资格审查（是否为案件适格的原告）",
          examresult: "",
          orderbyid: "1",
        },
        {
          examcontent:
            "申请人资信情况审查（是否为失信被执行人或涉及众多诉讼或为被告的其他重大诉讼。检索范围中国裁判文书网和最高人民法院网“执⾏信息公开”端口）",
          examresult: "",
          orderbyid: "2",
        },
        {
          examcontent:
            "被申请人主体资格审查（是否为案件适格的被告、主体是否存续等）",
          examresult: "",
          orderbyid: "3",
        },
        {
          examcontent: "诉讼请求⾦额是否合理",
          examresult: "",
          orderbyid: "4",
        },
        {
          examcontent:
            "申请⼈与被申请⼈之间是否存在其他诉讼（检索范围中国裁判⽂书⽹）",
          examresult: "",
          orderbyid: "5",
        },
        {
          examcontent: "是否为追加保全",
          examresult: "",
          orderbyid: "6",
        },
        {
          examcontent: "案由审查",
          examresult: "",
          orderbyid: "7",
        },
        {
          examcontent: "诉讼时效审查",
          examresult: "",
          orderbyid: "8",
        },
        {
          examcontent: "管辖权审查",
          examresult: "",
          orderbyid: "9",
        },
        {
          examcontent:
            "保全阶段审查（诉前保全、诉中保全，如诉讼中则区分⼀审、⼆审、再审、执⾏等阶段）",
          examresult: "",
          orderbyid: "10",
        },
      ],
      object01: [
        {
          examcontent: "保全标的（如有线索，请简要列举）",
          examresult: "",
          orderbyid: "1",
        },
        {
          examcontent: "保全标的权属",
          examresult: "",
          orderbyid: "2",
        },
        {
          examcontent: "保全标的是否可分",
          examresult: "",
          orderbyid: "3",
        },
        {
          examcontent: "保全⽅式",
          examresult: "",
          orderbyid: "4",
        },
        {
          examcontent: "标的价值是否与保全请求相当",
          examresult: "",
          orderbyid: "5",
        },
      ],
      lawsuit02: [
        {
          examcontent: "主体不适格",
          examresult: "",
          orderbyid: "1",
        },
        {
          examcontent: "律师审查意⻅",
          examresult: "",
          orderbyid: "2",
        },
        {
          examcontent: "超过诉讼时效",
          examresult: "",
          orderbyid: "3",
        },
        {
          examcontent: "证据材料不具有“真实性、关联性、合法性”",
          examresult: "",
          orderbyid: "4",
        },
        {
          examcontent: "从现有证据分析败诉风险⼤",
          examresult: "",
          orderbyid: "5",
        },
        {
          examcontent: "案件复杂胜败难以判断",
          examresult: "",
          orderbyid: "6",
        },
      ],
      object02: [
        {
          examcontent: "标的权属不确定",
          examresult: "",
          orderbyid: "1",
        },
        {
          examcontent: "保全标的为船舶、无形资产、商品货物、⼤宗货品",
          examresult: "",
          orderbyid: "2",
        },
      ],
      evidence: [
        { content: "", orderbyid: "1" },
        { content: "", orderbyid: "2" },
        { content: "", orderbyid: "3" },
        { content: "", orderbyid: "4" },
      ],

      organName: "",

      datalist: [],
      fileList: [],
      fileImgList: [],
      ocrStr: "",
    };
  },
  created() {
    this.getReportList(1);
  },
  methods: {
    getReportList(page) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
       
        // totalRecord: 0,
        caseinfo: this.selectCaseinfo,
        applicant: this.selectApplicant,
        respondent: this.organName,
        pageNumber: page,
        pageSize: this.pageSize,
      };
      getReportList(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.datalist = res.rows;
          this.pageTotal = res.total;
        }
      });
    },

    currentChangeHandle(val) {
      this.pageNum = val;
      //  把请求到的数组重新复制给页面
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getReportList(page);
    },

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
      formData.append("buzid", that.reportserialno);
      formData.append("userToken", sessionStorage.getItem("token"));
      let config = {
        headers: { "Content-Type": "multipart/form-data" }, //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
      }; //添加请求头
      axios.post("/api/law/uploadUwFile", formData, config).then((response) => {
        if ((response.data.code = "0")) {
          that.getfileList(that.reportserialno);
          that.$message({
            type: "success",
            duration: 3000,
            message: "上传成功",
          });
        }
      });
    },

    handleChange(val) {},
    getOrgan() {
      this.getReportList(1);
    },
    addOrgan() {
      this.addoredit = false;
      this.dialogFormVisible = true;
    },
    //确定新增//修改
    sureAdd() {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        // jsonlist: JSON.stringify(this.jsonlist),
        lawsuit01: JSON.stringify(this.lawsuit01),
        lawsuit02: JSON.stringify(this.lawsuit02),
        object01: JSON.stringify(this.object01),
        object02: JSON.stringify(this.object02),
        evidence: JSON.stringify(this.evidence),
        caseinfo: this.caseinfo, //案件概况
        caseno: this.caseno, //案号
        applicant: this.applicant, //申请人
        respondent: this.respondent, //被申请人
        thirdpeople: this.thirdpeople, //第三人
        casereason: this.casereason, //案由
        claims: this.claims, //诉讼请求

        ischain: this.ischain, //是否能形成证据链
        lawbase: this.lawbase, //法律依据，法律基础,
        caseanaly: this.caseanaly, //'案件分析
        riskreminde: this.riskreminde, //风险提示

        applyamnt: this.applyamnt, //诉讼请求金额
        amnt: this.amnt, //保全金额
        isoneveto: this.isoneveto, //是否一票否决

        keyrisk: this.keyrisk, //关键风险
        needpromise: this.needpromise, //是否需要承诺
        lawsuitrisk: this.lawsuitrisk, //诉讼风险
        objectrisk: this.objectrisk, //标的风险
        conclusion: this.conclusion, //结论
        examuserid: this.examuserid, //审查律师
        signdate: this.signdate, //签署日期
      };

      // this.addoredit为false则为新增，负责为修改
      if (!this.addoredit) {
        addReport(reporParams).then((res) => {
          if (res.code == "0") {
            that.reportserialno = res.reportserialno;
            that.addoredit = true;
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.getReportList(1);
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
        reporParams["reportserialno"] = this.reportserialno;
        editReport(reporParams)
          .then((res) => {
            if (res.code == "0") {
              that.$message({
                type: "success",
                duration: 3000,
                message: "修改成功",
              });
              that.getReportList(1);
              that.clearINput();
            } else {
              that.$message({
                type: "error",
                duration: 3000,
                message: "修改失败",
              });
            }
            // this.datalist = res.rows;
          })
          .catch((res) => {
            that.$message({
              type: "error",
              duration: 3000,
              message: res,
            });
          });
      }

      this.dialogFormVisible = false;
    },

    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getReportList(1);
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getReportList(1);
    },
    //修改报告
    handleEdit(aa, row) {
      var that = this;
      this.getfileList(row.reportserialno);
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        reportserialno: row.reportserialno,
      };
      getReportOhterInfo(reporParams).then((res) => {
        if (res.lawsuit01.length != "0") {
          that.lawsuit01 = res.lawsuit01;
        }
        if (res.object01.length != "0") {
          that.object01 = res.object01;
        }
        if (res.lawsuit02.length != "0") {
          that.lawsuit02 = res.lawsuit02;
        }
        if (res.object02.length != "0") {
          that.object02 = res.object02;
        }
        if (res.evidence.length != "0") {
          that.evidence = res.evidence;
        }
      });
      this.caseinfo = row.caseinfo; //案件概况
      this.caseno = row.caseno; //案号
      this.applicant = row.applicant; //申请人
      this.respondent = row.respondent; //被申请人
      this.thirdpeople = row.thirdpeople; //第三人
      this.casereason = row.casereason; //案由
      this.claims = row.claims; //诉讼请求

      this.ischain = row.ischain; //是否能形成证据链
      this.lawbase = row.lawbase; //法律依据，法律基础,
      this.caseanaly = row.caseanaly; //'案件分析
      this.riskreminde = row.riskreminde; //风险提示

      this.applyamnt = row.applyamnt; //诉讼请求金额
      this.amnt = row.amnt; //诉讼请求金额
      this.isoneveto = row.isoneveto; //是否一票否决

      this.keyrisk = row.keyrisk; //关键风险
      this.needpromise = row.needpromise; //是否需要承诺
      this.lawsuitrisk = row.lawsuitrisk; //诉讼风险
      this.objectrisk = row.objectrisk; //标的风险
      this.conclusion = row.conclusion; //结论
      this.examuserid = row.examuserid; //审查律师
      this.signdate = row.signdate; //签署日期
      (this.reportserialno = row.reportserialno), //主键
        (this.addoredit = true);
      this.dialogFormVisible = true;
    },

    // 删除报告
    handleDel(aa, row) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          reportserialno: row.reportserialno,
        };
        deleteReport(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.getReportList(1);
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

    // 输入框清空
    clearINput() {
      this.caseinfo = ""; //案件概况
      this.caseno = ""; //案号
      this.applicant = ""; //申请人
      this.respondent = ""; //被申请人
      this.thirdpeople = ""; //第三人
      this.casereason = ""; //案由
      this.claims = ""; //诉讼请求

      this.ischain = ""; //是否能形成证据链
      this.lawbase = ""; //法律依据，法律基础,
      this.caseanaly = ""; //'案件分析
      this.riskreminde = ""; //风险提示

      this.applyamnt = ""; //诉讼请求金额
      this.amnt = ""; //诉讼请求金额
      this.isoneveto = ""; //是否一票否决

      this.keyrisk = ""; //关键风险
      this.needpromise = ""; //是否需要承诺
      this.lawsuitrisk = ""; //诉讼风险
      this.objectrisk = ""; //标的风险
      this.conclusion = ""; //结论
      this.examuserid = ""; //审查律师
      this.signdate = ""; //签署日期
      this.reportserialno = "";
      this.addoredit = false;
      this.option.img = ""; //需要截得图片
      this.fileImgList = []; //图片列表
      this.fileList = []; //文件列表

      for (let item in this.lawsuit01) {
        this.lawsuit01[item].examresult = "";
      }
      for (let item in this.object01) {
        this.object01[item].examresult = "";
      }
      for (let item in this.lawsuit02) {
        this.lawsuit02[item].examresult = "";
      }
      for (let item in this.object02) {
        this.object02[item].examresult = "";
      }
      for (let item in this.evidence) {
        this.evidence[item].content = "";
      }
    },

    // 点击修改获取文件列表
    getfileList(reportserialno) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        reportserialno: reportserialno,
      };
      getfileList(reporParams).then((res) => {
        that.fileList = res.fileList;
        // if(res.fileList)
      });
    },
    // 选择文件
    selectFile(item) {
      var that = this;
      if (item.filetype == "pdf") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          fileserialno: item.fileserialno,
        };
        getfileListSec(reporParams).then((res) => {
          that.fileImgList = res.fileList;
          if (that.fileImgList.length > 0) {
            that.option.img = that.fileImgList[0].disfile;
          }
        });
      } else {
        var aa = {
          fileList: [
            {
              disfile: item.disfile,
              filename: item.filename,
              fileserialno: item.fileserialno,
              filetype: item.filetype,
            },
          ],
        };
        that.fileImgList = aa.fileList;

        if (that.fileImgList.length > 0) {
          that.option.img = that.fileImgList[0].disfile;
        }
      }
    },
    // 选择文件列表中的图片
    selectListImg(item) {
      this.option.img = item.disfile;
    },

    //上传图片
    uploadImg(type) {
      let that = this;
      if (type === "blob") {
        //获取截图的blob数据
        this.$refs.cropper.getCropData(async (data) => {
          var that = this;
          var reporParams = {
            userToken: sessionStorage.getItem("token"),
            imgbase64: data,
          };
          tencentOcr(reporParams).then((res) => {
            if (res.code == "0") {
              that.ocrStr = res.ocrStr;
              that.$message({
                type: "success",
                duration: 3000,
                message: "识别成功",
              });
            } else {
              that.$message({
                type: "error",
                duration: 3000,
                message: "识别失败，请重新识别",
              });
            }
          });
        });
      }
    },
    picFocusStatus(e) {
      var con = e.path[0].dataset.con;
      var num = e.path[0].dataset.num;
      if (e.path[0].dataset.num == null) {
        this[con] += this.ocrStr;
      } else {
        if (con == "evidence") {
          this[con][num].content += this.ocrStr;
        } else {
          this[con][num].examresult += this.ocrStr;
        }
      }
    },

    handlClick(item) {
      var that = this;
      var reporParams = {
        userToken: sessionStorage.getItem("token"),
        reportserialno: item.reportserialno,
      };
      createLawPdf(reporParams).then((res) => {
        if (res.code == "0") {
          that.$message({
            type: "success",
            duration: 3000,
            message: "已生成报告",
          });
          that.getReportList(1);
        } else {
          that.$message({
            type: "error",
            duration: 3000,
            message: "报告生成失败",
          });
        }
      });
    },
    shanchu() {
      this.ocrStr = "";
    },

    onSubmit() {},
    //初始化函数
    imgLoad(msg) {},
    //图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //实时预览函数
    realTime(data) {
      this.previews = data;
    },
    //
  },
};
</script>

<style css-scoped>
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
}
.common_hang .el-select .el-input {
  width: 210px;
}
.search {
  /* margin-top: 20px; */
  display: flex;
  padding: 30px 10px 10px;
}
/* 表格 */

.table_list {
  padding: 10px;
}

/* 这是弹窗 */
.cropper-content {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}
.cropper {
  width: auto;
  height: 410px;
}
.cropper-box {
  flex: 1;
  width: 100%;
}
.show-preview {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  margin-top: 10px;
}
.preview {
  overflow: hidden;
  border: 1px solid #67c23a;
  background: #cccccc;
}
.scope-btn {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding-right: 10px;
}
.upload-btn {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
}
.footer-btn {
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}
.btn {
  outline: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  margin-right: 10px;
}
.el-dialog {
  /* width: 85%; */
  margin: 0 auto 0px;
}

.suotu {
  width: 100%;
  height: 200px;
  cursor: pointer;
}
.dd {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
}
.el-upload-dragger {
  width: 100%;
}
.el-collapse-item__header,
.el-collapse-item__wrap {
  padding-left: 15px;
}
.cropper-content {
  justify-content: space-between;
}
.preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  height: auto;
}
.preview img {
  width: 12.5%;
  height: auto;
  cursor: pointer;
}
.two {
  display: flex;
}
.el-input__inner {
  height: 35px;
}
.el-form-item__label {
  width: 70px;
  text-align: center;
  font-size: 13px;
}
.el-textarea__inner{
   font-size: 13px;
}
.el-form-item {
  margin-bottom: 10px;
}
.from_title {
  font-size: 18px;
  margin-bottom: 10px;
      text-align: left;
    border-left: 6px solid red;
    padding-left: 20px;
}
.from_small_title {
  font-size: 18px;
  margin-top: -5px;
  margin-bottom: 10px;
}
.from2 .el-form-item {
  display: flex;
  flex-direction: column;
}
.from2 .el-form-item__label {
  text-align: left;
  line-height: 20px;
}
.from2 .el-form-item__content {
  margin-left: 0 !important;
}

.two .el-form-item {
  flex-direction: row;
  align-items: center;
}

.te .el-form-item .el-form-item__label {
  width: 130px !important;
}
.te .el-form-item:first-child .el-form-item__label {
  width: 90px !important;
}
.te .el-form-item .el-form-item__content {
  margin-left: 0px;
  line-height: 25px;
}

.from2 .radio {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.radio .el-form-item__content {
  width: 40%;
}
.from2 .data {
  flex-direction: row;
  text-align: center;
}
.from2 .data .el-form-item__label {
  width: 20% !important;
  line-height: 42px;
}
.from2 .data .el-form-item__content .el-input {
  width: 195px;
}
.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.elUpload {
  display: flex;
}
.fileList {
  text-align: left;
  cursor: pointer;
  /* height: 25px; */
  line-height: 30px;
}
.pop {
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-bottom: 15px;
}

.el_pop {
  padding-left: 0px;
  padding-right: 24px;
}
.ss {
  white-space: pre-wrap;
}
.dingwei {
  position: absolute;
}
.xuanfu {
  position: fixed;
  bottom: 56px;
  /* left: 0; */
  /* width: 54%; */
  /* right: 0; */
  background-color: #fff;
  margin-bottom: 10px;
  margin-left: 22%;
}
.el-dialog__header {
  padding: 0;
}
.customWidth {
  width: 100%;
  margin-top: 0px !important;
}
.el-table__row .el-table__cell .cell {
  height: 35px;
  line-height: 35px;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.el-form {
  margin-right: 30px;
}
</style>
