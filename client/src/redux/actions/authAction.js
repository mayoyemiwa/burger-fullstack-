import ACTIONS from './index'
import axios from 'axios'

export const dispatchViewCart = () => {
    return {
        type: ACTIONS.VIEWCART
    }
}

export const dispatchGet_Count = () => {
    return {
        type: ACTIONS.COUNT
    }
}

export const dispatchDecrease = () => {
    return {
        type: ACTIONS.DECREASE
    }
}

export const dispatchGet_Check = () => {
    return {
        type: ACTIONS.CHECK
    }
}
export const dispatchUnCheck = () => {
    return {
        type: ACTIONS.UNCHECK
    }
}
export const fetchUser = async() => {
    const result =  await axios.get('/api/login')
    return result
}
export const dispatchGet_User_Login = (result) => {
        return {
            type: ACTIONS.GET_USER,
            payload:{
                user: result.data
            }
        }
}
export const dispatchIsLogged = () => {
    return {
        type: ACTIONS.ISLOGGED
    }
}
export const dispatchIsNotLogged = () => {
    return {
        type: ACTIONS.ISNOTLOGGED
    }
}
export const dispatchIsLoad = () => {
    return {
        type: ACTIONS.ISLOAD
    }
}
export const dispatchLog_In_With = {
    dispatchFacebook : () =>{
        return {
            type: ACTIONS.LOGINWITH.FACEBOOK
        }
    },
    dispatchInstagram : () =>{
        return {
            type: ACTIONS.LOGINWITH.INSTAGRAM
        }
    },
    dispatchTwitter : () =>{
        return {
            type: ACTIONS.LOGINWITH.TWITTER
        }
    }
}
export const dispatchUnLog_In_With = {
    dispatchUnFacebook : () =>{
        return {
            type: ACTIONS.UNLOGINWITH.UNFACEBOOK
        }
    },
    dispatchUnInstagram : () =>{
        return {
            type: ACTIONS.UNLOGINWITH.UNINSTAGRAM
        }
    },
    dispatchUnTwitter : () =>{
        return {
            type: ACTIONS.UNLOGINWITH.UNTWITTER
        }
    }
}