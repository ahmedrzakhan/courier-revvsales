import React, { Component } from "react";

import { Input, Button } from "./../styles/styles";

import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_email: "",
      password: "",
      org_domain: "fta7705l",
      token: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleAuth = (e) => {
    const { user_email, password, org_domain } = this.state;
    e.preventDefault();

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        GrantType: "password",
      },
      url: "https://api.revvsales.com/api/v2/auth/initiate-auth",
      data: {
        user_email: user_email,
        password: password,
        org_domain: org_domain,
      },
    })
      .then((res) => {
          console.log(res);
          this.setState({
              token: res.data.User.access_token,
          })
        })
      .catch((err) => console.log(err));
  };

  render() {
    const { user_email, password } = this.state;
    console.log(this.state)
    return (
      <div>
        <form>
          <div>
            Username:
            <Input
              type="text"
              name="user_email"
              value={user_email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            Password:
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Button onClick={this.handleAuth}>Send Mail</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
