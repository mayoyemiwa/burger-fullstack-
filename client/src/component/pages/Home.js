import {useState} from 'react';
import '../../css/Home.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {dispatchIsNotLogged, dispatchIsLoad} from '../../redux/actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
// import {url} from '../../App.js';

const Home = () => {
    const [click, setClick] = useState(false);
    let navigate = useNavigate();
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const HandleClick = async () => {
        setClick(true)
        console.log({token})
        !auth.isLogged && dispatch(dispatchIsLoad())
        console.log({token})
        
       try{
           console.log("before")
            const result = await axios.post(`/api/orders`, {token}, {withCredentials:true});
            console.log("after")
                if (result.data.verify) return navigate('/orders', { replace: true })
       }
       catch(err){
        console.log("home", {err})
           if(auth.isLogged && err.message === "Request failed with status code 500"){
               dispatch(dispatchIsNotLogged())
            return navigate('/page404', {replace: true})
           }
           if(!auth.isLogged && err.message === "Request failed with status code 500"){
               dispatch(dispatchIsNotLogged())
            return navigate('/login', {replace: true})
           }
        //    if(!auth.isLogged && err.message === "Request failed with status code 400"){
        //        dispatch(dispatchIsNotLogged())
        //     return navigate('/login', {replace: true})
        //    }
           if(err.response.data === "Please login now") return navigate(`/login`, {replace: true})
       }
    }
    return ( 
        <div className = "home-container myfixed">
            <label className = "myOffer" > Best Offer </label> 
            <div className = "text" >
                <h1 className = "myText"> super Burger </h1>
                <h1 className = "myText1" > Deal </h1> 
            </div> 
            <button className = {click ? "myOrder myOrder2" : "myOrder"} onClick = {HandleClick} > Order Now </button> 
            <div className = "wrapPrice">
                <h1 className = "myPrice" > Only $4.99 </h1> 
            </div> 
        </div>
    )
}

export default Home