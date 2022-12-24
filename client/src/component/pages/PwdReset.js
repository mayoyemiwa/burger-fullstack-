import { useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchIsLoad} from '../../redux/actions/authAction'
import {useState} from 'react';
import '../../css/Forgot.css'
import axios from 'axios';
// import {url} from '../../App.js';

    const PwdReset = () => {
        const [pwd, setPwd] = useState('');
        const [pwd2, setPwd2] = useState('');
        const [pwdError, setPwdError] = useState('');
        const [pwdError2, setPwdError2] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const [forgottenError, setForgottenError] = useState('');
        const [success, setSuccess] = useState('');
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const auth = useSelector(state => state.auth)

        const handleSubmit =async(e) => {
            e.preventDefault();
            setIsLoading(true);
            !auth.isLogged && dispatch(dispatchIsLoad())
            setPwdError('');
            setPwdError2('');
            setForgottenError('')
            if(pwd.length < 6 || pwd2.length < 6){
                if(pwd.length < 6 ){
                    setPwdError("This field can't be empty and shouldn't be less than six characters")
                    setIsLoading(false);
                }else if(pwd2.length < 6){
                    setPwdError2("This field can't be empty and shouldn't be less than six characters")
                    setIsLoading(false);
                }
            }
            else{
                if(pwd !== pwd2){
                    setIsLoading(false)
                    setPwdError('Password does not match')
                    setPwd("")
                    setPwd2("")
                }else{
                    try{
                       const result = await axios.post(`/api/pwdreset`, {pwd}, {withCredentials:true});
                    // const result = await axios.post('/api/pwdreset', {pwd}, {withCredentials:true})
                       setIsLoading(false);
                       setSuccess(result.data)
                       setTimeout(()=>{
                           setPwd("")
                           setPwd2("")
                           navigate('/login')
                       }, 4000)
                    }
                     catch(error){
                        if(error.message === "Request failed with status code 500"){
                            navigate('/page404')
                        }
                        setIsLoading(false);
                        setForgottenError(error.response.data)
                     }
                }
            }
        }

        return (
            <div className="sbg">
                <div className="forgotContainer">
                {isLoading && <div className="tc"><h4>Loading...</h4></div>}
                {forgottenError.length > 0 && <div className="tc loginError"><h4>{forgottenError}</h4></div>}
                {success.length > 0 && <div className="loginError2"><h4>{success}</h4></div>}
                    <p className="header">PASSWORD RESET</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="login">
                            <label className="loginLabel">ENTER PASSWORD</label>
                            <input className="loginInput bg-white" type="text" name="pwd" value={pwd} onChange={(e)=>{setPwd(e.target.value); setPwdError('')}} placeholder="john@example.com"/>
                            { pwdError.length > 0 && <div className="loginError">{pwdError}</div> }
                        </div>
                        <div className="login">
                            <label className="loginLabel">RE-ENTER PASSWORD</label>
                            <input className="loginInput bg-white" type="text" name="pwd2" value={pwd2} onChange={(e)=>{setPwd2(e.target.value); setPwdError2('')}} placeholder="john@example.com"/>
                            { pwdError2.length > 0 && <div className="loginError">{pwdError2}</div> }
                        </div>
                        <button className="loginBtn">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    
    export default PwdReset
    