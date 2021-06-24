import React from "react";
import Login from "../Home/Home";
import HirerRegister from "../Register/HirerRegister";
import HirerLogin from "../Login/HirerLogin";
import WorkerRegister from "../Register/WorkerRegister";
import WorkerLogin from "../Login/WorkerLogin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utills/setAuthToken";
import {
  setCurrentWorker,
  setCurrentHirer,
  logoutWorker,
  logoutHirer,
} from "../actions/authActions";
import PrivateRoute from "../private-route/PrivateRoute";
import WorkerDashboard from "../Dashboards/WorkerDashboard";
import HirerDashboard from "../Dashboards/HirerDashboard";
import ForgotPasswordWorker from "../ForgotPassword/ForgotPasswordWorker";
import ForgotPasswordHirer from "../ForgotPassword/ForgotPasswordHirer";
import NewPasswordWorker from "../NewPassword/NewPasswordWorker";
import NewPasswordHirer from "../NewPassword/NewPasswordHirer";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decodedW = jwt_decode(token);
  // console.log(decodedW);
  const decodedH = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentWorker(decodedW));

  store.dispatch(setCurrentHirer(decodedH));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decodedW.exp < currentTime) {
    // Logout user
    store.dispatch(logoutWorker());
    // Redirect to login
    window.location.href = "/";
  }

  if (decodedH.exp < currentTime) {
    // Logout user
    store.dispatch(logoutHirer());
    // Redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path="/" exact component={Login} />
          <Route path="/worker-register" exact component={WorkerRegister} />
          <Route path="/hirer-register" exact component={HirerRegister} />
          <Route path="/worker-login" exact component={WorkerLogin} />
          <Route path="/reset/:token" exact component={NewPasswordWorker} />
          <Route path="/reset2/:token" exact component={NewPasswordHirer} />
          <Route
            path="/worker-forgot-password"
            exact
            component={ForgotPasswordWorker}
          />
          <Route path="/hirer-login" exact component={HirerLogin} />
          <Route
            path="/hirer-forgot-password"
            exact
            component={ForgotPasswordHirer}
          />
          <Switch>
            <PrivateRoute
              exact
              path="/worker-dashboard"
              component={WorkerDashboard}
            />
            <PrivateRoute
              exact
              path="/hirer-dashboard"
              component={HirerDashboard}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
