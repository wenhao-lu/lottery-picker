import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const NumberContext = createContext();

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
        const random649Set = new Set(state.arrLuckyNums);
        while (random649Set.size < 6) {
          const random649 = Math.floor(Math.random() * 49 + 1);
          random649Set.add(random649);
        }
        randomNumsResult = Array.from(random649Set);
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
          const randomNumMax = Math.floor(Math.random() * 50 + 1);
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

function NumberProvider({ children }) {
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
    <NumberContext.Provider
      value={{
        luckyNums,
        arrLuckyNums,
        handleInputNum,
        generateNum,
        generateMax,
        lottoType,
        handleLottoType,
        reset,
        randomNumsResult,
        randomMaxResult,
      }}
    >
      {children}
    </NumberContext.Provider>
  );
}

function useNumber() {
  const context = useContext(NumberContext);
  if (context === undefined) {
    throw new Error("NumberContext should be used within NumberProvider");
  }
  return context;
}

export { NumberProvider, useNumber };

NumberProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
