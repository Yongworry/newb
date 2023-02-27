import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { SAPIBase } from "../tools/api";
import "./css/ranking.css";


const twilightLogo = require("../images/twilight.png");


interface IAPIResponse { _id: string, code: string, name: string, }

const LoginPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
    const [ SPassword, setPassword ] = React.useState<string>("");

    


    const login = ( ) => {
        const asyncFunc = async() => {
            await axios.post<IAPIResponse[]>(SAPIBase + '/login/login', {code:SPassword})
            .then((res) => {
                setCookie('id', res);
        });
        console.log(cookies.id);
        }
        asyncFunc().catch(e => window.alert(`Login Error! $(e)`));
    }

    const logout = () => {
        removeCookie("id");
    }

    return (
        <div className='container'>
        <div className='header'>
            <nav className='link-to-main'><Link className='link' to='/'>메인으로 돌아가기</Link></nav><br/>
        </div>
        <div className='App'>
            <div className='banner'>
                <img className='twilightLogo' src={twilightLogo}/>
                <h1 className="title"> 로그인 </h1>
                <img className='twilightLogo' src={twilightLogo}/>
            </div><br/><br/>
            
            <div className={"addForm"}>
                <br/>password <input type={"text"} value={SPassword} onChange={(e) => setPassword(e.target.value)} required/>
                <button onClick={() => {login()}}>로그인</button>
            </div>

            <div className={"logout"}>
                <button onClick={() => {logout()}}>로그아웃</button>
            </div>

                
        </div>
        </div>
    );
}

export default LoginPage;