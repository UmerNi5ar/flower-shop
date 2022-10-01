import React from 'react';

import createBrowserHistory from '../history';
import { Router, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Header from './Header';
import Loading from './Loading/Loading';
import NewDeliveryForm from './NewDeliveryForm';
import Login from './auth/Login';
import Register from './auth/Register';
import CreateAdmin from './auth/CreateAdmin';
import { getData } from '../actions/index';
import { getMe } from '../actions/index';
import MonthlyAnalysis from './MonthlyAnalysis';
import { connect } from 'react-redux';

import { AlertContainer } from '../utils/alert/index';

class App extends React.Component {
  async componentDidMount() {
    await this.props.getMe();
    await this.props.getData();
  }
  render() {
    if (this.props.reduxState.shipments.isLoading) {
      return <Loading />;
    } else {
      if (!this.props.reduxState.auth.user) {
        createBrowserHistory.push('/login');
      }
      return (
        <Router history={createBrowserHistory}>
          {!this.props.reduxState.auth.user ? (
            <React.Fragment>
              <AlertContainer />
              <Route
                path="/login"
                exact
                component={Login} // When want to pass addtional props into
              ></Route>
              <Route
                path="/register"
                exact
                component={Register} // When want to pass addtional props into
              ></Route>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Header /> <AlertContainer />
              <Route
                path="/"
                exact
                component={Home} // When want to pass addtional props into
              ></Route>
              <Route
                path="/createAdmin"
                exact
                component={CreateAdmin} // When want to pass addtional props into
              ></Route>
              <Route
                path="/newItem"
                exact
                component={NewDeliveryForm} // When want to pass addtional props into
              ></Route>
              <Route
                path="/view"
                exact
                component={NewDeliveryForm} // When want to pass addtional props into
              ></Route>
              <Route
                path="/monthlyAnalysis"
                exact
                component={MonthlyAnalysis} // When want to pass addtional props into
              ></Route>
            </React.Fragment>
          )}
        </Router>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return { reduxState: state };
};
export default connect(mapStateToProps, { getData, getMe })(App);
// "proxy": "http://localhost:8000",
