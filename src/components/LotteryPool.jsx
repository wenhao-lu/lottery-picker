import { useNumber } from "./useNumber";

export default function LotteryPool() {
  const { randomNumsResult, randomMaxResult, lottoType } = useNumber();
  const poolNumbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const sortNumsResult = randomNumsResult.slice().sort((a, b) => a - b);
  const sortMaxResult = randomMaxResult.slice().sort((a, b) => a - b);
  const matched649Nums = new Set(randomNumsResult);
  const matchedMaxNums = new Set(randomMaxResult);
  return (
    <div className="numberSide">
      <div className="mainNums">
        <div className="numbersContainer">
          {/* match numbers between the ticket and pool, heightlight winning numbers*/}
          {poolNumbers &&
            poolNumbers.map((number) => (
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
