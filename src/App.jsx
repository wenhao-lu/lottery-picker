import PropTypes from "prop-types";
import { useState } from "react";
import "./App.css";

function App() {
  const poolNumbers = Array.from({ length: 50 }, (_, i) => i + 1); // create an array contains number 1-50
  console.log(poolNumbers);
  return (
    <div className="main">
      <h1>Lukcy Lottery Picker</h1>
      <div className="container">
        <LotteryPool numbers={poolNumbers} />
        <NumPicking />
      </div>
    </div>
  );
}

function LotteryPool({ numbers }) {
  return (
    <div>
      <div className="numbersContainer">
        {numbers.map((number) => (
          <div className="singleNum" key={number}>
            <div className="numberBackground">{number}</div>
          </div>
        ))}
      </div>
      <div>output</div>
    </div>
  );
}

LotteryPool.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired, // expecting an array of numbers
};

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
