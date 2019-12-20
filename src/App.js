import React, { Component } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import "typeface-roboto";
import "./App.css";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      msg: "Send it into the void or send an anonymous message."
    };
  }

  handleClick = api => e => {
    e.preventDefault();
    document.getElementById("textinput").value = "";
    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  render() {
    const { loading, msg } = this.state;
    const buttonStyle = {
      margin: "12px"
    };
    return (
      <p>
        <ApolloProvider client={client}>
          <Query
            query={gql`
              {
                hello
              }
            `}
          >
            {({ data }) => <div>A greeting from the server: {data}</div>}
          </Query>
        </ApolloProvider>
        <span>{msg}</span>
        <br />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClick("hello")}
          style={buttonStyle}
        >
          {loading ? "Sending..." : "Send to the Void"}
        </Button>
        <Button variant="contained" color="primary" style={buttonStyle}>
          {loading ? "Sending..." : "Send to the Skies"}
        </Button>
      </p>
    );
  }
}

class App extends Component {
  render() {
    const textAreaStyle = {
      width: "75%",
      color: "#515b61",
      backgroundColor: "#bfe0f7",
      padding: "10px",
      margin: "20px",
      fontFamily: "Arial",
      fontSize: "calc(10px + 1vmin)",
      borderRadius: "6px"
    };
    return (
      <div className="App">
        <div class="panel" id="home">
          <h1>The Human Experience</h1>
          <p>by Aster Wu</p>
          <div class="menu">
            <a class="menu__link" href="#void" data-hover="Void">
              Void
            </a>
            <a class="menu__link" href="#radio" data-hover="Radio">
              Radio
            </a>
          </div>
        </div>

        <div class="panel" id="void">
          <div class="panel__content">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <p>All messages are 100% anonymous. Play nice.</p>
            <TextareaAutosize
              aria-label="empty textarea"
              id="textinput"
              rowsMin={25}
              rowsMax={25}
              placeholder=""
              style={textAreaStyle}
            />
            <LambdaDemo />
            <a href="#home">Close me.</a>
          </div>
        </div>

        <div class="panel" id="radio">
          <div class="panel__content">
            <a href="#home">Under Construction.</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
