import PropTypes from "prop-types";
import { useState } from "react";
import "./App.css";
import LotteryPool from "./LotteryPool";
import NumPicking from "./NumPicking";
import Footer from "./Footer";
import lottoImage3 from "../assets/title.png";

export default function App() {
  const poolNumbers = Array.from({ length: 50 }, (_, i) => i + 1); // create an array contains number 1-50
  //console.log(poolNumbers);

  const [luckyNums, setLuckyNums] = useState(""); //user input strings
  const [randomNumsResult, setRandomNumsResult] = useState([]); // generate random numbers for lotto-649
  const [randomMaxResult, setRandomMaxResult] = useState([]); // generate random numbers for lotto-max
  const [arrLuckyNums, setArrLuckyNums] = useState([]); //extract numbers from input strings and put into a new array
  const [lottoType, setLottoType] = useState("unselected"); // switch lotto ticket type, lotto-649 or lotto-max

  const handleInputNum = (e) => {
    const inputString = e.target.value;
    setLuckyNums(inputString);
    const inputConvert = inputString.match(/\d+/g); //extract numbers from input strings
    const inputConvertUnique = Array.from(new Set(inputConvert)).map(Number); // remove duplicated numbers from string and convert to numbers  '12345'=>[1,2,3,4,5]
    setArrLuckyNums(inputConvertUnique); // add the number to an new array
  };

  // generate 6 random numbers from 1-49 for lotto-649, no duplicated numbers
  const generateNum = () => {
    if (arrLuckyNums && arrLuckyNums.length < 6) {
      const random649Set = new Set(arrLuckyNums); // create a Set Object to disable duplicated numbers
      while (random649Set.size < 6) {
        const random649 = Math.floor(Math.random() * 49 + 1); // generate a random number from 1-49
        random649Set.add(random649);
      }
      const random649Arr = Array.from(random649Set); // convert Set Object into an array
      setRandomNumsResult(random649Arr);
    } else if (arrLuckyNums && arrLuckyNums.length > 6) {
      const tempArr = [...arrLuckyNums];
      while (tempArr.length > 6) {
        const indexToRemove = Math.floor(Math.random() * tempArr.length);
        tempArr.splice(indexToRemove, 1);
      }
      setRandomNumsResult(tempArr);
    } else if (arrLuckyNums && arrLuckyNums.length === 6) {
      setRandomNumsResult([...arrLuckyNums]);
    } else {
      const random649Set = new Set();
      while (random649Set.size < 6) {
        const random649 = Math.floor(Math.random() * 49 + 1);
        random649Set.add(random649);
      }
      const random649Arr = Array.from(random649Set);
      setRandomNumsResult(random649Arr);
    }
    setRandomMaxResult([]);
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
    if (arrLuckyNums && arrLuckyNums.length < 7) {
      const randomMaxResultSet = new Set(arrLuckyNums);
      while (randomMaxResultSet.size < 7) {
        const randomNumMax = Math.floor(Math.random() * 50 + 1);
        randomMaxResultSet.add(randomNumMax);
      }
      const randomMaxResultArr = Array.from(randomMaxResultSet);
      setRandomMaxResult(randomMaxResultArr);
    } else if (arrLuckyNums && arrLuckyNums.length > 7) {
      const tempMaxArr = [...arrLuckyNums];
      while (tempMaxArr.length > 7) {
        const indexRemoveMax = Math.floor(Math.random() * tempMaxArr.length);
        tempMaxArr.splice(indexRemoveMax, 1);
      }
      setRandomMaxResult(tempMaxArr);
    } else if (arrLuckyNums && arrLuckyNums.length === 7) {
      setRandomMaxResult([...arrLuckyNums]);
    } else {
      const randomMaxResultSet = new Set();
      while (randomMaxResultSet.size < 7) {
        const randomNumMax = Math.floor(Math.random() * 50 + 1); // generate a random number from 1-50
        randomMaxResultSet.add(randomNumMax);
      }
      const randomMaxResultArr = Array.from(randomMaxResultSet);
      setRandomMaxResult(randomMaxResultArr);
    }
    setRandomNumsResult([]);
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
      setRandomNumsResult([]);
      setRandomMaxResult([]);
    }
  };

  const reset = () => {
    setLuckyNums("");
    setRandomNumsResult([]);
    setRandomMaxResult([]);
    setArrLuckyNums([]);
  };

  return (
    <div className="main">
      <img src={lottoImage3} alt="title" className="title" />
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
          onReset={reset}
        />
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  luckyNums: PropTypes.string,
};
