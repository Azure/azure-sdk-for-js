import {StrictMode} from "react"
import ReactDOM from "react-dom"

import "./styles/shared.css"
import "./styles/app.css"
import App from "./app"
import {EditorDataProvider, SecretsProvider} from "./Providers"

ReactDOM.render(
  <StrictMode>
    <EditorDataProvider>
      <SecretsProvider targetModule="app">
        <App />
      </SecretsProvider>
    </EditorDataProvider>
  </StrictMode>,
  document.getElementById("root")
)
