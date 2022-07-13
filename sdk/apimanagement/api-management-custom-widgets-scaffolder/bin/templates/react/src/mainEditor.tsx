import {StrictMode} from "react"
import {createRoot} from "react-dom/client"

import "./styles/shared.css"
import "./styles/editor.css"
import Editor from "./editor"
import {EditorDataProvider} from "./providers"

const root = createRoot(document.getElementById("root")!)
root.render(
  <StrictMode>
    <EditorDataProvider>
      <Editor />
    </EditorDataProvider>
  </StrictMode>,
)
