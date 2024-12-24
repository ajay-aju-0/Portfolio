import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    Password: "",
  });

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/admin-login", { replace: true });
        }
    }, [navigate]);

  const Login = async() => {
    try {
        dispatch(showLoading());
        const res = await axios.post("/api/portfolio/admin-login",user);
        dispatch(hideLoading());
        if(res.data.success){
            message.success(res.data.message);
            localStorage.setItem("token",JSON.stringify(res.data));
            window.location.href = "Admin";
        } else {
            message.error(res.data.message);
        }
    } catch (error) {
        message.error(error.message);
        dispatch(hideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex flex-col gap-5 p-5 shadow border border-gray-500 bg-white">
        <h1 className="text-xl text-center font-semibold">Admin Login</h1>
        <input
          type="text"
          className="w-full"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter Username"
        />
        <input
          type="password"
          className="w-full"
          value={user.Password}
          onChange={(e) => setUser({ ...user, Password: e.target.value })}
          placeholder="Enter Password"
        />
        <button className="bg-primary text-white p-2" onClick={Login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
