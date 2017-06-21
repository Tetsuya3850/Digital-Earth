import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SceneOne from "./SceneOne";
import SceneTwo from "./SceneTwo";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={SceneOne} />
            <Route path="/2" component={SceneTwo} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
