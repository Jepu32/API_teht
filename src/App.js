import React from 'react';
import './App.css';
import Home from './components/Home.js'
import BikeData from './components/BikeData.js'
import Map from './components/OpenMap.js'
import Weather from './components/Weather.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

function App() {


  return (
    <div className="App">
      <Router>
        <Navbar style={{position: "sticky"}} expand="lg" fixed="top" variant="dark" bg="dark">

          <Nav.Link href="#/">Home</Nav.Link>
          <Nav.Link href="#/bikes">Bikes</Nav.Link>
          <Nav.Link href="#/map">Map</Nav.Link>
          <Nav.Link href="#/weather">Weather</Nav.Link>
        
        </Navbar>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/bikes" component={BikeData} />
              <Route path="/map" component={Map} />
              <Route path="/weather" component={Weather} />
            </Switch>
         </div>  
      </Router>
    </div>
  );
}

export default App;
