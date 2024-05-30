import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="main">
      <h1>Lukcy Lottery Picker</h1>
      <div className="container">
        <LotteryPool />
        <NumPicking />
      </div>
    </div>
  );
}

function LotteryPool() {
  return (
    <div>
      <div>numbers</div>
      <div>output</div>
    </div>
  );
}

function NumPicking() {
  return (
    <div>
      <div>choose type</div>
      <div>lucky number</div>
      <div>output</div>
      <button>feeling lucky</button>
    </div>
  );
}

export default App;
