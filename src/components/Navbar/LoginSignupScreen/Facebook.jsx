import React from "react";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./Facebook.css";

class Facebook extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      name: "",
    };
  }

  responseFacebook = (response) => {
    this.setState({ name: response.name });
    this.props.handleFbUsername(this.state.name);
  };

  componentClicked = () => {
    setTimeout(() => {
      // this.props.handleFbUsername(this.state.name);
      console.log("clicked");
    }, 250);
  };

  render(props) {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="317929866865000"
          autoLoad={false}
          fields="name,email,picture"
          // onClick={this.componentClicked}
          callback={this.responseFacebook}
          render={(renderProps) => (
            <button className="fb-btn" onClick={renderProps.onClick}>
              <div>
                <i className="fa fa-facebook-square"></i>Continue with Facebook
              </div>
            </button>
          )}
        />
      );
    }

    return <div className="facebook-container">{fbContent}</div>;
  }
}

export default Facebook;
