import React, { Component } from "react";
import Header from "../Header/Header";
import Exhibitions from "../Exhibitions/Exhibitions";
import CreateNewExhibit from "../CreateNewExhibit/CreateNewExhibit";
import UserPage from "../UserPage/UserPage";
import { Switch, Route } from "react-router-dom";
import EditExhibit from "../EditExhibit/EditExhibit";
import Exhibit from "../Exhibit/Exhibit";

class MainComponent extends Component {
  state = {
    user: {},
    created: false,
    loggedin: false
  };

  //from Header (Lifting state)
  setUser = async (userInfo, loggedin) => {
    this.setState({ user: userInfo, loggedin: loggedin });
  };

  render() {
    return (
      <div>
        <Header setUser={this.setUser} />
        <Switch>
          <Route path="/update_exhibit" component={EditExhibit} />
          <Route
            user={this.state.user}
            path="/create_exhibit"
            render={props => (
              <CreateNewExhibit
                user={this.state.user}
                loggedin={this.state.loggedin}
              />
            )}
          />

          <Route exact path="/" component={Exhibitions} />
          <Route path="/artist/:name" component={UserPage} />
          <Route
            path="/:id"
            render={props => (
              <Exhibit
                user={this.state.user}
                loggedin={this.state.loggedin}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default MainComponent;
