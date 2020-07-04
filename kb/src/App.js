import React, {Component} from 'react';
import routes from './config/routes';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './App.css';


class App extends Component {

    render() {
        return (
            <Router basename={'/kb'}>
                <Switch>
                    {routes.map((route, index) =>
                        <Route key={index}
                               path={route.path}
                               exact={route.exact}
                               render={props => <route.component {...props} {...route.props} />
                               }/>
                    )}
                </Switch>
            </Router>
        );
    }
}

export default App;
