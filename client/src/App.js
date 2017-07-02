import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Choose from "./Choose";
import Scene from "./Scene";
import Add from "./Add";
import client from "./client";

let sceneRoutes = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenarios: {}
    };
  }

  componentDidMount() {
    this.loadScenariosFromServer();
  }

  loadScenariosFromServer = () => {
    client.getScenarios(serverScenarios =>
      this.setState({ scenarios: serverScenarios })
    );
  };

  render() {
    Object.keys(this.state.scenarios).forEach(key => {
      this.state.scenarios[key].map(scene =>
        sceneRoutes.push(
          <Route
            path={"/" + key + scene.id}
            key={key + scene.id}
            component={(props, state, params) =>
              <Scene
                key={key + scene.id}
                id={scene.id}
                scenario={key}
                lon={scene.lon}
                lat={scene.lat}
                global={scene.global}
                loop={scene.loop}
                width={scene.width}
                height={scene.height}
                title={scene.title}
                text={scene.text}
                length={this.state.scenarios[key].length}
              />}
          />
        )
      );
    });

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/choose" component={Choose} />
            {sceneRoutes}
            <Route
              path="/add"
              render={() => <Add num={this.state.scenarios.length} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
