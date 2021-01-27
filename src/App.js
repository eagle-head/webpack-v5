import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ErrorBoundary from "./pages/Error";
import { RebelBrands } from "./assets/svg";

const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Users = lazy(() => import("./pages/Users"));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>

            <hr />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/users" component={Users} />
            </Switch>

            <Button color="primary">Hello World</Button>
            <h1>Hello World !!</h1>
            <RebelBrands width="200px" height="200px" />
          </div>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
