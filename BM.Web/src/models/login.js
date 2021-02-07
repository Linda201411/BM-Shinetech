import { history } from 'umi';
import { AccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setStoredUser, setToken, delStoredUser } from '@/utils/utils';

const Model = {
    namespace: 'login',
    state: {
        status: undefined,
        message: '',
        currentAuthority: "user"
    },
    effects: {
        * login({ payload }, { call, put }) {
            const response = yield call(AccountLogin, payload);
            yield put({
                type: 'loginReducer',
                payload: response,
            });
            if (response && response.Status > -1) {
                //save user data
                setStoredUser({...response.Data });

                //save Bearer token
                setToken(response.Data.AccessToken || '');

                //redirect home page
                const params = getPageQuery();
                const { redirect } = params;
                //慎用history进行跳转
                window.location.href = redirect || '/';
            }
        },
        logout() {
            const { redirect } = getPageQuery();
            if (!redirect && window.location.pathname !== '/user/login') {
                history.replace({ pathname: '/user/login' });
            }
            delStoredUser();
        },
    },
    reducers: {
        loginReducer(state, { payload }) {
            setAuthority('user');
            return {...state, status: payload.Status, message: payload.Message };
        },
    },
};
export default Model;