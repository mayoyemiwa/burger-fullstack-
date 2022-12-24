import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import loginWith from './loginReducer'


export default combineReducers({
    auth,
    token,
    loginWith
})