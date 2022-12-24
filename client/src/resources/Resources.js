import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {dispatchDecrease, dispatchUnCheck} from '../redux/actions/authAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


export const states = [
    { id:1, name:"Cheese Burger", price:3.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"tw.png", tally:0},
    { id:2, name:"Beef Burger", price:3.99, note:"Lorem ipsum dolor sit amet, consectetur <br/>adipiscing elit fuidhir pinnately.", img:"5.png", tally:0},
    { id:3, name:"Chicken Burger", price:4.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"6.png", tally:0},
    { id:4, name:"mini cheese Burger", price:1.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"1(1).png", tally:0},
    { id:5, name:"Cheese Burger", price:2.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"tw.png", tally:0},
    { id:6, name:"Cheese Burger", price:3.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"7.png", tally:0},
    { id:7, name:"Cheese Burger", price:5.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"2(2).png", tally:0},
    { id:8, name:"Cheese Burger", price:3.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"9.png", tally:0},
    { id:9, name:"Big cheese Burger", price:10.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"3.png", tally:0},
    { id:10, name:"Cheese Burger", price:0.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"3(1).png", tally:0},
    { id:11, name:"Cheese Burger", price:3.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"3(2).png", tally:0},
    { id:12, name:"Cheese Burger", price:7.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"12.jpg", tally:0},
    { id:13, name:"Cheese Burger", price:3.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"9.png", tally:0},
    { id:14, name:"Big cheese Burger", price:10.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"3.png", tally:0},
    { id:15, name:"Cheese Burger", price:0.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"3(1).png", tally:0},
    { id:16, name:"Cheese Burger", price:3.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"3(2).png", tally:0},
    { id:17, name:"Cheese Burger", price:7.99, note:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus.", img:"12.jpg", tally:0},
]


export const Resources = ({state, handleClick}) => {
    
    return(
        <div className="template">
            <img src={`./images/${state.img}`} alt=""/>
            <div className="template2">
                <h1>{state.name}</h1>
                <span className="dollar"> $<span className="price">{state.price} <button onClick={()=>{handleClick(state)}} className="buy">Add to Cart</button></span></span>
                <p>{state.note}</p>
            </div>
        </div>
    )
}


export const ViewCart = ({cart, handleChange, setCart}) => {
    const dispatch = useDispatch()
    const [price, setPrice] = useState(0);
    const [hide, setHide] = useState(false)
    const navigate = useNavigate();

    const handleRemove = (id) => {
        const arr = cart.filter((state) => state.id !== id)
        setCart(arr);
        dispatch(dispatchDecrease())
        cart.length - 1 === 0 && dispatch(dispatchUnCheck())
    }

    const handlePrice = () => {
        let ans = 0;
        cart.map((state) => (ans += state.tally * state.price))
        setPrice(ans)
    }
    useEffect(()=>{
        handlePrice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleChange])

    return (
        <React.Fragment>
        {(cart.length > 0) ? (
            <article>
            {cart.map((state) => {
                return(
                    <div key={state.id} className="cart_box">
                        <div className="cart_img">
                            <img src={`./images/${state.img}`} alt="myphoto"/>
                            <p>{state.name}</p>
                        </div>
                        <div>
                            <button onClick={()=>handleChange(state, -1)}>-</button>                            
                            <button>{state.tally}</button>
                            <button onClick={()=>handleChange(state, 1)}>+</button>
                        </div>
                        <div>
                            <span>{state.price}</span>
                            <button onClick={()=>handleRemove(state.id)}>Remove</button>
                        </div>
                    </div>
            )})}
            <div className="total">
                <span>Total Price =</span>
                <span> $ {price}</span>                
            </div>
            <div onMouseOver={()=>setHide(true)} onMouseOut={()=>setHide(false)} style={{marginBottom:"16px"}}><span className="buy">Pay</span>{hide && <span style={{fontSize:"13px", backgroundColor:"gray", color:"white"}}>This is not enabled!</span>}</div>
            
        </article>
        ) : (<article>
                <div className="cart_box">
                    <div className="sbg2" >
                        <div className="signupContainer2">
                            <h1 onClick={()=> navigate(-1)} style={{color:"green", cursor:"pointer", textAlign:"center"}}>YOU'VE NOT ADD ANY ITEM TO THE CART<br/><br/><br/><b style={{color:"black", textAlign:"center", fontSize:"16px"}}><FontAwesomeIcon style={{color:"black", textAlign:"center", fontSize:"16px"}} icon={faArrowLeftLong}/>    Go back</b></h1>
                        </div>
                    </div>
                </div>
             </article>
        )
        }
        </React.Fragment>
    )
}