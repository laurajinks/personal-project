import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import store from "./ducks/store";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Switch>{routes}</Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
