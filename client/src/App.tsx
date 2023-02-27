import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RankingPage from "./pages/ranking";
import GarbagePage from "./pages/garbage";
import LoginPage from './pages/login';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <RankingPage/> }/>
          <Route path="/garbage" element={ <GarbagePage/> }/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
