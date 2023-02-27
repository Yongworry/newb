import React from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import { SAPIBase } from "../tools/api";
import "./css/ranking.css";


const twilightLogo = require("../images/twilight.png");


interface IAPIResponse { _id: string, artist: string, title: string }

const RankingPage = () => {
    const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
    const [ LAPIGarbage, setLAPIGarbage ] = React.useState<IAPIResponse[]>([]);
    const [ SNewSongArtist, setSNewSongArtist ] = React.useState<string>("");
    const [ SNewSongTitle, setSNewSongTitle ] = React.useState<string>("");
    const [ BEdited, setEdited ] = React.useState<boolean>(false);
    const [ BModalState, setModalState ] = React.useState<boolean>(false);
    
    const [ NPageCount, setNPageCount ] = React.useState<number>(1);
    const [ SSearchTitle, setSSearchTitle ] = React.useState<string>("");
    const [ SSearchMode, setSSearchMode ] = React.useState<string>("title");
    const [ title, setTitle ] = React.useState<boolean>(true);

    Modal.setAppElement('#root');

    React.useEffect( () => {
        if (BEdited) setEdited(false);
        const asyncFunc = async () => {
            const {data} = await axios.get<IAPIResponse[]>(SAPIBase + '/rank/getSong');
            setLAPIResponse(data);
        };
        asyncFunc().catch((e) => window.alert(`Error while running API Call: ${e}`));
        
    }, [BEdited])

    const createNewSong = () => {
        const asyncFunc = async() => {
            
            await axios.post( SAPIBase + '/rank/addSong', { artist: SNewSongArtist, title: SNewSongTitle });
            setSNewSongArtist("");
            setSNewSongTitle("");
            setEdited(true);
        }
        asyncFunc().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
    }

    const deleteSong = ( artist: string, title: string ) => {
        const asyncFunc = async() => {
            await axios.post( SAPIBase + '/rank/gotoGarbage', { artist: artist, title: title });
            setEdited(true);
        }
        asyncFunc().catch(e => window.alert(`Deletion Error! $(e)`));
    }

    const searchSong = () => {
        const asyncFunc = async() => {
            const songData  = await axios.get<IAPIResponse[]>(SAPIBase + '/rank/searchSong', {params: { search: SSearchTitle, mode:SSearchMode }});
            const garbageData = await axios.get<IAPIResponse[]>(SAPIBase + '/rank/searchGarbage', {params: { search: SSearchTitle, mode:SSearchMode }});
            setLAPIResponse(songData.data);
            console.log(garbageData.data);
            setLAPIGarbage([]);
            if (SSearchTitle !== ""){
                setLAPIGarbage(garbageData.data);
            }
            
        }   
        asyncFunc().catch(e => window.alert(`Search Error! $(e)`));
    }


    const deleteGarbage = ( artist: string, title: string ) => {
        const asyncFunc = async() => {
            await axios.post( SAPIBase + '/rank/deleteGarbage', { artist: artist, title: title });
            setEdited(true);
        }
        asyncFunc().catch(e => window.alert(`Deletion Error! $(e)`));
    }


    const onClickModal = React.useCallback(() => {
        setModalState(!BModalState);
      }, [BModalState]);
    
    return (
        <div className='container'>
            <div className='header'>
                <nav className='link-button'><Link className='link' to='/garbage'>휴지통</Link></nav><br/>
                <nav className='login-button'><Link className='link' to='/login'>로그인</Link></nav>
            </div>
        <div className='App'>
            <div className='banner'>
                <img className='twilightLogo' src={twilightLogo}/>
                <h1 className="title"> 동틀무렵 선곡리스트 </h1>
                <img className='twilightLogo' src={twilightLogo}/>
            </div><br/><br/>
            <div className={"search-input"}>
                <button className="searchmode" onClick={(e) => {setTitle(false);setSSearchMode("artist");}} style={{color:title?"gray":"black", fontWeight: title? "normal":"bold"}}> artist </button>&nbsp;
                <button className="searchmode" onClick={(e) => {setTitle(true);setSSearchMode("title");}} style={{color:title?"black":"black", fontWeight: title? "bold":"normal"}}> title </button>&nbsp;
                <input type={"text"} value={SSearchTitle} onChange={(e) => setSSearchTitle(e.target.value)} required/>
                <div className={"search-button"} onClick={(e) => searchSong()}>🔍</div><br/><br/><br/>
            </div>
            <table>
                <tbody>
                    <tr className={'rankingList'}>
                    {
                    LAPIResponse.map ( (val, i) =>
                        <tr className={'cell'} key={i}>
                            <div className={'inner'}>
                                <h2 className={'song-letter'}> {val.artist} - {val.title} </h2>
                                <div className={"delete-song"} onClick={(e) => deleteSong(`${val.artist}`, `${val.title}`)}>ⓧ</div>
                            </div>
                            <br/>
                        </tr>
                    )}
                    {
                    LAPIGarbage.map ( (val, i) =>
                        <tr className={'cell'} key={i}>
                            <div className={'inner-garbage'}>
                                <h2 className='garbage-letter'> {val.artist} - {val.title} </h2>
                                <div className={"delete-garbage"} onClick={(e) => deleteGarbage(`${val.artist}`, `${val.title}`)}>ⓧ</div>
                            </div>
                            <br/>
                        </tr>
                    )}
                    </tr>
                </tbody>
      	    </table><br/>

            <div className={"feed-item-add"}>
                <button className={"adding-button"} onClick={() => onClickModal()}> 곡 추가하기 </button>
                <div className={"addSong"}>
                    <Modal className={"addSongModal"} isOpen={BModalState}>
                        <div className={"addForm"}>
                            <br/>아티스트 <input type={"text"} value={SNewSongArtist} onChange={(e) => setSNewSongArtist(e.target.value)} required/>
                            <br/>제목 <input type={"text"} value={SNewSongTitle} onChange={(e) => setSNewSongTitle(e.target.value)} required/><br/>
                            <button className={"post-add-button"} onClick={(e) => {createNewSong();onClickModal()}}>추가하기</button>
                            <button onClick={() => onClickModal()}> 취소 </button>
                        </div>
                    </Modal>
                </div>
                
                
            </div>
        </div>
        </div>
    );
}

export default RankingPage;