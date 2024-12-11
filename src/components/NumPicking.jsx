import { useNumber } from './useNumber';
import lottoImage1 from '../assets/lotto-649.png';
import lottoImage2 from '../assets/lotto-max.png';

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
    <div className="mt-4 flex flex-col items-center lg:col-span-1 lg:pl-4">
      <div>
        <div className="flex">
          <div className="flex flex-col items-center justify-center px-6 py-3">
            <img className="w-32" src={lottoImage1} alt="lotto-649" />
            <input
              type="radio"
              value="649"
              name="option"
              onClick={handleLottoType}
            />
            {/*use 'name' attribute to group the radio inputs together, can only select one */}
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-3">
            <img className="w-32" src={lottoImage2} alt="lotto-max" />
            <input
              type="radio"
              value="max"
              name="option"
              onClick={handleLottoType}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="bold font-medium italic text-sky-600">
          {lottoType === null
            ? 'Select ticket'
            : lottoType === 'unselected'
              ? 'Select ticket'
              : lottoType === '649'
                ? 'Lotto649'
                : lottoType === 'max'
                  ? 'LottoMax'
                  : null}
        </p>
      </div>

      <div className="mb-2 mt-2 flex flex-col items-center">
        <label>Add your lucky number 1~50</label>
        <input
          type="text"
          value={luckyNums}
          onChange={handleInputNum}
          className="z-10 bg-stone-200 text-center text-sky-900"
        />
      </div>
      <div className="flex h-16 items-center">
        {arrLuckyNums?.map((num, index) => (
          <span
            key={index}
            className="m-1 rounded-sm bg-yellow-300 p-1 font-medium"
          >
            {num}
          </span>
        ))}
      </div>
      {lottoType === 'unselected' ? (
        <button
          disabled
          className="cursor-not-allowed rounded-md bg-gray-300 px-4 py-3"
        >
          Get Ticket
        </button>
      ) : lottoType === '649' ? (
        <button
          className="rounded-md bg-sky-400 px-4 py-3 transition duration-300 hover:bg-sky-300"
          onClick={generateNum}
        >
          Get Ticket
        </button>
      ) : lottoType === 'max' ? (
        <button
          className="rounded-md bg-sky-400 px-4 py-3 transition duration-300 hover:bg-sky-300"
          onClick={generateMax}
        >
          Get Ticket
        </button>
      ) : null}

      <button
        className="mt-2 rounded-md bg-red-500 px-3 py-2 hover:bg-rose-400"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}
