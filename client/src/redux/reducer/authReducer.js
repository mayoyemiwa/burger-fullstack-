import ACTIONS from '../actions/index';

let initialState = {
    user:[],
    viewCart: false,
    count:0,
    check:false,
    isLogged:false,
    isLoad:false,
}


const authReducer = (state = initialState, action) => {
    if(action.type === ACTIONS.VIEWCART){
         return {
             ...state,
             viewCart:true
            }
    }
    if(action.type === ACTIONS.CHECK){
         return {
             ...state,
             check:true
            }
    }
    if(action.type === ACTIONS.UNCHECK){
         return {
             ...state,
             check:false
            }
    }
    if(action.type === ACTIONS.COUNT){
         return {
             ...state,
             count:state.count + 1
            }
    }
    if(action.type === ACTIONS.DECREASE){
         return {
             ...state,
             count:state.count - 1
            }
    }
    if(action.type === ACTIONS.GET_USER){
            return {
                ...state,
                  user: action.payload.user
            }
    }
    if(action.type === ACTIONS.DELETE_USER){
            return {
                ...state,
                  user: action.payload
            }
    }
    if(action.type === ACTIONS.ISLOGGED){
         return {
             ...state,
                isLogged:true
            }
    }
    if(action.type === ACTIONS.ISNOTLOGGED){
         return {
             ...state,
                isLogged:false
            }
    }
    if(action.type === ACTIONS.ISLOAD){
         return {
             ...state,
                isLoad:true
            }
    }
    else{
        return state
    }
}

export default authReducer