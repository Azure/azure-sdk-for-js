import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
/* eslint-disable */
import WebWorker from "worker-loader!./web.worker";

new WebWorker();

ReactDOM.render(
  <React.StrictMode>
    <div>check devtools</div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
