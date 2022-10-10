import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/vuex/store.js'

Vue.use(VueRouter);

var routes = [{
    path: "/",
    redirect: '/login',

  },
  {
    path: '/login',
    name: "登录",
    meta: {
      title: ''
    },
    component: () => import("../views/login/login.vue"),
  },


  {
    path: '/home',
    component: () => import("@/views/index/index.vue"),
    name: '系统管理',
    iconCls: 'fa fa-home',
    children: [{
        path: '/home',
        component: () => import("@/views/home/home.vue"),
        name: '欢迎页',
      },
      {
        path: '/UserManage',
        component: () => import("@/views/organ/UserManage.vue"),
        name: '用户管理',
      },
      {
        path: '/AuthManage',
        component: () => import("@/views/organ/AuthManage.vue"),
        name: '权限管理',
      },
      {
        path: '/UserAuthority',
        component: () => import("@/views/organ/UserAuthority.vue"),
        name: '用户权限',
      },
      //  正式内容
      {
        path: '/HtmlManage',
        component: () => import("@/views/contentManagement/HtmlManage.vue"),
        name: '标签管理',
      },
      // 卡管理
      {
        path: '/CardImport',
        component: () => import("@/views/cardManagement/CardImport.vue"),
        name: '卡导入',
      },
      {
        path: '/AddPlanGroup',
        component: () => import("@/views/cardManagement/AddPlanGroup.vue"),
        name: '关联套餐组',
      },
      {
        path: '/CardDistribute',
        component: () => import("@/views/cardManagement/CardDistribute.vue"),
        name: '卡下发',
      },
      {
        path: '/CardChange',
        component: () => import("@/views/cardManagement/CardChange.vue"),
        name: '更换卡',
      },
      {
        path: '/CardSeal',
        component: () => import("@/views/cardManagement/CardSeal.vue"),
        name: '发货(卡销售)',
      },
      // {
      //   path: '/CardQuery1',
      //   component: () => import("@/views/cardManagement/CardQuery1.vue"),
      //   name: '卡信息查询',
      // },
      // 套餐管理
      {
        path: '/SalePlanManage',
        component: () => import("@/views/packageManagement/SalePlanManage.vue"),
        name: '套餐管理',
      },
      {
        path: '/DistributeToMe',
        component: () => import("@/views/packageManagement/DistributeToMe.vue"),
        name: '分配给我的',
      }, {
        path: '/DistributeByMe',
        component: () => import("@/views/packageManagement/DistributeByMe.vue"),
        name: '我分配的',
      }, {
        path: '/SaleQuery',
        component: () => import("@/views/packageManagement/SaleQuery.vue"),
        name: '套餐查询',
      },
      // 代理商管理
      {
        path: '/AgentUserManage',
        component: () => import("@/views/agentManagement/AgentUserManage.vue"),
        name: '代理商录入',
      },

      {
        path: '/CusToAgent',
        component: () => import("@/views/agentManagement/CusToAgent.vue"),
        name: '客户转代理',
      },
      // 综合查询comprehensiveQuery
      {
        path: '/CardQuery',
        component: () => import("@/views/comprehensiveQuery/CardQuery.vue"),
        name: '卡信息查询',
      },
      {
        path: '/RechargeQuery',
        component: () => import("@/views/comprehensiveQuery/RechargeQuery.vue"),
        name: '充值纪录',
      },

      // 结算管理settlementManagement

      {
        path: '/WithdrawQuery',
        component: () => import("@/views/settlementManagement/WithdrawQuery.vue"),
        name: '提现查询',
      },
      {
        path: '/WithdrawExam',
        component: () => import("@/views/settlementManagement/WithdrawExam.vue"),
        name: '提现审批',
      },


      {
        path: '/PasswordManage',
        component: () => import("@/views/organ/PasswordManage.vue"),
        name: '密码管理',
      },
    ]
  },


  {
    path: '/404',
    component: () => import("@/views/404/404.vue"),
    name: '',
  },
  {
    path: '*',
    redirect: {
      path: '/404'
    }
  }

];

const router = new VueRouter({
  routes,
  mode: 'history'
  // mode: 'hash'
})


export default routes;