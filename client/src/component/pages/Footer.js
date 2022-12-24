import {useState} from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [name, setName] = useState('');

    const handleMouseOver = (e) => {
        const {name} = e.target;
        setName(name)
    }

    const handleMouseOut = () => {
        setName("")
        console.clear()
    }
    return( <footer className="footer">
                <div className="bg-black footer2 ">
                    <div className="text-white container">
                        <div className="fs-6 text-white row row-cols-1 row-cols-sm-3 row-cols-md-5 ">
                            <div className="fs-6 text-white  col-md-3">
                                <h1 className="fs-6">Burger</h1>
                                <h2 className="fs-6">Contact Us</h2>
                                <h3 className="link">burger@gmail.com</h3>
                                <div style={{position:"relative"}} className="fs-6 text-white mb-2 image">
                                    {name && <span style={{position:"absolute", left:"90px", top:"-9px", fontSize:"10px", fontWeight:'700'}} >{name}</span>}
                                    <Link to="/#" value="http://facebook/burger/account.com.uk" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="link text-white fb" name="facebook/burger/account.com.uk"/>
                                    <Link to="#" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="link text-white in" name="instagram/burger/account.com.uk" value="http://instagram/burger/account.com.uk"/>
                                    <Link to="#" onMouseOver={ handleMouseOver} onMouseOut={handleMouseOut} className="link text-white tw" name="twitter/burger/account.com.uk" value="http://twitter/burger/account.com.uk"/>
                                </div>
                            </div>
                            <div className="fs-6 text-white col-md-2">
                                <h1 className="fs6">link</h1>
                                <Link to="#" className="link">Link 1</Link>
                                <Link to="#" className="link">Link 2</Link>
                            </div>
                            <div className="fs-6 text-white col-md-2"><h1 className="fs6">Navigation</h1>
                                <Link to="#" className="link">Link 1</Link>
                                <Link to="#" className="link">Link 2</Link>
                            </div>
                            <div className="fs-6 text-white col-md-2">
                            <h1 className="fs6">About Us</h1>
                                <Link to="#" className="link">Link 1</Link>
                                <Link to="#" className="link">Link 2</Link>
                            </div>
                            <div className="fs-6 text-white col-md-3">
                                <h1 className="fs6">Newsletter</h1>
                                <h2 className="link">Join our newsletter for news and updades</h2>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control bg-black text-white f-6" placeholder="burger@gmail.com" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                    <button className="btn btn-outline-secondary bg-white text-black f-6 mw-25" type="button" id="button-addon2">Subcribe</button>
                                </div>
                            </div>
                        </div>
                        <div>
                        <p className="myFooterEnd pb-2">2020 Burger. All right Reserved</p>
                        </div>
                    </div>
                </div>
            </footer> 
    )
}

export default Footer
