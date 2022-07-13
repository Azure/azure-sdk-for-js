import {StrictMode} from "react"
import {createRoot} from "react-dom/client"

import "./styles/shared.css"
import "./styles/app.css"
import App from "./app"
import {EditorDataProvider, SecretsProvider} from "./providers"

const root = createRoot(document.getElementById("root")!)
root.render(
  <StrictMode>
    <EditorDataProvider>
      <SecretsProvider targetModule="app">
        <App />
      </SecretsProvider>
    </EditorDataProvider>
  </StrictMode>,
)
