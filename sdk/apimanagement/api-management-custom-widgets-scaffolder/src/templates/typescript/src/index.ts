import {askForSecrets, getEditorValues, Secrets} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "./values"

class App {
  public readonly editorValues
  private secrets: Secrets | undefined

  constructor() {
    this.editorValues = getEditorValues(valuesDefault)

    Object.entries(this.editorValues).forEach(([key, value]) => {
      const element = document.getElementById(`editorValues.${key}`)
      if (element) element.innerText = value
    })

    document.getElementById("message")?.setAttribute("placeholder", this.editorValues.placeholder)

    document.getElementById("form")?.addEventListener("submit", event => {
      event.preventDefault()

      const data = new FormData(event.target as HTMLFormElement);
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/');
      xhr.onload = console.log
      // xhr.send(data);
    })

    askForSecrets("app")
      .then(secrets => this.secrets = secrets)
      .catch(e => console.error("Failed to retrieve secrets from the Developer Portal. The app might not work as expected!", e))
  }
}

export default App
