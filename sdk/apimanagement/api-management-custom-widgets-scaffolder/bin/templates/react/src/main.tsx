import {StrictMode} from "react"
import {createRoot} from "react-dom/client"

import "./styles/app.scss"
import App from "./app"
import {SecretsProvider, WidgetDataProvider} from "./providers"

const root = createRoot(document.getElementById("root")!)
root.render(
  <StrictMode>
    <WidgetDataProvider>
      <SecretsProvider targetModule="app">
        <App />
      </SecretsProvider>
    </WidgetDataProvider>
  </StrictMode>,
)
