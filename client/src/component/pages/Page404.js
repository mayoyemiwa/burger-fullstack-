import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const Page404 = ({pageNotFound, pageNotAvailable, pageError}) => {
    const [notLogged, setNotLogged] = useState(false);
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    

    useEffect(()=>{
        setNotLogged(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!auth.isLogged])

    useEffect(()=>{
        if(auth.isLogged) setNotLogged(false)

    }, [auth.isLogged])

    return ( pageNotFound ? 
        <div>
            {<div className="sbg2"><div style={{position:"relative"}} className="signupContainer2">
                    <p  style={{color:"red", textAlign:"center", marginTop:"40px"}} className="404">
                    <b style={{color:"black", fontSize:"40px"}}>"Page Not Found"</b>
                    </p>
                    <b onClick={(e)=> {navigate(-1)}} style={{color:"black", cursor:"pointer", position:"absolute", bottom:"16px", right:"16px", fontSize:"16px"}}><FontAwesomeIcon icon={faArrowLeftLong}/>  Back</b>
                </div>
            </div>}
        </div>
        : 
        pageNotAvailable ?
        <div>
            {<div className="sbg2"><div style={{position:"relative"}} className="signupContainer2">
                    <p  style={{color:"red", textAlign:"center", marginTop:"0px"}} className="404">
                    <b style={{color:"black", fontSize:"20px"}}>"Page Not Available:"<br/>This page is not available for the purpose of development</b>
                    </p>
                    <b onClick={(e)=> {navigate(-1)}} style={{color:"black", cursor:"pointer", position:"absolute", bottom:"16px", right:"16px", fontSize:"16px"}}><FontAwesomeIcon  icon={faArrowLeftLong}/>  Back</b>
                </div>
            </div>}
        </div>
        :
        pageError ?
        <div>
            {<div className="sbg2"><div style={{position:"relative"}} className="signupContainer2">
                    <p  style={{color:"red", textAlign:"center"}} className="404">
                    error.message: "Request failed with status code 500"
                    This error can be as a result of bad network. <br/> <span style={{color:"black", textAlign:"center"}}>Please check your <b>NETWORK CONNECTION</b></span>
                    </p>
                    <b onClick={()=> {navigate(-1)}} style={{color:"black", cursor:"pointer", position:"absolute", bottom:"16px", right:"16px", fontSize:"16px"}}><FontAwesomeIcon  icon={faArrowLeftLong}/>  Back</b>
                </div>
            </div>}
        </div>
        :
        (notLogged && !auth.isLoad) ?
        <div>
            {<div className="sbg2"><div style={{position:"relative"}} className="signupContainer2">
                    <p  style={{color:"red", textAlign:"center"}} className="404">
                    The resources you're trying to get cannot be reach
                    <b onClick={()=> {navigate(-1)}} style={{color:"black", cursor:"pointer", position:"absolute", bottom:"16px", right:"16px", fontSize:"16px"}}><FontAwesomeIcon icon={faArrowLeftLong}/>  Back</b>
                    </p>
                    <p  style={{color:"black", textAlign:"center"}}>Please <Link to="/signup"> Signup</Link> OR <Link to="/login"> Login</Link></p>
                </div>
            </div>}
        </div>
        :
        (auth.isLoad && notLogged) ? 
        <div>
            {<div className="sbg2"><div style={{position:"relative"}} className="signupContainer2">
                    <p  style={{color:"red", textAlign:"center"}} className="404">
                    error.message: "Request failed with status code 500"
                    This error can be as a result of bad network. <br/> <span style={{color:"black", textAlign:"center"}}>Please check your <b>NETWORK CONNECTION</b></span>
                    <b onClick={()=> {navigate(-1)}} style={{color:"black", cursor:"pointer", position:"absolute", bottom:"16px", right:"16px", fontSize:"16px"}}><FontAwesomeIcon onClick={()=> navigate(-1)} icon={faArrowLeftLong}/>  Back</b>
                    </p>
                </div>
            </div>}
        </div>
        :
        <div>
        {<div className="sbg2"><div style={{position:"relative"}} className="signupContainer2">
                <p  style={{color:"red", textAlign:"center"}} className="404">
                error.message: "Request failed with status code 500"
                This error can be as a result of bad network.>Please check your NETWORK CONNECTION
                <b onClick={(e)=> {navigate(-1)}} style={{color:"black", cursor:"pointer", position:"absolute", bottom:"16px", right:"16px", fontSize:"16px"}}><FontAwesomeIcon icon={faArrowLeftLong}/>  Back</b>
                </p>
                
            </div>
        </div>}
    </div>
        
        // )
    )
}

export default Page404
