import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
import Loadable from 'react-loadable';
import Loading from './components/Loading';
import Topbar from './components/Topbar';
import 'assets/style.scss'
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading
});
const Dict = Loadable({
  loader: () => import('./pages/Dict'),
  loading: Loading
});
const App = () => (
  <React.Fragment>
    <Topbar />
    <Switch>
      <Route exact path="/" render={ () => <Redirect to='/dict'/>}/>
      {/* <Route path="/home" component={Home} /> */}
      <Route path="/dict" component={Dict} />
    </Switch>
  </React.Fragment>
);
export default App;

