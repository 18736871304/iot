import axios from 'axios';
import Qs from "qs";
let base = ''; //添加域名
//登录
export const login = params => {
  return axios.post(`${base}/api/user/logon`, Qs.stringify(params)).then(res => res.data);
};

//退出登录
export const logout = params => {
  return axios.post(`${base}/api/user/logout`, Qs.stringify(params)).then(res => res.data);
};
//获取菜单
export const getAuthMenuList = params => {
  return axios.post(`${base}/api/menu/getAuthMenuList`, Qs.stringify(params)).then(res => res.data);
};
//获取菜单
export const getDict = params => {
  return axios.post(`${base}/api/dict/getDict`, Qs.stringify(params)).then(res => res.data);
};
// userManage 菜单
//  获取用户列表
export const getUserList= params => {
  return axios.post(`${base}/api/user/getUserList`, Qs.stringify(params)).then(res => res.data);
};
// 新增用户
export const addUser= params => {
  return axios.post(`${base}/api/user/addUser`, Qs.stringify(params)).then(res => res.data);
};
// 修改用户
export const editUser= params => {
  return axios.post(`${base}/api/user/editUser`, Qs.stringify(params)).then(res => res.data);
};
// 删除用户
export const deleteUser= params => {
  return axios.post(`${base}/api/user/deleteUser`, Qs.stringify(params)).then(res => res.data);
};
// AuthManage菜单 /api/menu/getMenuGroupList
// 获取菜单列表
export const getMenuGroupList= params => {
  return axios.post(`${base}/api/menu/getMenuGroupList`, Qs.stringify(params)).then(res => res.data);
};
// 新增菜单
export const addMenuGroup= params => {
  return axios.post(`${base}/api/menu/addMenuGroup`, Qs.stringify(params)).then(res => res.data);
};
// 修改菜单
export const editMenuGroup= params => {
  return axios.post(`${base}/api/menu/editMenuGroup`, Qs.stringify(params)).then(res => res.data);
};
//  删除菜单
export const deleteMenuGroup= params => {
  return axios.post(`${base}/api/menu/deleteMenuGroup`, Qs.stringify(params)).then(res => res.data);
};
// 权限菜单列表
export const getMenuListByMenuGroup= params => {
  return axios.post(`${base}/api/menu/getMenuListByMenuGroup`, Qs.stringify(params)).then(res => res.data);
};
// 关联菜单/api/menu/createMenuRelation
export const createMenuRelation= params => {
  return axios.post(`${base}/api/menu/createMenuRelation`, Qs.stringify(params)).then(res => res.data);
};

// 用户权限菜单
// 获取用户
export const getUserAuthList= params => {
  return axios.post(`${base}/api/user/getUserAuthList`, Qs.stringify(params)).then(res => res.data);
};
// 新增菜单组
export const addUserAuth= params => {
  return axios.post(`${base}/api/user/addUserAuth`, Qs.stringify(params)).then(res => res.data);
};
// 删除菜单
export const deleteUserAuth= params => {
  return axios.post(`${base}/api/user/deleteUserAuth`, Qs.stringify(params)).then(res => res.data);
};

// 卡发货/api/simCard/salesSimCard

export const salesSimCard= params => {
  return axios.post(`${base}/api/simCard/salesSimCard`, Qs.stringify(params)).then(res => res.data);
};







// 内容管理——标签管理
//查询标签
export const queryLable = params => {
  return axios.post(`${base}/api/htmlLable/queryLable`, Qs.stringify(params)).then(res => res.data);
};
//新增标签
export const addLable = params => {
  return axios.post(`${base}/api/htmlLable/addLable`, Qs.stringify(params)).then(res => res.data);
};

//修改标签 
export const updateLable = params => {
  return axios.post(`${base}/api/htmlLable/updateLable`, Qs.stringify(params)).then(res => res.data);
};

//删除标签
export const deleteLable = params => {
  return axios.post(`${base}/api/htmlLable/deleteLable`, Qs.stringify(params)).then(res => res.data);
};


// 套餐组管理
//查询套餐组
export const querySaleplanGroupList = params => {
  return axios.post(`${base}/api/saleplan/querySaleplanGroupList`, Qs.stringify(params)).then(res => res.data);
};
//新增套餐租
export const addSaleplanGroup = params => {
  return axios.post(`${base}/api/saleplan/addSaleplanGroup`, Qs.stringify(params)).then(res => res.data);
};
//修改套餐组
export const updateSaleplanGroup = params => {
  return axios.post(`${base}/api/saleplan/updateSaleplanGroup`, Qs.stringify(params)).then(res => res.data);
};
//删除套餐组
export const deleteSaleplanGroup = params => {
  return axios.post(`${base}/api/saleplan/deleteSaleplanGroup`, Qs.stringify(params)).then(res => res.data);
};
//查询套餐列表
export const querySaleplanList = params => {
  return axios.post(`${base}/api/saleplan/querySaleplanList`, Qs.stringify(params)).then(res => res.data);
};
//新增套餐
export const addSaleplan = params => {
  return axios.post(`${base}/api/saleplan/addSaleplan`, Qs.stringify(params)).then(res => res.data);
};
//修改套餐
export const editSaleplan = params => {
  return axios.post(`${base}/api/saleplan/editSaleplan`, Qs.stringify(params)).then(res => res.data);
};
//修改套餐价格
export const updatePlanDistribute = params => {
  return axios.post(`${base}/api/saleplan/updatePlanDistribute`, Qs.stringify(params)).then(res => res.data);
};



//删除套餐
export const deleteSaleplan = params => {
  return axios.post(`${base}/api/saleplan/deleteSaleplan`, Qs.stringify(params)).then(res => res.data);
};
// 分配给我的
export const queryAssignSaleGroup = params => {
  return axios.post(`${base}/api/saleplan/queryAssignSaleGroup`, Qs.stringify(params)).then(res => res.data);
};
// 分配按钮
export const distributeSaleplan = params => {
  return axios.post(`${base}/api/saleplan/distributeSaleplan`, Qs.stringify(params)).then(res => res.data);
};
// 分配按钮
export const distributeToUser = params => {
  return axios.post(`${base}/api/saleplan/distributeToUser`, Qs.stringify(params)).then(res => res.data);
};

// 卡导入
// 查询卡列表
export const querySimCardList = params => {
  return axios.post(`${base}/api/simCard/querySimCardList`, Qs.stringify(params)).then(res => res.data);
};
// 卡信息详细列表查询
export const querySimCardInfoList = params => {
  return axios.post(`${base}/simCard/querySimCardInfoList`, Qs.stringify(params)).then(res => res.data);
};
// 卡关联套餐组
export const relationPlanGroup = params => {
  return axios.post(`${base}/api/simCard/relationPlanGroup`, Qs.stringify(params)).then(res => res.data);
};
// 卡关联套餐组
export const querySaleplanGroupEffectiveList = params => {
  return axios.post(`${base}/api/saleplan/querySaleplanGroupEffectiveList`, Qs.stringify(params)).then(res => res.data);
};
// 卡下发
// 查询列表
export const querySimCardIssueList = params => {
  return axios.post(`${base}/api/simCard/querySimCardIssueList`, Qs.stringify(params)).then(res => res.data);
};
// 查询代理人
export const queryAgentUser = params => {
  return axios.post(`${base}/api/user/queryAgentUser`, Qs.stringify(params)).then(res => res.data);
};
// 卡下发操作
export const issueSimCard = params => {
  return axios.post(`${base}/api/simCard/issueSimCard`, Qs.stringify(params)).then(res => res.data);
};

// 代理商管理
// 查询代理商
export const getAgentList = params => {
  return axios.post(`${base}/api/user/getUserList`, Qs.stringify(params)).then(res => res.data);
};
// 新增代理商
export const addAgent = params => {
  return axios.post(`${base}/api/user/addUser`, Qs.stringify(params)).then(res => res.data);
};
// 修改代理商
export const editAgent = params => {
  return axios.post(`${base}/api/user/editUser`, Qs.stringify(params)).then(res => res.data);
};
// 删除代理商
export const deleteAgent = params => {
  return axios.post(`${base}/api/user/deleteUser`, Qs.stringify(params)).then(res => res.data);
};
// 客户转代理人
export const customerToAgent = params => {
  return axios.post(`${base}/api/user/customerToAgent`, Qs.stringify(params)).then(res => res.data);
};