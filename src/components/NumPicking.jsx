import { useNumber } from "./useNumber";
import lottoImage1 from "../assets/lotto-649.png";
import lottoImage2 from "../assets/lotto-max.png";

export default function NumPicking() {
  const {
    luckyNums,
    lottoType,
    arrLuckyNums,
    handleInputNum,
    generateNum,
    generateMax,
    handleLottoType,
    reset,
  } = useNumber();

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
              onClick={handleLottoType}
            />
            {/*use 'name' attribute to group the radio inputs together, can only select one */}
          </div>
          <div className="chooseLottoWrap">
            <img className="lottoImg-2" src={lottoImage2} alt="lotto-max" />
            <input
              type="radio"
              value="max"
              name="option"
              onClick={handleLottoType}
            />
          </div>
        </div>
      </div>
      <div className="numInputWrap">
        <label>Your Lucky Number</label>
        <input type="text" value={luckyNums} onChange={handleInputNum} />
      </div>
      <div className="luckyNumWrap">
        {arrLuckyNums?.map((num, index) => (
          <span key={index} className="luckyNum">
            {num}
          </span>
        ))}
      </div>
      {lottoType === "unselected" ? (
        <button disabled>Get Ticket</button>
      ) : lottoType === "649" ? (
        <button className="ticketBtn" onClick={generateNum}>
          Get Ticket
        </button>
      ) : lottoType === "max" ? (
        <button className="ticketBtn" onClick={generateMax}>
          Get Ticket
        </button>
      ) : null}

      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
