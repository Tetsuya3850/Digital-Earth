import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Choose from "./Choose";
import Scene from "./Scene";
import Add from "./Add";
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
            id={scene.id}
            lon={scene.lon}
            lat={scene.lat}
            global={scene.global}
            loop={scene.loop}
            width={scene.width}
            height={scene.height}
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
            <Route path="/choose" component={Choose} />
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
