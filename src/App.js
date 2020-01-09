import React, { Component } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import ReactDOM from "react-dom";
import "typeface-roboto";
import logo from "./logo.svg";
import "./App.css";
import ApolloClient from "apollo-boost";
import RadioIcon from "@material-ui/icons/Radio";
import ChatIcon from "@material-ui/icons/Chat";

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      msg: "Send it into the void."
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
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClick("hello")}
          style={buttonStyle}
        >
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
    const navStyle = {
      color: "#515b61",
      backgroundColor: "#00081f",
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
          <a class="menu__link" href="#sisyphus" data-hover="Sisyphus">
            Sisyphus
          </a>
          <a class="menu__link" href="#about" data-hover="What's this?">
            What's this?
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
            <br></br>
            <span style={{ fontSize: 20 }}>Slowed Down + Reverb</span>
            <br></br>
            <span style={{ fontSize: 16 }}>sad girl/boy hours</span>
          </div>
        </div>
        <div class="panel" id="sisyphus">
          <div class="panel__content">
            <a href="#home">Under Construction.</a>
            <br></br>
            <span style={{ fontSize: 20 }}>In Greek mythology, Sisyphus was a mischievous Greek king. As punishment, he was forced to roll a large boulder up a hill, only for it to roll back down as he got to the top.</span>
            <br></br>
            <span style={{ fontSize: 20 }}>Some see it as an allegory for the human condition.</span>
          </div>
        </div>
        <div class="panel" id="about">
          <div class="panel__content">
            <span style={{ fontSize: 20 }}>A therapeutic site inspired during sad boy hours. A reflection of current feelings. Not a substitute for professional help.</span>
            <br></br>
            <a style={{ fontSize: 16}}href="#home">Home.</a>
            
          </div>
        </div>
        

        
      </div>
    );
  }
}

export default App;
