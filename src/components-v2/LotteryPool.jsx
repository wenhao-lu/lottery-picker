import PropTypes from "prop-types";

export default function LotteryPool({
  poolNumbers,
  randomNumsResult,
  randomMaxResult,
  lottoType,
}) {
  const sortNumsResult = randomNumsResult.slice().sort((a, b) => a - b);
  const sortMaxResult = randomMaxResult.slice().sort((a, b) => a - b);
  const matched649Nums = new Set(randomNumsResult);
  const matchedMaxNums = new Set(randomMaxResult);
  return (
    <div className="numberSide">
      <div className="mainNums">
        <div className="numbersContainer">
          {/* match numbers between the ticket and pool, heightlight winning numbers*/}
          {poolNumbers.map((number) => (
            <div
              className={`singleNum ${
                matched649Nums.has(number) || matchedMaxNums.has(number)
                  ? "heightlight"
                  : ""
              }`}
              key={number}
            >
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
