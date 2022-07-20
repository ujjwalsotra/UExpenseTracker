import React, { useEffect, useState } from "react";
import { Form, message, Spin } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import '../resources/auth.css'
import  axios from 'axios'
import Spinner from "../components/Spinner";
function Register() {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
    const onFinish=async (values)=>{
        try{
          setLoading(true);
           await axios.post("/api/user/register", values)
           setLoading(false);
            message.success('Registrations successfull!!');
        }catch(err){
            message.error('something went wrong!!');
        }
    }
    useEffect(()=>{
      if(localStorage.getItem('expenses-user'))
      {
        navigate('/')
      }
    },[])
  return (
    <div className="register">
      {loading &&<Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
        <h1>Register to U Expense Tracker</h1>
        <hr/>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type='password'/>
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered Click to Login</Link>
              <button className="primary" type="submit">Register</button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
         <div className="lottie">
         <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_stqswzcc.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
         </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
