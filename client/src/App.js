import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Scene from "./Scene";
import client from "./client";

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
            lon={scene.lon}
            lat={scene.lat}
            global={scene.global}
            title={scene.title}
            text={scene.text}
          />}
      />
    );

    return (
      <Router>
        <div>
          <Switch>
            {SceneRoutes}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
