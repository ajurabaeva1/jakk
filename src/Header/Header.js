import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import logo from "../assets/logo.svg";
import "./Header.css";

class Header extends Component {
  state = {
    googleResponse: {},
    uniqueId: "",
    loggedin: false
  };

  //from Google API sending data too userInfo and updating state
  googleResponse = response => {
    let userInfo = {
      name: response.profileObj.name,
      uniqueId: response.profileObj.googleId,
      imageUrl: response.profileObj.imageUrl
    };

    this.setState({
      googleResponse: userInfo,
      loggedin: true
    });
    //set parameters to the Main Component using a function
    this.props.setUser(userInfo, this.state.loggedin);
    this.props.history.push(`/artist/${userInfo.name.replace(" ", "-")}`);
  };
  logout = response => {
    console.log(response);
    this.setState({
      loggedin: false
    });

    // After logout clean user in main app state {}
    this.props.setUser({}, false);
    this.props.history.push("/");
  };
  render() {
    const { googleResponse } = this.state;
    return (
      <header>
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>

        {this.state.loggedin ? (
          <div className="header-profile">
            <Link
              className="header-profile-link"
              to={`/artist/${googleResponse.name.replace(" ", "-")}`}
            >
              <img
                className="avatar"
                src={googleResponse.imageUrl}
                alt="user avatar"
              />
              My account
            </Link>

            <GoogleLogout
              render={renderProps => (
                <button
                  className="header-profile-link"
                  onClick={renderProps.onClick}
                >
                  Logout
                </button>
              )}
              onLogoutSuccess={this.logout}
            />
          </div>
        ) : (
          <GoogleLogin
            clientId="88550996686-j09a6ki4c7q3oe2ovd8pa0vv09qae79g.apps.googleusercontent.com"
            isSignedIn
            uxMode="popup"
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}
            render={renderProps => (
              <button
                className="header-profile-link"
                onClick={renderProps.onClick}
              >
                Login
              </button>
            )}
          />
        )}
      </header>
    );
  }
}

// https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
export default withRouter(Header);
