import React from 'react';

import createBrowserHistory from '../history';
import { Router, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Header from './Header';
import Loading from './Loading/Loading';
import NewDeliveryForm from './NewDeliveryForm';
import { getData } from '../actions/index';

import MonthlyAnalysis from './MonthlyAnalysis';
import { connect } from 'react-redux';

import { AlertContainer } from '../utils/alert/index';

class App extends React.Component {
  async componentDidMount() {
    await this.props.getData();
  }
  render() {
    if (this.props.reduxState.isLoading) {
      return <Loading />;
    } else {
      return (
        <div>
          <Router history={createBrowserHistory}>
            <Header />
            <AlertContainer />
            <Route
              path="/"
              exact
              component={Home} // When want to pass addtional props into
            ></Route>

            <Route
              path="/newItem"
              exact
              component={NewDeliveryForm} // When want to pass addtional props into
            ></Route>
            <Route
              path="/monthlyAnalysis"
              exact
              component={MonthlyAnalysis} // When want to pass addtional props into
            ></Route>

            <Route
              path="/Notfound"
              exact
              component={NotFound} // When want to pass addtional props into
            ></Route>
          </Router>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return { reduxState: state.shipments };
};
export default connect(mapStateToProps, { getData })(App);
// "proxy": "http://localhost:8000",
