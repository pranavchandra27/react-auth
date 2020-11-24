import { Redirect, Route, Switch } from "react-router-dom";
import { Navbar, Home, Login, Register, Dashboard } from "./components";
import ProtectedRoute from "./components/ProtectedRoute";
import { useData } from "./StateProvider";

import "./App.css";

const App = () => {
  const {
    state: { user },
  } = useData();

  const conditionalRedirect = (Comp, location) => {
    return !user ? (
      <Comp />
    ) : (
      <Redirect to={{ pathname: "/dashboard", state: { from: location } }} />
    );
  };

  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/login'
          render={({ location }) => conditionalRedirect(Login, location)}
        />
        <Route
          exact
          path='/register'
          render={({ location }) => conditionalRedirect(Register, location)}
        />
        <ProtectedRoute exact path='/dashboard'>
          <Dashboard />
        </ProtectedRoute>
      </Switch>
    </div>
  );
};

export default App;
