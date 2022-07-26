import {StrictMode} from "react"
import {createRoot} from "react-dom/client"

import "./styles/editor.scss"
import Editor from "./editor"
import {WidgetDataProvider} from "./providers"

const root = createRoot(document.getElementById("root")!)
root.render(
  <StrictMode>
    <WidgetDataProvider>
      <Editor />
    </WidgetDataProvider>
  </StrictMode>,
)
