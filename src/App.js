import './Fallout.css';
import './App.css';
import HackScreen from './components/HackScreen';
import { useState } from 'react';
import MainMenu from './components/MainMenu';



function App() {

  const [screen, setScreen] = useState("hackScreen");
  const screens = ["hackScreen","mainMenu"];

  function changeScreen(newScreen) {
    if (!screens.includes(newScreen)) {
      console.log("ERR: invalid screen");
      return;
    }
    setScreen(newScreen);
  }

  console.log("app.js/current screen: " + screen);
  return (
    <div className="App">
      <div className="overlay"></div>
      <div className="scanline"></div>
      { 
      screen == "hackScreen" ? <HackScreen screenSwitch={changeScreen} /> :
      screen == "mainMenu" ? <MainMenu /> : null 
      }
    </div>
  );
}



export default App;
