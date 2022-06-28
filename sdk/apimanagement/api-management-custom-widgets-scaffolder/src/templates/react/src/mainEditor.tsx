import {StrictMode} from "react"
import ReactDOM from "react-dom"

import "./styles/shared.css"
import "./styles/editor.css"
import Editor from "./editor"
import {EditorDataProvider} from "./Providers"

ReactDOM.render(
  <StrictMode>
    <EditorDataProvider>
      <Editor />
    </EditorDataProvider>
  </StrictMode>,
  document.getElementById("root")
)
