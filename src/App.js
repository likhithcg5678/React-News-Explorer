
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
  const pgSize=5;
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress,setProgress]=useState(0)
  
 
  
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={4}
            color='#f11946'
            progress={progress}
            
          />
          <Routes>
            
            <Route exact path="/" element={<News changeProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pgSize} country="in" category="general" />}></Route>
            <Route exact path="/home" element={<News changeProgress={setProgress} apiKey={apiKey}  key="gen" pageSize={pgSize} country="in" category="general" />}></Route>
            <Route exact path="/about" element={<News changeProgress={setProgress} apiKey={apiKey}  key="gene" pageSize={pgSize} country="in" category="general" />}></Route>
            <Route exact path="/business" element={<News changeProgress={setProgress} apiKey={apiKey}  key="business" pageSize={pgSize} country="in" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News changeProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pgSize} country="in" category="entertainment" />}></Route>
            <Route exact path="/general" element={<News changeProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pgSize} country="in" category="general" />}></Route>
            <Route exact path="/health" element={<News changeProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pgSize} country="in" category="health" />}></Route>
            <Route exact path="/science" element={<News changeProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pgSize} country="in" category="science" />}></Route>
            <Route exact path="/sports" element={<News changeProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pgSize} country="in" category="sports" />}></Route>
            <Route exact path="/technology" element={<News changeProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pgSize} country="in" category="technology" />}></Route>


          </Routes>

        </Router>
        
        
      </div>
    )
  
}
export default App

