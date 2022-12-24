import React, {useState} from 'react'
import '../../css/About.css'
import introduction from '../../images/introduction.png'

const About = () => {
    const [hide, setHide] = useState(false)
    return (
        <section className="mySection1">
        <div>
            <img src={introduction} alt="introduction"/>
        </div>
        <div style={{position:"relative"}} className="main-aside">
            <label>Natural</label>
            <h3><span>100% natural fresh<br/>ingredients</span></h3>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accumsan, metus ultrices eleifend grav, nulla varius lectus.
            </p>
            <ul>
                <li>Nulla accumsan metus ultrices eleifend gravi nulla site.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit amet.</li>
                <li>Ornare vitae pulvinar hendrerit guis adipiscing</li>
            </ul>
            <span style={{cursor:"pointer"}} onMouseOver={()=>{setHide(true); console.log({hide})}} onMouseOut={()=>{setHide(false); console.log({hide})}} className="aboutUs">About Us</span>
            {hide && <span style={{color:"white", padding:"2px", backgroundColor:"grey", fontSize:'12px'}} >Just for development purpose</span>}
        </div>
    </section>
    )
}

export default About