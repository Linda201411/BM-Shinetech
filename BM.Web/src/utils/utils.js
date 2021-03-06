import { parse } from 'querystring';
import { isJsonFormat } from './common';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
    if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
        return true;
    }
    return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development') {
        return true;
    }
    return isAntDesignPro();
};

//保存上一个页面的地址链接
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

//user
export const setStoredUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getStoredUser = () => {
    const storedUser = localStorage.getItem('user');
    const flag = isJsonFormat(storedUser);
    if (storedUser !== null && flag) {
        return JSON.parse(storedUser);
    } else {
        return {
            UserId: 0,
            UserName: '',
            UserRole: 0,
            RoleName: ''
        };
    }
}

export const delStoredUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authority');
    localStorage.removeItem('token');
}

//Bearer Token
export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const getToken = () => {
    const token = localStorage.getItem('token');
    return token || '';
}

export const isLoginSuccessed = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
        return true;
    } else {
        return false;
    }
}
