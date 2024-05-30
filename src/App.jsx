import PropTypes from "prop-types";
import { useState } from "react";
import "./App.css";
import lottoImage1 from "./assets/lotto-649.png";
import lottoImage2 from "./assets/lotto-max.png";

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
    <div className="numberSide">
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
    <div className="sidebar">
      <div>
        <div className="chooseContainer">
          <div className="chooseLottoWrap">
            <img className="lottoImg-1" src={lottoImage1} alt="lotto-649" />
            <input type="radio" value="649" name="option" />
            {/*use 'name' attribute to group the radio inputs together, can only select one */}
          </div>
          <div className="chooseLottoWrap">
            <img className="lottoImg-2" src={lottoImage2} alt="lotto-max" />
            <input type="radio" value="max" name="option" />
          </div>
        </div>
      </div>
      <div className="numInputWrap">
        <label>lucky number</label>
        <input type="text" />
      </div>
      <div>output</div>
      <button>feeling lucky</button>
    </div>
  );
}

export default App;
