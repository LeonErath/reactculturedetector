import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./data/6d.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pdi: 0,
      idv: 0,
      mas: 0,
      uai: 0,
      ltowvs: 0,
      result: []
    };

    this.calculateDifferences = this.calculateDifferences.bind(this);
  }

  calculateDifferences() {
    let sumArray = data
      .filter(
        country =>
          country.pdi != null &&
          country.idv != null &&
          country.mas != null &&
          country.uai != null &&
          country.ltowvs != null
      )
      .map(country => {
        let idvDiff = Math.abs(country.idv - this.state.idv);
        let pdiDiff = Math.abs(country.pdi - this.state.pdi);
        let masDiff = Math.abs(country.mas - this.state.mas);
        let uaiDiff = Math.abs(country.uai - this.state.uai);
        let ltowvsDiff = Math.abs(country.ltowvs - this.state.ltowvs);

        let sum = idvDiff + pdiDiff + masDiff + uaiDiff + ltowvsDiff;

        return { country, sum };
      });

    sumArray = sumArray.sort((a, b) => a.sum - b.sum).slice(0, 9);
    this.setState({ result: sumArray });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Which culture fits your character?</h1>
        </header>
        <p className="App-intro">
          <input
            type="number"
            onChange={e => this.setState({ pdi: e.target.value })}
            placeholder="PID"
          />
          <input
            type="number"
            onChange={e => this.setState({ idv: e.target.value })}
            placeholder="IDV"
          />
          <input
            type="number"
            onChange={e => this.setState({ mas: e.target.value })}
            placeholder="MAS"
          />
          <input
            type="number"
            onChange={e => this.setState({ uai: e.target.value })}
            placeholder="UAI"
          />
          <input
            type="number"
            onChange={e => this.setState({ ltowvs: e.target.value })}
            placeholder="LTOWVS"
          />
        </p>
        <p>
          <button onClick={this.calculateDifferences}>Calculate</button>
        </p>
        <p>
          {this.state.result.map(result => {
            return <p>{result.country.country}</p>;
          })}
        </p>
      </div>
    );
  }
}

export default App;
