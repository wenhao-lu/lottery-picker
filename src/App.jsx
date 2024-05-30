import PropTypes from "prop-types";
import { useState } from "react";
import "./App.css";
import lottoImage1 from "./assets/lotto-649.png";
import lottoImage2 from "./assets/lotto-max.png";

function App() {
  const poolNumbers = Array.from({ length: 50 }, (_, i) => i + 1); // create an array contains number 1-50
  //console.log(poolNumbers);

  const [luckyNums, setLuckyNums] = useState(""); //user input strings
  const [randomNums, setRandomNums] = useState([]);
  const [arrLuckyNums, setArrLuckyNums] = useState([]); //extract numbers from input and put into a new array

  const handleInputNum = (e) => {
    const inputString = e.target.value;
    setLuckyNums(inputString);

    const inputConvert = inputString.match(/\d+/g); //extract numbers from input strings
    setArrLuckyNums(inputConvert); // add the number to an new array
  };

  const generateNum = () => {
    let randomArr = [];
    for (let i = 0; i < 6; i++) {
      // repeat 6 times
      const random649 = Math.floor(Math.random() * 49 + 1); // generate a random number from 1-49
      randomArr.push(random649);
    }
    //console.log(randomArr);
    setRandomNums(randomArr);
  };
  return (
    <div className="main">
      <h1>Lukcy Lottery Picker</h1>
      <div className="container">
        <LotteryPool numbers={poolNumbers} randomNums={randomNums} />
        <NumPicking
          luckyNums={luckyNums}
          arrLuckyNums={arrLuckyNums}
          onInputNum={handleInputNum}
          onRandomNum={generateNum}
        />
      </div>
    </div>
  );
}

App.propTypes = {
  luckyNums: PropTypes.string,
};

function LotteryPool({ numbers, randomNums }) {
  return (
    <div className="numberSide">
      <div className="numbersContainer">
        {numbers.map((number) => (
          <div className="singleNum" key={number}>
            <div className="numberBackground">{number}</div>
          </div>
        ))}
      </div>
      {randomNums?.map((num, index) => (
        <div key={index} className="lottoNum">
          {num}
        </div>
      ))}
    </div>
  );
}

LotteryPool.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired, // expecting an array of numbers
  randomNums: PropTypes.arrayOf(PropTypes.number).isRequired,
};

NumPicking.propTypes = {
  luckyNums: PropTypes.string.isRequired, // expecting a string
  onInputNum: PropTypes.func.isRequired, // expecting a string
  onRandomNum: PropTypes.func.isRequired, // expecting a string
  arrLuckyNums: PropTypes.arrayOf(PropTypes.string).isRequired, // expecting an array of strings
};

function NumPicking({ luckyNums, arrLuckyNums, onInputNum, onRandomNum }) {
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
        <input type="text" value={luckyNums} onChange={onInputNum} />
      </div>
      <div>
        {arrLuckyNums?.map((num, index) => (
          <span key={index} className="luckyNum">
            {num}
          </span>
        ))}
      </div>
      <button onClick={onRandomNum}>Get Ticket</button>
    </div>
  );
}

export default App;
