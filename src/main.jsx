// v1 - refactored with useReducer hook
// v2 - refactored with Context API

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
import { NumberProvider } from "./components/useNumber.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NumberProvider>
      <App />
    </NumberProvider>
  </React.StrictMode>
);
