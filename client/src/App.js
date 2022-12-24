import {useEffect} from 'react'
import Navbar from './component/pages/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './component/pages/Footer';
import Home from './component/pages/Home';
// import Services from './component/pages/Services';
import About from './component/pages/About';
import Login from './component/pages/Login';
import Signup from './component/pages/Signup';
import Orders from './component/pages/Orders';
import ForgetPwd from './component/pages/ForgetPwd';
import PwdReset from './component/pages/PwdReset';
import Page404 from './component/pages/Page404';
import {useSelector, useDispatch} from 'react-redux'
import {fetchUser, dispatchGet_User_Login} from '../src/redux/actions/authAction'
import axios from 'axios';

// export const url = process.env.REACT_APP_SERVER_URL

function App() {
  const dispatch = useDispatch();
  const  auth = useSelector(state => state.auth)

  useEffect(()=>{
    const myFirstLogin = localStorage.getItem('myFirstLogin')
    if(myFirstLogin && auth.isLogged){
      const getToken = async () => {
        const res = await axios.post('/api/refresh_token', null)
        dispatch({type:"GET_TOKEN", payload:res.data.rf_token})
      }
      getToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLogged])
 
  useEffect(()=>{
    const myFirstLogin = localStorage.getItem('myFirstLogin')
    if(myFirstLogin && auth.isLogged){
      console.log("myUser")
      const getUser = () => {
        fetchUser().then((result)=>{
         dispatch(dispatchGet_User_Login(result))
          })
        }
        getUser()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLogged])

  return (
    <BrowserRouter >
      <div className="App">
          <Navbar />  
            <div className="content">
              <Routes>
                  <Route exact path="/" caseSentitive={false} element={<Home/>}/>
                  <Route exact path="/login" caseSentitive={false} element={<Login/>}/>
                  <Route exact path="/about" caseSentitive={false} element={<About/>}/>
                  <Route exact path="/signup" caseSentitive={false} element={<Signup/>}/>
                  <Route exact path="/orders" caseSentitive={false} element={auth.isLogged ? <Orders/> : <Page404/>}/>
                  <Route path="/forgetpassword" caseSentitive={false} element={<ForgetPwd/>}/>}/>
                  <Route path="/api/pwdreset/" caseSentitive={false} element={<PwdReset/>}/>
                  <Route path="/page404" caseSentitive={false} element={ <Page404 />}/>
                  <Route path="*" caseSentitive={false} element={ <Page404 pageNotFound="true" />}/>
                  <Route path="/services" caseSentitive={false} element={ <Page404 pageNotAvailable="true" />}/>
                  <Route path="/error" caseSentitive={false} element={ <Page404 pageError="true" />}/>
              </Routes>
              <Footer/>
            </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
