import PropTypes from "prop-types";
import lottoImage1 from "../assets/lotto-649.png";
import lottoImage2 from "../assets/lotto-max.png";

export default function NumPicking({
  luckyNums,
  arrLuckyNums,
  onInputNum,
  onRandomNum,
  onRandomNumMax,
  lottoType,
  onLottoTypeChange,
  onReset,
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
        <label>Your Lucky Number</label>
        <input type="text" value={luckyNums} onChange={onInputNum} />
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
        <button className="ticketBtn" onClick={onRandomNum}>
          Get Ticket
        </button>
      ) : lottoType === "max" ? (
        <button className="ticketBtn" onClick={onRandomNumMax}>
          Get Ticket
        </button>
      ) : null}

      <button className="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

NumPicking.propTypes = {
  luckyNums: PropTypes.string.isRequired, // expecting a string
  onInputNum: PropTypes.func.isRequired, // expecting a function
  onRandomNum: PropTypes.func.isRequired, // expecting a function
  onRandomNumMax: PropTypes.func.isRequired, // expecting a function
  arrLuckyNums: PropTypes.arrayOf(PropTypes.number).isRequired, // expecting an array of strings
  lottoType: PropTypes.string.isRequired,
  onLottoTypeChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
