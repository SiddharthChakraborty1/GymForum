import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import PersistentDrawerLeft from './Components/Drawer/drawer';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import UserDashboard from './Components/UserDashboard/userDashboard';
import Post from './Components/Post/post';


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path = '/' component={PersistentDrawerLeft} />
        <Route exact path = '/Login' component={Login} />
        <Route exact path = '/Register' component = {Register} />
        <Route exact path = '/UserDashboard' component = {UserDashboard} />
        <Route exact path = '/Post' component = {Post} />
      </Router>
     
    </div>
  );
}

export default App;
