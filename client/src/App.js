import './App.css';
import Homepage from './components/pages/homepage/Homepage'
import About from './components/pages/about/About'

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Users from './components/pages/users/Users';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </nav>
      
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
