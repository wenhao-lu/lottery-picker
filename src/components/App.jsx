import PropTypes from "prop-types";
import "./App.css";
import LotteryPool from "./LotteryPool";
import NumPicking from "./NumPicking";
import Footer from "./Footer";
import lottoImage3 from "../assets/title.png";

export default function App() {
  return (
    <div className="main">
      <img src={lottoImage3} alt="title" className="title" />
      <div className="container">
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
