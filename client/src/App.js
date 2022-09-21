import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CountryDetail from './components/CountryDetail/CountryDetail';
import ActivityForm from './components/ActivityForm/ActivityForm';
import Modal from './components/Modal/Modal';


function App() {
  const [stateModal1, setStateModal1] = useState(false)
  const [stateModal2, setStateModal2] = useState(false)
  return (
    <BrowserRouter>
      <div class='div'>
        <Route exact path='/' component={LandingPage} />        
        <Route path='/home'>
          <Home
          state1 = {stateModal1}
          state2 = {stateModal2}
          setState1 = {setStateModal1}
          setState2 = {setStateModal2}
          />
        </Route>
        <Modal
        state= {stateModal1}
        setState = {setStateModal1}
        >  
          <CountryDetail/>
        </Modal>
        <Modal
        state= {stateModal2}
        setState = {setStateModal2}
        title = 'Crea una actividad'
        showHeader= {true}
        >
          <ActivityForm
          state= {stateModal2}
          setState = {setStateModal2}
          />
        </Modal>  
      </div>
    </BrowserRouter>
  );
}

export default App;
