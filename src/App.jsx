import PropTypes from "prop-types";
import { useState } from "react";
import "./App.css";
import lottoImage1 from "./assets/lotto-649.png";
import lottoImage2 from "./assets/lotto-max.png";

function App() {
  const poolNumbers = Array.from({ length: 50 }, (_, i) => i + 1); // create an array contains number 1-50
  //console.log(poolNumbers);

  const [luckyNums, setLuckyNums] = useState(""); //user input strings
  const [randomNumsResult, setRandomNumsResult] = useState([]); // generate random numbers for lotto-649
  const [randomMaxResult, setRandomMaxResult] = useState([]); // generate random numbers for lotto-max
  const [arrLuckyNums, setArrLuckyNums] = useState([]); //extract numbers from input and put into a new array
  const [lottoType, setLottoType] = useState("unselected"); // switch lotto ticket type, lotto-649 or lotto-max

  const handleInputNum = (e) => {
    const inputString = e.target.value;
    setLuckyNums(inputString);

    const inputConvert = inputString.match(/\d+/g); //extract numbers from input strings
    setArrLuckyNums(inputConvert); // add the number to an new array
  };

  // generate 6 random numbers from 1-49 for lotto-649
  const generateNum = () => {
    const random649Set = new Set(); // create a Set Object to disable duplicated numbers
    while (random649Set.size < 6) {
      const random649 = Math.floor(Math.random() * 49 + 1); // generate a random number from 1-49
      random649Set.add(random649);
    }
    const random649Arr = Array.from(random649Set); // convert Set Object into an array
    setRandomNumsResult(random649Arr);
    /*
    for (let i = 0; i < 6; i++) {
      // repeat 6 times
      const random649 = Math.floor(Math.random() * 49 + 1); 
      randomArr.push(random649);
    }
    //console.log(randomArr);
    setRandomNumsResult(randomArr);
    */
  };

  // generate 7 random numbers 1-50 for lotto-max
  const generateMax = () => {
    const randomMaxResultSet = new Set();
    while (randomMaxResultSet.size < 7) {
      const randomNumMax = Math.floor(Math.random() * 50 + 1); // generate a random number from 1-50
      randomMaxResultSet.add(randomNumMax);
    }
    const randomMaxResultArr = Array.from(randomMaxResultSet);
    setRandomMaxResult(randomMaxResultArr);

    /*
    let randomMaxResultArr = [];
    for (let i = 0; i < 7; i++) {
      const randomNumMax = Math.floor(Math.random() * 50 + 1); // generate a random number from 1-50
      randomMaxResultArr.push(randomNumMax);
    }
    //console.log(randomMaxResultArr);
    setRandomMaxResult(randomMaxResultArr);
    */
  };

  const handleLottoType = (e) => {
    const radioInputValue = e.target.value;
    if (radioInputValue !== "649" && radioInputValue !== "max") {
      setLottoType("unselected");
    } else {
      setLottoType(radioInputValue);
    }
  };

  return (
    <div className="main">
      <h1>Lukcy Lottery Picker</h1>
      <div className="container">
        <LotteryPool
          poolNumbers={poolNumbers}
          randomNumsResult={randomNumsResult}
          randomMaxResult={randomMaxResult}
          lottoType={lottoType}
        />
        <NumPicking
          luckyNums={luckyNums}
          arrLuckyNums={arrLuckyNums}
          onInputNum={handleInputNum}
          onRandomNum={generateNum}
          onRandomNumMax={generateMax}
          lottoType={lottoType}
          onLottoTypeChange={handleLottoType}
        />
      </div>
    </div>
  );
}

App.propTypes = {
  luckyNums: PropTypes.string,
};

function LotteryPool({
  poolNumbers,
  randomNumsResult,
  randomMaxResult,
  lottoType,
}) {
  const sortNumsResult = randomNumsResult.slice().sort((a, b) => a - b);
  const sortMaxResult = randomMaxResult.slice().sort((a, b) => a - b);
  return (
    <div className="numberSide">
      <div className="mainNums">
        <div className="numbersContainer">
          {poolNumbers.map((number) => (
            <div className="singleNum" key={number}>
              <div className="numberBackground">{number}</div>
            </div>
          ))}
        </div>

        {lottoType === "649" ? ( //render numbers for the drawing pool
          <div className="lottoNumWrap">
            {sortNumsResult?.map((num, index) => (
              <div key={index} className="lottoNum">
                {num}
              </div>
            ))}
          </div>
        ) : (
          <div className="lottoNumWrap">
            {sortMaxResult?.map((num, index) => (
              <div key={index} className="lottoNum">
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

LotteryPool.propTypes = {
  poolNumbers: PropTypes.arrayOf(PropTypes.number).isRequired, // expecting an array of numbers
  randomNumsResult: PropTypes.arrayOf(PropTypes.number).isRequired,
  randomMaxResult: PropTypes.arrayOf(PropTypes.number).isRequired,
  lottoType: PropTypes.string.isRequired,
};

NumPicking.propTypes = {
  luckyNums: PropTypes.string.isRequired, // expecting a string
  onInputNum: PropTypes.func.isRequired, // expecting a function
  onRandomNum: PropTypes.func.isRequired, // expecting a function
  onRandomNumMax: PropTypes.func.isRequired, // expecting a function
  arrLuckyNums: PropTypes.arrayOf(PropTypes.string).isRequired, // expecting an array of strings
  lottoType: PropTypes.string.isRequired,
  onLottoTypeChange: PropTypes.func.isRequired,
};

function NumPicking({
  luckyNums,
  arrLuckyNums,
  onInputNum,
  onRandomNum,
  onRandomNumMax,
  lottoType,
  onLottoTypeChange,
}) {
  return (
    <div className="sidebar">
      <div>
        <div className="chooseContainer">
          <div className="chooseLottoWrap">
            <img className="lottoImg-1" src={lottoImage1} alt="lotto-649" />
            <input
              type="radio"
              value="649"
              name="option"
              onClick={(e) => onLottoTypeChange(e)}
            />
            {/*use 'name' attribute to group the radio inputs together, can only select one */}
          </div>
          <div className="chooseLottoWrap">
            <img className="lottoImg-2" src={lottoImage2} alt="lotto-max" />
            <input
              type="radio"
              value="max"
              name="option"
              onClick={(e) => onLottoTypeChange(e)}
            />
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
      {lottoType === "unselected" ? (
        <button disabled>Get Ticket</button>
      ) : lottoType === "649" ? (
        <button onClick={onRandomNum}>Get Ticket</button>
      ) : lottoType === "max" ? (
        <button onClick={onRandomNumMax}>Get Ticket</button>
      ) : null}
    </div>
  );
}

export default App;
