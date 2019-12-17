import React, { Component } from "react"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom'
import 'typeface-roboto';
import logo from "./logo.svg"
import "./App.css"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: "Send it into the void or send an anonymous message." }
  }

  handleClick = api => e => {
    e.preventDefault()
    ReactDOM.render(<App/>, document.getElementById('root'));
    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state
    const buttonStyle = {
      margin: "12px",
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
        style={buttonStyle}
      >
        {loading ? "Sending..." : "Send to the Skies"}
      </Button>

        
      </p>
    )
  }
}

class App extends Component {
  render() {
    const textAreaStyle = {
      width: "60%",
      color: "#515b61",
      backgroundColor: "#bfe0f7",
      padding: "10px",
      fontFamily: "Arial",
      fontSize: "calc(10px + 1vmin)",
      borderRadius: "6px",
    };
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>All messages are 100% anonymous. Play nice.</p>
          <TextareaAutosize aria-label="empty textarea" id="textinput" rowsMin={25} rowsMax={25} placeholder="" style={textAreaStyle} />
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
