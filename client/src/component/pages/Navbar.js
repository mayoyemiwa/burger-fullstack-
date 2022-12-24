import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {dispatchViewCart, dispatchIsNotLogged, dispatchLog_In_With, dispatchUnLog_In_With} from '../../redux/actions/authAction'
import {useDispatch, useSelector} from 'react-redux'

const Navbar = () => {

const [ toggle1, setToggle1 ] = useState(false);
const [ toggle2, setToggle2 ] = useState(false);
const [ toggle3, setToggle3 ] = useState(false);
const [ toggle4, setToggle4 ] = useState(false);
const [ toggle5, setToggle5 ] = useState(false);
const [ page404, setPage404 ] = useState(false);
const [viewCart, setViewCart] = useState(false)
const [inOrders, setInOrders] = useState(false);
const [loginWith, setLoginWith] = useState(false);
const [test, setTest] = useState(false);
const [test2, setTest2] = useState(false);
const [test3, setTest3] = useState(false);
const [name, setName] = useState("");
const navigate = useNavigate();
const dispatch = useDispatch()
const auth = useSelector(state => state.auth)
const login = useSelector(state => state.loginWith) 

const displayAll = () => {dispatch(dispatchLog_In_With.dispatchFacebook()); dispatch(dispatchLog_In_With.dispatchInstagram()); dispatch(dispatchLog_In_With.dispatchTwitter())}
const unDisplayAll = () => {dispatch(dispatchUnLog_In_With.dispatchUnFacebook()); dispatch(dispatchUnLog_In_With.dispatchUnInstagram()); dispatch(dispatchUnLog_In_With.dispatchUnTwitter())}

    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === '/'||location.pathname === '/services' || location.pathname === '/about' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/orders' || location.pathname === '/page404'){
                if(location.pathname === '/'){setToggle1(true); unDisplayAll(); setName(""); setTest(false); setTest2(false); setTest3(false) }else {setToggle1(false)}
                if(location.pathname === '/services'){setToggle2(true); unDisplayAll(); setTest(false); setTest2(false); setTest3(false)} else setToggle2(false)
                if(location.pathname === '/about'){setToggle3(true); unDisplayAll(); setTest(false); setTest2(false); setTest3(false)} else setToggle3(false)
                if(location.pathname === '/login'){
                    if(name === "facebook"){ unDisplayAll(); dispatch(dispatchLog_In_With.dispatchFacebook()); setTest(true); setTest2(false); setTest3(false)}
                        else if(name === "instagram"){ unDisplayAll(); dispatch(dispatchLog_In_With.dispatchInstagram()); setTest2(true); setTest(false); setTest3(false)} 
                        else if(name === "twitter"){unDisplayAll(); dispatch(dispatchLog_In_With.dispatchTwitter()); setTest3(true); setTest2(false); setTest(false)}
                        else displayAll()
                    setToggle4(true) 
                }else setToggle4(false)
                if(location.pathname === '/signup') {setToggle5(true); unDisplayAll()} else setToggle5(false)
                if(location.pathname === '/page404') setPage404(true); else setPage404(false)
                if(location.pathname === '/orders') {setInOrders(true); setViewCart(true)}else setInOrders(false);  setViewCart(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, name])

    const handleClick = async(e) =>{
        try{
            
            dispatch(dispatchIsNotLogged())
            dispatch({type:"DELETE_TOKEN", payload:""})
            dispatch({type:"DELETE_USER", payload:""})
            const result = await axios.get(`/api/logout`)
            if(result){
                navigate('/')
            }else{
                throw Error('You are unable to Logout')
            }
        }
        catch(error){
            console.log(error)
        }
    }
    const handleBuy = () => {
        dispatch(dispatchViewCart())
    }
    const handleMouseOver = () =>  {
        setLoginWith(true)
        
    }
    const handleMouseOut = () =>  {
        setLoginWith(false)
    }
    const handleLoginClick = () => {
        setTest(false); setTest2(false); setTest3(false)
        setName("")
        displayAll()
    }

    const handleLoginWith = (e) => {
        const {name} = e.target;
        setName(name)
    }


    return (
        <div >
            {inOrders ? 
            (<nav className="signoutNavbar fixed-top">
            <div className="signoutContainer">
                <div className="mylogo navbar-brand" style={{marginTop:"30px"}}>
                    <p className="logo"></p>
                    <p className=" text-light ms-5 col-3 logo1" style={{marginRight:"18em"}}>Burger</p>
                </div>
                <div>
                    <ul className="ul">
                        {auth.isLogged &&  <li style={{position:"absolute", right:"40%", left:"45%", listStyleType:"none", width:"auto"}}><h6 className="h6" >WELCOME <br/>{auth.user.user.username}</h6></li>}
                        
                        {auth.isLogged && <div className="count-posi">
                        <div style={{marginRight:"2em"}}>
                            {auth.check && <span className="nav-span">{auth.count}</span>}
                            {auth.isLogged && <span onClick={handleBuy} className={auth.check ? "navBuy navBuy1" : "navBuy spec"}><FontAwesomeIcon icon={faCartShopping}/>   Buy </span>}
                        </div>
                            
                        </div>}
                        {auth.isLogged && <li style={{position:"absolute", right:"-5.6em", top:"2.7em" }} onClick={handleClick} className={`nav-item ms-0 ms-lg-0  ${toggle4 ? 'navclick navclick2' : 'navclick2'}`}><Link to="/" className="nav-link active text-light" aria-current="page">Logout</Link></li>}
                        {!auth.isLogged && <li style={{marginTop:"20px", marginRight:"2.5em", listStyleType:"none"}} className={`nav-item ms-5 ms-lg-0 ${toggle1 ? 'navclick' : ''}`}><Link to="/" className="nav-link active text-light" aria-current="page">Home</Link></li>}
                    </ul>
                    
                </div>
            </div>
        </nav>) 
        :
         viewCart ?  (
            <nav className="navbar navbar-expand-lg navbar-light bg-black mb-0 fixed-top">
                <div className="container-fluid p-3 " >
                        {/* <img className="logo" src="" alt=""/> */}
                        <div className="mylogo navbar-brand">
                            <p className="logo"></p>
                            <p className=" text-light ms-5 col-3 logo1">Burger</p>
                        </div>
                        
                        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span ><svg width="32" height="32" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg></span>
                        </button>
                    <div className="collapse navbar-collapse text-center text-lg-start " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs ">
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle1 ? 'navclick' : ''}`}><Link to="/" className="nav-link active text-light" aria-current="page">Home</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle2 ? 'navclick' : ''}`}><Link to="/services" className="nav-link active text-light" aria-current="page">Services</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle3 ? 'navclick' : ''}`}><Link to="/about" className="nav-link active text-light" aria-current="page">About Us</Link></li>
                            <li onClick={handleLoginClick} className={`nav-item ms-5 ms-lg-0 ${toggle4 ? 'navclick' : ''}`}><Link to="/login" className="nav-link active text-light" aria-current="page">Login</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle5 ? 'navclick' : ''}`}><Link to="/signup" className="nav-link active text-light signup" aria-current="page">Sign Up</Link></li>             
                        </ul>

                        <div className="social col-3 ">
                            <div className="count-posi">
                                {auth.check && <span className="nav-span">{auth.count}</span>}
                                <span onClick={handleBuy} className={!auth.check ? "navBuy navBuy1" : "navBuy"}><FontAwesomeIcon icon={faCartShopping}/>   Buy </span>
                            </div>
                        </div>
                    </div>
                </div>
        </nav>)
        : 
        (page404 || (location.pathname === '*')) ? (
            <nav className="navbar navbar-expand-lg navbar-light bg-black mb-0 fixed-top" style={{marginBottom:"-20px"}}>
                <div className="container-fluid p-3 " >
                        <div className="mylogo navbar-brand">
                            <p className="logo"></p>
                            <p className=" text-light ms-5 col-3 logo1">Burger</p>
                        </div>
                    <div className=" text-center text-lg-start" style={{marginRight:'6em'}} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs ">
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle1 ? 'navclick' : ''}`}><Link to="/" className="nav-link active text-light" aria-current="page">Home</Link></li>
                        </ul>
                    </div>
                </div>
        </nav>)
        :
        (
            <nav className="navbar navbar-expand-lg navbar-light bg-black mb-0 fixed-top">
                <div className="container-fluid p-3 " >
                        <div className="mylogo navbar-brand">
                            <p className="logo"></p>
                            <p className=" text-light ms-5 col-3 logo1">Burger</p>
                        </div>
                        
                        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span ><svg width="32" height="32" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg></span>
                        </button>
                    <div className="collapse navbar-collapse text-center text-lg-start " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs ">
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle1 ? 'navclick' : ''}`}><Link to="/" className="nav-link active text-light" aria-current="page">Home</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle2 ? 'navclick' : ''}`}><Link to="/services" className="nav-link active text-light" aria-current="page">Services</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle3 ? 'navclick' : ''}`}><Link to="/about" className="nav-link active text-light" aria-current="page">About Us</Link></li>
                            <li  onClick={handleLoginClick} className={`nav-item ms-5 ms-lg-0 ${toggle4 ? 'navclick' : ''}`}><Link to="/login" className="nav-link active text-light" aria-current="page">Login</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle5 ? 'navclick' : ''}`}><Link to="/signup" className="nav-link active text-light signup" aria-current="page">Sign Up</Link></li>             
                        </ul>
                             
                        {loginWith &&  <span style={{color:"white", marginBottom:"35px", marginRight:"-25px", fontSize:"10px", fontWeight:"600"}} >Login with: </span>}
                        <ul className="social col-3 ">
                            {(!test) ? <Link to="/login" className="google" name="facebook" onClick={handleLoginWith} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} /> : login.facebook ? "" : <Link to="/login" className="fb" name="facebook" onClick={handleLoginWith} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} />}
                            {(!test2) ? <Link to="/login" className="fb" name="instagram" onClick={handleLoginWith} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}/> : ""}
                            {(!test3) ? <Link to="/login" className="tw" name="twitter" onClick={handleLoginWith} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}/> : ""}
                        </ul>
                    </div>
                </div>
        </nav>) }
        </div>
    )
}

export default Navbar;