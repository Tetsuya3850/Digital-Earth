import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Scene from "./Scene";
import Add from "./Add";
import client from "./client";
const vapor = require("./Visuals/vapor.mp4");
const sst = require("./Visuals/sst.mp4");
const gw = require("./Visuals/gw.mp4");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenario: []
    };
  }

  componentDidMount() {
    this.loadScenarioFromServer();
  }

  loadScenarioFromServer = () => {
    client.getScenario(serverScenario =>
      this.setState({ scenario: serverScenario })
    );
  };

  render() {
    const SceneRoutes = this.state.scenario.map(scene =>
      <Route
        path={"/" + scene.id}
        key={scene.id}
        component={(props, state, params) =>
          <Scene
            key={scene.id}
            id={scene.id}
            lon={scene.lon}
            lat={scene.lat}
            global={eval(scene.global)}
            loop={scene.loop}
            title={scene.title}
            text={scene.text}
            length={this.state.scenario.length}
          />}
      />
    );

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            {SceneRoutes}
            <Route
              path="/add"
              render={() => <Add num={this.state.scenario.length} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
