import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import PersistentDrawerLeft from './Components/Drawer/drawer';
import Login from './Components/Login/login';


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path = '/' component={PersistentDrawerLeft} />
        <Route exact path = '/Login' component={Login} />
      </Router>
     
    </div>
  );
}

export default App;
