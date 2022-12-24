import ACTIONS from '../actions/index';

let token = "";


const tokenReducer = (state = token, action) => {
    if(action.type === ACTIONS.GET_TOKEN){
         return  action.payload
    }
    if(action.type === ACTIONS.DELETE_TOKEN){
         return  action.payload
    }else{
        return state
    }
}

export default tokenReducer