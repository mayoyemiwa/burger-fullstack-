import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchIsLoad} from '../../redux/actions/authAction'
import axios from 'axios';
// import {url} from '../../App.js';

    const ForgetPwd = () => {
        const navigate = useNavigate()
        const [email, setEmail] = useState('');
        const [isLoading, setIsLoading] = useState('');
        const [success, setSuccess] = useState(false);
        const [message, setMessage] = useState('');
        const [error, setError] = useState('');
        const dispatch = useDispatch()
        const auth = useSelector(state => state.auth)

        const handleSubmit =async(e) => {
            e.preventDefault();
            setIsLoading(true);
            !auth.isLogged && dispatch(dispatchIsLoad())
            setError('')

            if(!email.length > 0){
                setError('This field cannot be empty')
                setIsLoading(false)
            }
            else{
                try{
                    const result = await axios.post(`/api/forgetPwd`, {email}, {withCredentials:true});
                    // const result = await axios.post('/api/forgetPwd', {email})
                    setSuccess(true)
                    setMessage(result.data.message)
                    setIsLoading(false);
                }
                 catch(error){
                    if(error.message === "Request failed with status code 500"){
                        navigate('/page404')
                    }
                     setError(error.response.data)
                     setIsLoading(false)
                 }
            }
        }
        return (<div>
            {!success ?
                <div style={{marginBottom:"-200px"}} className="sbg">
                <div className="loginContainer">
                {isLoading && <div className="tc">Loading</div>}
                    <p className="header">PASSWORD RESET</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="login">
                            <label className="loginLabel">ENTER YOUR EMAIL ADDRESS</label>
                            <input className="loginInput bg-white" type="text" name="email" value={email} onChange={(e)=>{setEmail(e.target.value); setError('')}} placeholder="john@example.com"/>
                            { error.length > 0 && <div className="signError">{error}</div> }
                        </div>
                        <button className="loginBtn">Submit</button>
                    </form>
                </div>
            </div> :
            <div className="sbg2" >
                <div className="signupContainer2">
                    <h2 style={{color:"green", textAlign:"center"}}>{ message }</h2>
                </div>
            </div> 
            }
        </div>
        )
    }
    export default ForgetPwd