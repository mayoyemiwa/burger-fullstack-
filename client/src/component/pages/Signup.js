import {React, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom'
import '../../css/Signup.css';
import {isEmpty, Empty, isEmail, CheckLength} from '../validation/Validation'
import {useSelector, useDispatch} from 'react-redux'
import {dispatchIsLoad} from '../../redux/actions/authAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
// import {url} from '../../App.js';

const Signup = () => {
  const initialInputValues = {username:"", email:"", pwd:""};
  const [signupValues, setSignupValues] = useState(initialInputValues);
  const inputErrors = {username:"", email:"", pwd:""};
  const [signupError, setSignupError] = useState(inputErrors)
  const [isLoading, setIsLoding] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    setSignupValues({...signupValues, [name]:value})
    setSignupError({...signupError, [name]:'' })
}
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name} = e.target
        setIsLoding(true)
        !auth.isLogged && dispatch(dispatchIsLoad())
        
        if(isEmpty(signupValues.username) || isEmpty(signupValues.email) || isEmpty(signupValues.pwd)){
            Empty(name, signupValues, signupError, setSignupError)
            setIsLoding(false)
            return
        }
        if(signupValues.username.length <= 8|| signupValues.pwd <= 6){
            CheckLength(signupValues, signupError, setSignupError)
            setIsLoding(false)
            return
        }
        if(!isEmail(signupValues.email)){
            setSignupError({...signupError, email:"The Email does not match"})
            setIsLoding(false)
            return 
        }
    
             try{
                const result = await axios.post(`/api/signup`, {signupValues});
                setIsLoding(false);
                setSignupError({...signupError, username:'', email:'', pwd:'' })
                setVerificationError(result.data.status)
                setMessage(result.data.message)
                setSuccess(true)
                setSignupValues(initialInputValues)
                }
             catch(error){
                 if(error.message === "Request failed with status code 500" || error.message === "Request failed with status code 400"){
                     navigate('/page404')
                 }
                    setIsLoding(false)
                    setSignupError({...signupError, 
                        email:error.response.data.email, 
                        username:error.response.data.username, 
                        pwd:error.response.data.pwd
                 }); 
                }
}
    return (<div>
        {!success ? 
            <div className="sbg" >
                <div className="signupContainer">
                    {isLoading && <div style={{marginTop:"16px"}} className="tc">Loading</div>}
                    <p className="signupheader">SIGNUP</p>
                <form  className="signUP" onSubmit={handleSubmit}>
                    <div className="signUP">
                        <label className="signupLabel">FULLNAME</label>
                        <input className="signupInput bg-white" onChange={handleChange} name="username" autoComplete="on" value={signupValues.username} type="text" placeholder="John Doe"/>
                        { signupError.username.length > 0 && <div className="signError">{signupError.username}</div> }
                    </div>
                    <div className="signUP">
                        <label className="signupLabel">EMAIL ADDRESS</label>
                        <input className="signupInput bg-white" onChange={handleChange} name="email" autoComplete="on" value={signupValues.email} type="text" placeholder="john@example.com"/>
                        { signupError.email.length > 0 && <div className="signError">{signupError.email}</div> }
                    </div>
                    <div className="signUP">
                        <label className="signupLabel2">PASSWORD</label>
                        <input className="signupInput bg-white" onChange={handleChange} type="text" name="pwd" value={signupValues.pwd} placeholder="password"/>
                    </div>
                    { signupError.pwd.length > 0 && <div className="signError">{signupError.pwd}</div> }
                    <button className="signupBtn">REGISTER</button>
                </form>
                <p className="signupP">Already a member?<Link to="/login" className="signupF">Login</Link></p>
                </div>
            </div>:
            <div className="sbg2" >
                <div style={{position:"relative"}} className="signupContainer2">
                    <h1 style={{color:"green", textAlign:"center"}}>{verificationError}: { message }</h1>
                    <b onClick={(e)=> {navigate(-1)}} style={{color:"black", cursor:"pointer", position:"absolute", bottom:"16px", right:"16px", fontSize:"16px"}}><FontAwesomeIcon icon={faArrowLeftLong}/> Back</b>
                </div>
            </div>
        }
    </div>)
}

export default Signup
