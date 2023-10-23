import './App.css';
import './assets/styles/animations.scss';
import { Outlet } from 'react-router-dom';
import Fallout from './components/effects/Fallout';



function App() {

  return (
    <div className="App">
      <Fallout />
      <Outlet />
    </div>
  );
}



export default App;
