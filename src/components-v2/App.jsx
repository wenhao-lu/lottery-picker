import PropTypes from "prop-types";
import { useReducer } from "react";
import "./App.css";
import LotteryPool from "./LotteryPool";
import NumPicking from "./NumPicking";
import Footer from "./Footer";
import lottoImage3 from "../assets/title.png";

const initialState = {
  luckyNums: "",
  arrLuckyNums: [],
  randomNumsResult: [],
  randomMaxResult: [],
  lottoType: "unselected",
};

function reducer(state, action) {
  switch (action.type) {
    case "type/select": {
      let radioInputValue = action.payload;
      if (radioInputValue !== "649" && radioInputValue !== "max") {
        state.lottoType = "unselected";
      } else {
        state.lottoType = radioInputValue;
      }
      return {
        ...state,
        randomNumsResult: [],
        randomMaxResult: [],
        lottoType: state.lottoType,
      };
    }

    case "user/input": {
      const inputString = action.payload;
      const inputConvert = inputString.match(/\d+/g);
      const inputConvertUnique = Array.from(new Set(inputConvert)).map(Number);
      return {
        ...state,
        luckyNums: inputString,
        arrLuckyNums: inputConvertUnique,
      };
    }

    case "pick/random649": {
      let randomNumsResult = [];
      if (state.arrLuckyNums && state.arrLuckyNums.length < 6) {
        const random649Set = new Set(state.arrLuckyNums); // create a Set Object to disable duplicated numbers
        while (random649Set.size < 6) {
          const random649 = Math.floor(Math.random() * 49 + 1); // generate a random number from 1-49
          random649Set.add(random649);
        }
        randomNumsResult = Array.from(random649Set); // convert Set Object into an array
      } else if (state.arrLuckyNums && state.arrLuckyNums.length > 6) {
        const tempArr = [...state.arrLuckyNums];
        while (tempArr.length > 6) {
          const indexToRemove = Math.floor(Math.random() * tempArr.length);
          tempArr.splice(indexToRemove, 1);
        }
        randomNumsResult = tempArr;
      } else if (state.arrLuckyNums && state.arrLuckyNums.length === 6) {
        randomNumsResult = [...state.arrLuckyNums];
      } else {
        const random649Set = new Set();
        while (random649Set.size < 6) {
          const random649 = Math.floor(Math.random() * 49 + 1);
          random649Set.add(random649);
        }
        randomNumsResult = Array.from(random649Set);
      }
      return {
        ...state,
        randomNumsResult,
        randomMaxResult: [],
      };
    }

    case "pick/randomMax": {
      let randomMaxResult = [];

      if (state.arrLuckyNums && state.arrLuckyNums.length < 7) {
        const randomMaxResultSet = new Set(state.arrLuckyNums);
        while (randomMaxResultSet.size < 7) {
          const randomNumMax = Math.floor(Math.random() * 50 + 1);
          randomMaxResultSet.add(randomNumMax);
        }
        randomMaxResult = Array.from(randomMaxResultSet);
      } else if (state.arrLuckyNums && state.arrLuckyNums.length > 7) {
        const tempMaxArr = [...state.arrLuckyNums];
        while (tempMaxArr.length > 7) {
          const indexRemoveMax = Math.floor(Math.random() * tempMaxArr.length);
          tempMaxArr.splice(indexRemoveMax, 1);
        }
        randomMaxResult = tempMaxArr;
      } else if (state.arrLuckyNums && state.arrLuckyNums.length === 7) {
        randomMaxResult = [...state.arrLuckyNums];
      } else {
        const randomMaxResultSet = new Set();
        while (randomMaxResultSet.size < 7) {
          const randomNumMax = Math.floor(Math.random() * 50 + 1); // generate a random number from 1-50
          randomMaxResultSet.add(randomNumMax);
        }
        randomMaxResult = Array.from(randomMaxResultSet);
      }
      return {
        ...state,
        randomMaxResult,
        randomNumsResult: [],
      };
    }

    case "reset":
      return initialState;

    default:
      throw new Error("Unkonwn type");
  }
}

export default function App() {
  const poolNumbers = Array.from({ length: 50 }, (_, i) => i + 1); // create an array contains number 1-50
  //console.log(poolNumbers);
  /*
  const [luckyNums, setLuckyNums] = useState(""); //user input strings
  const [randomNumsResult, setRandomNumsResult] = useState([]); // generate random numbers for lotto-649
  const [randomMaxResult, setRandomMaxResult] = useState([]); // generate random numbers for lotto-max
  const [arrLuckyNums, setArrLuckyNums] = useState([]); //extract numbers from input strings and put into a new array
  const [lottoType, setLottoType] = useState("unselected"); // switch lotto ticket type, lotto-649 or lotto-max
  */

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    luckyNums,
    arrLuckyNums,
    randomNumsResult,
    randomMaxResult,
    lottoType,
  } = state;

  const handleInputNum = (e) => {
    const inputString = e.target.value;
    dispatch({ type: "user/input", payload: inputString });
  };

  // generate 6 random numbers from 1-49 for lotto-649, no duplicated numbers
  const generateNum = () => {
    // the action pick random numbers is purely state-driven , no extra action/data needed, so no payload needed
    dispatch({ type: "pick/random649" });
  };

  // generate 7 random numbers 1-50 for lotto-max
  const generateMax = () => {
    dispatch({ type: "pick/randomMax" });
  };

  const handleLottoType = (e) => {
    const radioInputValue = e.target.value;
    dispatch({ type: "type/select", payload: radioInputValue });
  };

  const reset = () => {
    dispatch({ type: "reset" });
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
