// import { useState, useEffect } from 'react'
// import {Resources, ViewCart } from '../../resources/Resources'
// import '../../css/Services.css'
// import {states} from './../../resources/Resources'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
// import {dispatchCount, dispatchCheck} from '../../redux/actions/authAction'
// import {useSelector, useDispatch} from 'react-redux'


const Services = () => {
    // const [cart, setCart] = useState([])
    // const auth = useSelector(state => state.auth)
    // let p;
    // const dispatch = useDispatch()

    // const handleClick = (state) => {
    //     if(cart.indexOf(state) !== -1) return
    //         setCart([...cart, state])
    //         dispatch(dispatchCount())
    //         dispatch(dispatchCheck())
    // }

    // const handleChange = (state, d) => {
    //     const index = cart.indexOf(state)
    //     const arr = cart
    //     if(d === 1 && state.tally <= 9){
    //         arr[index].tally += d
    //     }else if(d=== -1 && state.tally >= 1){
    //         arr[index].tally += d
    //     }
    //     setCart([...arr]);
    // };

    // let resources = states.map((state) =>{
    //   return <Resources state={state} handleClick={handleClick}/>
    // })
    return(
        <div className="servicepage">
            {/* <div >
                <div className="container3">
                    <div className="menu1">Menu</div>
                    <p className="p">{p = !auth.viewCart ? "what's new" : "Collections" }</p>
                    <p className="lorem">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.</p>
                </div>
            </div>
            <div className="display">
               {!auth.viewCart ? resources :<ViewCart cart={cart} setCart={setCart} handleChange={handleChange}/>}
            </div> */}
            
        </div>
        
    )
}

export default Services