import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/auth.css";
import axios from "axios";
import Spinner from "../components/Spinner";
function Login() {
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", values);
      localStorage.setItem("expenses-user", JSON.stringify({...response.data,password:''}));
      setLoading(false);
      message.success("Login successfull");
      navigate("/");
    } catch (err) {
      setLoading(false);
      message.error("OOPS Login Failed");
    }
  };
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
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Login to U Expense Tracker</h1>
            <hr />
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type='password' />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">Dont Have an Account, Register here</Link>
              <button className="primary" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
