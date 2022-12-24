import ACTIONS from '../actions/index';

let initialState = {
    facebook:false,
    instagram:false,
    twitter:false
}


const loginReducer = (state = initialState, action) => {
    if(action.type === ACTIONS.LOGINWITH.FACEBOOK){
        return {
            ...state,
                facebook:true
        }
    }
    if(action.type === ACTIONS.LOGINWITH.INSTAGRAM){
        return {
            ...state,
                instagram:true
        }
    }
    if(action.type === ACTIONS.LOGINWITH.TWITTER){
        return {
            ...state,
                twitter:true
        }
    }
    if(action.type === ACTIONS.UNLOGINWITH.UNFACEBOOK){
        return {
            ...state,
                facebook:false
        }
    }
    if(action.type === ACTIONS.UNLOGINWITH.UNINSTAGRAM){
        return {
            ...state,
                instagram:false
        }
    }
    if(action.type === ACTIONS.UNLOGINWITH.UNTWITTER){
        return {
            ...state,
                twitter:false
        }
    }
    else{
        return state
    }
}

export default loginReducer