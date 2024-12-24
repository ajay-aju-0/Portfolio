import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, setPortfolioData, setReloadData, showLoading } from "./redux/rootSlice";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Admin/Login";


function App() {
    // const [showLoading, setShowLoading] = useState(false);
    const { loading, portfolioData, reloadData } = useSelector((state) => state.root)
    const dispatch = useDispatch();

    const getPortfolioData = async () => {
        try {
            dispatch(showLoading());
            const res  = await axios.get("/api/portfolio/get-portfolio-data");
            // console.log(res)
            dispatch(setPortfolioData(res.data));
            dispatch(setReloadData(false))
            dispatch(hideLoading());
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
        }
    }

    useEffect(() => {
        if(!portfolioData){
            getPortfolioData();
        }
    }, [portfolioData]);
    
    useEffect(() => {
        if(reloadData){
            getPortfolioData();
        }
    }, [reloadData])
    


  return (
    <BrowserRouter>
        {loading ? <Loader /> : null}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
