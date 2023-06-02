import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

//initial types required for the states or data to run the programme
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

//defining class component App with the states data and showGraph
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  //we are defining renderGraph funtion which will retrun the graph component whenever funvtion called and showGraph value is true
  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  //we are defining function fro getting contioues getting data on interval from the server and update the state of data as well as showGraph
  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      //if reach the limit then clear the interval and start again
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  //render the App component
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank Merge & Co Task 3
        </header>
        <div className="App-content">
          {/* calling function getDataFromServer whenver we click on the button */}
          <button className="btn btn-primary Stream-button" onClick={() => {this.getDataFromServer()}}>Start Streaming Data</button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
