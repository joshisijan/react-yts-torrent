import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//COMPONENTS
import Header from "./components/header/Header";
import Home from "./components/home/Home";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' render={() => <Home />} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
