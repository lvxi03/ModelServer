import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/utils';
import { getToken,setToken as _setToken, removeToken } from '../../utils';

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) { // 方法名改为setToken
      state.token = action.payload;
      //localStorage也存一份
      _setToken(action.payload)
    },
    setUserInfo(state,action){
      state.userInfo = action.payload
    },
    ClearUserInfo(state){
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

// 解构出actionCreator
const { setToken,setUserInfo,ClearUserInfo } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      const res = await request.post('/authorizations', loginForm);
      dispatch(setToken(res.data.token)); // 使用setToken
    } catch (error) {
      console.error('登录失败:', error);
      throw error; // 重新抛出错误，以便在调用时进行处理
    }
  };
};

// 异步获取个人信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}
export { fetchLogin,fetchUserInfo, setToken,ClearUserInfo }; // 导出fetchLogin和setToken

export default userReducer;