import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import "./css/ranking.css";


const twilightLogo = require("../images/twilight.png");


interface IAPIResponse { _id: string, artist: string, title: string }

const GarbagePage = () => {
    const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
    const [ BEdited, setEdited ] = React.useState<boolean>(false);

    React.useEffect( () => {
        if (BEdited) setEdited(false);
        const asyncFunc = async () => {
            const {data} = await axios.get<IAPIResponse[]>(SAPIBase + '/rank/getGarbage');
            setLAPIResponse(data);
        };
        asyncFunc().catch((e) => window.alert(`Error while running API Call: ${e}`));
        
    }, [BEdited])


    const deleteSong = ( artist: string, title: string ) => {
        const asyncFunc = async() => {
            await axios.post( SAPIBase + '/rank/deleteGarbage', { artist: artist, title: title });
            setEdited(true);
        }
        asyncFunc().catch(e => window.alert(`Deletion Error! $(e)`));
    }

    const recoverSong = ( artist: string, title: string ) => {
        const asyncFunc = async() => {
            await axios.post( SAPIBase + '/rank/recoverSong', { artist: artist, title: title });
            setEdited(true);
        }
        asyncFunc().catch(e => window.alert(`Recover Error! $(e)`));
    }

    return (
        <div className='container'>
        <div className='header'>
            <nav className='link-to-main'><Link className='link' to='/'>메인으로 돌아가기</Link></nav><br/>
        </div>
        <div className='App'>
            <div className='banner'>
                <img className='twilightLogo' src={twilightLogo}/>
                <h1 className="title"> 선곡 휴지통 </h1>
                <img className='twilightLogo' src={twilightLogo}/>
            </div><br/><br/>
            <table>
                <tbody>
                    <tr className='rankingList'>
                    {
                    LAPIResponse.map ( (val, i) =>
                        <tr className='cell' key={i}>
                            <div className='inner-garbage'>
                                <h2 className={'garbage-letter'}> {val.artist} - {val.title} </h2>
                                <div className={"delete-garbage"} onClick={(e) => deleteSong(`${val.artist}`, `${val.title}`)}>ⓧ</div>
                                <div className={'recover'} onClick={(e) => recoverSong(`${val.artist}`, `${val.title}`)}>←</div>
                            </div><br/>
                        </tr>
                    )}
                    </tr>
                </tbody>
      	    </table>

                
        </div>
        </div>
    );
}

export default GarbagePage;