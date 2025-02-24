import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const icons=[
    {name:"Home",path:"/"},
    {name:"Edit",path:"/edit"},
    {name:"View",path:"/view"},
    {name:"List",path:"/list"},
    {name:"Report",path:"/report"},
    {name:"Logout",path:"/login"},
]

function NavbarTemplate(props){
    const [hover,SetHover]=useState(false);

    const tempStyle={
        display:"inline-block",
        color:"black",
        border:"1px solid black",
        width:"16vw",
        textAlign:"center",
        height:"40px",
        padding:"5px",
        // fontSize:"px"
    };
    
    const handleHover=()=>{
        SetHover(true)
    };

    const handleLeave=()=>{
        SetHover(false)
    };

    return(
        <Link to={props.path}>
            <div style={{...tempStyle,backgroundColor:hover?"aqua":""}} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                {props.name}
            </div>
        </Link>
    );
}

export function Navbar(){
    return (
        <div >
            {
                icons.map((icon)=>{
                    return <NavbarTemplate path={icon.path} name={icon.name} ></NavbarTemplate>
                })
            }
        </div>
    )
};
