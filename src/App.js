import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AdsPage, AdPage, NewAdPage } from "./components/ads";
import { useEffect, useRef, useState } from "react";
import { LoginPage, PrivateRoute } from "./components/auth";
import { AuthContextProvider } from "./components/auth/context";
import { logout } from "./components/auth/service";
import T from "prop-types";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };
  const handleLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogout, handleLogin }}>
        <div className="App">
          <Switch>
            <Route path="/login">
              {(routeProps) => <LoginPage {...routeProps} />}
            </Route>
            <PrivateRoute path="/ads/:adId">
              {(routeProps) => <AdPage {...routeProps} />}
            </PrivateRoute>
            <PrivateRoute path="/ads" component={AdsPage} />
            <PrivateRoute exact path="/">
              <Redirect to="/ads" />
            </PrivateRoute>
            <PrivateRoute path="/ad/new">
              <NewAdPage />
            </PrivateRoute>
            <Route path="/404">
              <div>404 | Not Found Page</div>
            </Route>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}
App.propTypes = {
  isInitiallyLogged: T.bool,
};

App.defaultProps = {
  isInitiallyLogged: false,
};
export default App;
