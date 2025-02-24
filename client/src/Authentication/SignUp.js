import {
    MDBContainer,
    MDBInput
  } from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";  
import Loading from "../Assets/Pulse-1s-200px.gif";
import { useRef } from 'react';
import "../Styles/login.css"


function SignUp({onSignUp, isLoading, onPress}) {

    const emailRef = useRef();
    const passRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        onSignUp({ 
            email: emailRef.current.value,
            pass: passRef.current.value
        });
    }

    return (
        
        <MDBContainer className="my-5 gradient-form" >

            <div className="d-flex flex-column ms-5">

                <div className="text-center">
                    {/* <img src={Image}
                    style={{width: '185px'}} alt="logo" /> */}
                    <h4 className="mt-1 mb-5 pb-1">Survey Software</h4>
                </div>

                <form className="shadow-lg rounded p-3 mb-5" onSubmit={onSubmit}>
                    <div className="d-flex justify-content-center">
                    <p>Register for your account</p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <MDBInput wrapperClass='mb-4 w-75' label='Email address' name="email" ref={emailRef} required ype='email'/>
                  </div>
                  <div className="d-flex justify-content-center">
                    <MDBInput wrapperClass='mb-4 w-75' label='Password' name="passwd" ref={passRef} required type='password'/>
                  </div>
                  <div className="text-center pt-1 mb-3 pb-1">
                  {/* <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Sign in</MDBBtn> */}
                    <Button className="mb-4 w-35 gradient-custom-2" type='submit'>{isLoading ? <img className = "loading" src={Loading} alt='Loading' ></img> : "Sign Up" }</Button>
                    <br/>
                  </div>
              </form>
    
              
    
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <pre className="mb-0">Have an account?  </pre>
                <Button className='mb-4 w-25 gradient-custom-2' color='danger' onClick={onPress}>
                  Sign In
                </Button>
              </div>
    
            </div>
    
      </MDBContainer>
      )
}

export default SignUp;