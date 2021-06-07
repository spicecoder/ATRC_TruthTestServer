import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.min.css";
import Domain from "./components/Domain";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import ResolutionPattern from "./components/Context/ResolutionPattern";
import TruthStatement from "./components/Context/TruthStatement";
import Navigation from "./components/Navbar";
import SignIn from "./components/login/Login";
import SignUp from "./components/login/Signup";
import UserProvider from "./provider/UserProvider";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Domain} />
            <Route
              path="/mslist/resolutionpattern/:domain"
              component={ResolutionPattern}
            />
            <Route
              path="/mslist/truth statement/:domain"
              component={TruthStatement}
            />
            <Route path="/login" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
