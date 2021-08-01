import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Payment from './pages/payment';
import Course from './pages/course';


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/payment/:id">
            <Payment />
          </Route>
          <Route path="/course/:id">
            <Course />
          </Route>
          <Route path="/">
            <div className="App">
              Page Not Found
              <div><Link to="/">Go Back To Login Page</Link></div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
