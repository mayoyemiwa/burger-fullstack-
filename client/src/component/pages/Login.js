
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import '../../css/Login.css';
import { dispatchIsLogged, dispatchIsLoad} from '../../redux/actions/authAction'
import { isEmail } from '../validation/Validation'
import {useDispatch, useSelector} from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {gapi} from 'gapi-script';
import facebookLogo from '../../assets/Facebook_logo.png'
import twitterLogo from '../../assets/twitter-logo.png'
// import {url} from '../../App.js';
axios.defaults.withCredentials = true;

const Login = () => {

    const initialInputValues = { email:"", pwd:""};
    const [loginValues, setLoginValues] = useState(initialInputValues);
    const inputErrors = {email:"", pwd:""};
    const [loginError, setLoginError] = useState(inputErrors)
    const [loginSuccess, setLoginSuccess] = useState('')
    const [isLoading, setIsLoding] = useState(false);
    const hide= false;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const login = useSelector(state => state.loginWith)

//HANDLECHANGE START HERE!!!!!!
const handleChange = (e) => {
    const {name, value} = e.target
    setLoginValues({...loginValues, [name]:value})
    if(e.target.name === "email"){
        setLoginError({...loginError, email:''})
    }
    if(e.target.name === "pwd"){
        setLoginError({...loginError, pwd:''})
    }
}
//HANDLECHANGE END HERE!!!!!!
  
//HANDLESUBMIT START HERE!!!!!!
const handleSubmit =async(e) => {
    e.preventDefault();
    setIsLoding(true)

    !auth.isLogged && dispatch(dispatchIsLoad())
    if(!loginValues.email.length > 0 || !loginValues.pwd.length > 0){
       if(!loginValues.email.length > 0){
            setLoginError({...loginError, email:'This field cannot be empty', pwd:'' })
            setIsLoding(false)
            return; }
       if(!loginValues.pwd.length > 0){
            setLoginError({...loginError, email:'', pwd:'This field cannot be empty' })
            setIsLoding(false)
            return; }
    }
    if(!isEmail(loginValues.email)){
            setLoginError({...loginError, email:"The Email does not match"})
            setIsLoding(false)
            return 
        }
         try{
            const result = await axios.post(`/api/login`, {loginValues}, {withCredentials:true})
                if(result.data.verify){
                    setIsLoding(false);
                        setLoginValues(initialInputValues)
                        dispatch(dispatchIsLogged())
                        setLoginError({...loginError, email:'', pwd:'' })
                        localStorage.setItem('myFirstLogin', true)
                        navigate('/', {replace:true})
                }
        }
        catch(error){
            if(error.message === "Request failed with status code 500"){
            return navigate(`/page404`, {replace: true})
           }
            setIsLoding(false)
            setLoginError({...loginError, 
                email:error.response.data.email, 
                pwd:error.response.data.pwd
                })
            }
        }
//HANDLESUBMIT END HERE!!!!!!

//GOOGLE_LOGIN START HERE!!!!!!
const clientId = "257872247518-2bogpbq049p1j365tj8hrpohjr3df1qn.apps.googleusercontent.com";
const responseGoogle = async (response) => { 
    setIsLoding(true)
        gapi.load("client:auth2", ()=>{
            gapi.auth2.init({clientId:clientId})
        })
    try{
        const res = await axios.post(`/api/google_login`, {tokenId:response.tokenId})
        if(res.data.verify){
            setIsLoding(false);
            setLoginValues(initialInputValues)
            dispatch(dispatchIsLogged())
            setLoginSuccess(res.data.msg)
            setLoginError({...loginError, email:'', pwd:'' })
            localStorage.setItem('myFirstLogin', true)
            navigate('/', {replace:true})
        }
    }
    catch(error){
        setIsLoding(false);
        console.log({error})
        if(error.message === "Request failed with status code 500"){
            return navigate('/error', {replace: true})
           }
        setLoginSuccess("")
        if(error.response.data.msg === "User already exist"){
            window.setTimeout(()=>{
                return navigate('/signup', {replace: true})
            }, 1500)
        }
        error.response.data.msg && setLoginSuccess(error.response.data.msg)
    }
}
//GOOGLE_LOGIN END HERE!!!!!!


//FACEBOOK_LOGIN START HERE!!!!!!
const responseFacebook = () => {
    window.setTimeout(()=>{
        setLoginSuccess("")
    }, 1500)
    setLoginSuccess("Please login with Google, this is just for development purpose.")
    // eslint-disable-next-line
    return
  }
  //FACEBOOK_LOGIN END HERE!!!!!!

  //TWITTER_LOGIN START HERE!!!!!!
  const authHandler = (err, data) => {
    window.setTimeout(()=>{
        setLoginSuccess("")
    }, 1500)
    setLoginSuccess("Please login with Google, this is just for development purpose.")
    //eslint-disable-next-line
    return
  };
  //TWITTER_LOGIN END HERE!!!!!!

const googleBtn = (text) => {
    return <div style={{backgroundColor:"white", cursor:"pointer", borderRadius:"5px", width:"129px", height:"30px", position:"relative", top:"0px"}} >
        {/* <img style={{position:"absolute", width:"30px", height:"30px", left:"20px", top:"1px"}} src={googleLogo}  alt=""/> */}
        <span style={{color:"black", position:"absolute", top:"2px", fontWeight:"800", letterSpacing:"3px", marginLeft:"-30px" }}>{text}</span>
    </div>
}

const facebookBtn = (text) => {
    return <div onClick={responseFacebook} style={{backgroundColor:"#4e71a8", cursor:"pointer", borderRadius:"5px", width:"190px", height:"40px", position:"relative", top:"-60px"}} >
        <img style={{position:"absolute", width:"30px", height:"40px", left:"20px", top:"0px"}} src={facebookLogo}  alt=""/>
        <span style={{color:"white", position:"absolute", top:"6px", fontWeight:"700", left:"75px", letterSpacing:"3px" }}>{text}</span>
    </div>
}
const twitterBtn = (text) => {
    return <div onClick={authHandler} style={{backgroundColor:"white", cursor:"pointer", borderRadius:"5px", width:"190px", height:"40px", position:"relative", top:"-70px"}} >
        <img style={{position:"absolute", width:"30px", height:"40px", left:"20px", top:"0px"}} src={twitterLogo}  alt=""/>
        <span style={{color:"#51c6ee", position:"absolute", top:"4px", fontWeight:"700", left:"75px", letterSpacing:"3px" }}>{text}</span>
    </div>
}

    return (
        <div className="sbg">
            <div className="loginContainer">
                {isLoading && <div style={{marginTop:"16px"}} className="tc">Loading</div>}
                {loginSuccess.length > 0 && <div style={{color:"red", margin:"auto", marginTop:"16px"}} className="tc">{loginSuccess}</div>}
                <p className="header">LOGIN</p>
                <form className="form" onSubmit={ handleSubmit }>
                    {(login.facebook && login.instagram && login.twitter) && <div>
                            <div className="login">
                            <label className="loginLabel">EMAIL ADDRESS</label>
                            <input className="loginInput bg-white" type="text" name="email" autoComplete="on" value={loginValues.email} onChange={handleChange} placeholder="john@example.com"/>
                        </div>
                        { loginError.email.length > 0 && <div className="loginError">{loginError.email}</div> }
                        <div className="loginFlex">
                            <label className="loginLabel2">PASSWORD</label>
                            <Link to="/forgetpassword" className="loginF">Forget Password</Link>
                        </div>
                            <input className="loginInput bg-white" type="password" name="pwd" value={loginValues.pwd} autoComplete="on" onChange={handleChange} placeholder="password"/>
                            { loginError.pwd.length > 0 && <div className="loginError">{loginError.pwd}</div> }
                        </div>
                    }
                           <div style={{marginTop:"4%", height:"50px", textAlign:"center", position:"relative", marginBottom:"13%"}}>
                               <p style={{color:"black", position:"absolute", fontSize:"14px", left:"9%", fontWeight:"800"}} >Login with: </p>
                               {login.facebook && <div style={{position:"absolute", left:"30%", top:"0%"}}>
                                   {hide && googleBtn("Google")}
                                  {<GoogleLogin
                                    clientId={clientId}
                                    buttonText={googleBtn("Google")}
                                    onSuccess={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />}
                               </div>}
                               {login.instagram && <div style={{position:"absolute", left:"30%", top:"250%"}}>
                                    {facebookBtn("facebook")}
                                    {hide && <FacebookLogin
                                            // appId="1088597931155576"
                                            // autoLoad={true}
                                            fields=""
                                            // onClick={componentClicked}
                                            callback={responseFacebook} 
                                        />}
                               </div>}
                               {login.twitter && <div style={{position:"absolute", left:"30%", top:"380%"}}>
                                    {twitterBtn("twitter")}
                               </div>}
                           </div>
                    {(login.facebook && login.instagram && login.twitter) && <button className="loginBtn">LOGIN</button>}
                </form>
                {(login.facebook && login.instagram && login.twitter) &&  <p className="loginP" >Not a member?<Link to="/signup" className="loginF">Sign Up</Link></p>}
            </div>
        </div>
    )
}

export default Login
