import PropTypes from 'prop-types';
import './App.css';
import LotteryPool from './LotteryPool';
import NumPicking from './NumPicking';
import Footer from './Footer';
import lottoImage3 from '../assets/title.png';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-between">
      <img
        src={lottoImage3}
        alt="title"
        className="mt-6 w-4/5 py-6 lg:w-3/5 lg:py-3"
      />
      <div className="w-full bg-stone-50 md:w-4/5 lg:grid lg:grid-cols-3 lg:items-center lg:justify-center lg:gap-4 lg:py-16">
        <NumPicking />
        <LotteryPool />
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  luckyNums: PropTypes.string,
};
