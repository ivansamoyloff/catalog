import React from 'react';
import {  BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import {  LoginPage  } from '../pages';
import Header from "../Header";
import ItemList from "../ItemList";
import ItemEdit from "../ItemEdit";

const App = () => {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route
                            path='/'
                            component={ItemList}
                            exact
                        />
                        <Route
                            path='/add_new'
                            component={ItemEdit}
                            exact
                        />
                        <Route
                            path='/edit/:id'
                            component={ItemEdit}
                            exact
                        />
                        <Route
                            path='/login'
                            component={LoginPage}
                            exact
                        />
                        <Route render={() => <h2>Page not found</h2>} />
                    </Switch>
                </div>
            </Router>
        );
};


export default App;