import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Home from "./Home";
//import Characters from "./Characters";

const Main = (props) => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </HashRouter>
)

export default Main