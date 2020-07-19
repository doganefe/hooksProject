import React from 'react';
import YazıListesi from './components/YaziListesi'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Yazi from './components/Yazi';
import YaziEkle from './components/YaziEkle';
import YaziDuzenle from './components/YaziDuzenle';

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        <div className="ui raised very padded text container segment">
          <Route path="/" exact component={YazıListesi} />
          <Route path="/posts" exact component={YazıListesi} />
          <Route path="/posts/:id" exact component={Yazi} />
          <Route path="/yaziekle" component={YaziEkle} />
          <Route path="/posts/:id/edit" component={YaziDuzenle} />
        </div>
      </div>
    </Router>
  )
}

export default App;


