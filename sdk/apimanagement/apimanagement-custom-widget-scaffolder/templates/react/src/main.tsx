import {StrictMode} from "react"
import ReactDOM from "react-dom"

import "./styles/shared.css"
import "./styles/app.css"
import App from "./app"

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
)
