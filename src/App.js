import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SceneOne from "./SceneOne";
import SceneTwo from "./SceneTwo";

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
