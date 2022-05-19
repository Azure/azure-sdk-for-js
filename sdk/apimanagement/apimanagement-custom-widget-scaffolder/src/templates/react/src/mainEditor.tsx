import {StrictMode} from "react"
import ReactDOM from "react-dom"

import "./styles/shared.css"
import "./styles/editor.css"
import Editor from "./editor"

ReactDOM.render(
  <StrictMode>
    <Editor />
  </StrictMode>,
  document.getElementById("root"),
)
