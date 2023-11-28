import React, { useEffect, useRef, useState } from "react"
import { Snackbar } from "./Snackbar";
import { Button, ListGroup } from "react-bootstrap";
import Axios from "../Misc/Axios";
import { getToken } from "../Misc/Tokens";
import { useNavigate } from "react-router-dom";

export const ListSurveys = () => {

    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        Axios.get('/list', {params: { user: getToken().user}})
            .then(res => {
                setSurveys(res.data.surveys)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const snackbarRef = useRef();
    const  navigate = useNavigate();

    const _showSnackbarHandler = (message) => {
        snackbarRef.current.openSnackBar(message)   
    }
    
    const deleteThis = (v, i) => {
        Axios.delete(`/delete/${getToken().user}/${v}`)
        .then(res => {
            _showSnackbarHandler("Deleted"); 
            surveys.splice(i, 1); 
            setSurveys(...surveys)
        })
        .catch(e => {
            console.log(e); 
            _showSnackbarHandler(e.toString());
        })
    }
    
    const genReport = v => {
        navigate("/report", {state: {survey: v}})
    }

    const genLink = v => {
        console.log(v)
        const consss = `localhost:3000/view?survey=${v}&user=${localStorage.getItem('email')}`
        window.open(consss)
    }
    
    return (        
        <div className="d-flex justify-content-center">
            <Snackbar ref={snackbarRef} />
            <div className="d-flex flex-column align-items-stretch ml-3">
                <ListGroup style={{ maxWidth: '400px' }}>
                {surveys.map((item, index) => (
                    <ListGroup.Item key={index} style={{height: "50px"}}>{item}</ListGroup.Item>
                ))}
                </ListGroup>
            </div>
            <div className="ml-3">
                {surveys.map((v, i) => (
                    <>
                        <Button  style={{height: "50px"}} variant="danger" onClick={_ => deleteThis(v, i)} >Delete</Button>
                        <br ></br>
                    </>
                ))
                }
            </div>
            <div className="ml-3">
                {surveys.map((v, i) => (
                    <>
                        <Button style={{height: "50px"}} onClick={_ => genReport(v)} >Genterate Report</Button>
                        <br ></br>
                    </>
                ))
                }
            </div>
            <div className="ml-3">
                {surveys.map((v, i) => (
                    <>
                        <Button style={{height: "50px"}} onClick={_ => genLink(v)} >View</Button>
                        <br ></br>
                    </>
                ))
                }
            </div>
        </div>
    );

}