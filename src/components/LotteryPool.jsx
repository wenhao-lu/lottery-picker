import { useNumber } from './useNumber';

export default function LotteryPool() {
  const { randomNumsResult, randomMaxResult, lottoType } = useNumber();
  const poolNumbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const sortNumsResult = randomNumsResult.slice().sort((a, b) => a - b);
  const sortMaxResult = randomMaxResult.slice().sort((a, b) => a - b);
  const matched649Nums = new Set(randomNumsResult);
  const matchedMaxNums = new Set(randomMaxResult);
  return (
    <div className="lg:col-span-2 lg:mt-4">
      <div className="flex flex-col items-center justify-center">
        <div className="hidden md:mb-4 md:mt-6 md:flex md:w-4/5 md:flex-wrap md:items-center md:justify-center md:gap-6">
          {/* match numbers between the ticket and pool, heightlight winning numbers*/}
          {poolNumbers &&
            poolNumbers.map((number) => (
              <div
                className={`singleNum ${
                  matched649Nums.has(number) || matchedMaxNums.has(number)
                    ? 'heightlight'
                    : ''
                }`}
                key={number}
              >
                <div className="">{number}</div>
              </div>
            ))}
        </div>
        <div className="mb-8 flex h-24 items-center justify-center">
          {lottoType === '649' ? ( //render numbers for the drawing pool
            <div className="flex justify-center gap-3">
              {sortNumsResult?.map((num, index) => (
                <div
                  key={index}
                  className="flex h-10 w-10 animate-fadeIn items-center justify-center rounded-full border-green-700 bg-green-500 font-semibold text-sky-900 shadow-md transition-all before:absolute before:z-[-1] before:h-[1.6em] before:w-[1.6em] before:rounded-full before:border-[0.2em] before:border-[rgba(255,254,246,0.7)] before:bg-[#fff] before:content-['']"
                >
                  {num}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center gap-3">
              {sortMaxResult?.map((num, index) => (
                <div
                  key={index}
                  className="flex h-10 w-10 animate-fadeIn items-center justify-center rounded-full border-green-700 bg-green-500 font-semibold text-sky-900 shadow-md transition-all before:absolute before:z-[-1] before:h-[1.6em] before:w-[1.6em] before:rounded-full before:border-[0.2em] before:border-[rgba(255,254,246,0.7)] before:bg-[#fff] before:content-['']"
                >
                  {num}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
