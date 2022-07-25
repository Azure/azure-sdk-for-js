import {getEditorValues, Secrets} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "./values"

class App {
  public readonly editorValues
  public request: ((url: string) => Promise<Response>)

  constructor(
    public readonly secrets: Secrets,
  ) {
    this.request = url =>
      fetch(
        `${secrets.managementApiUrl}${url}?api-version=${secrets.apiVersion}`,
        {headers: {Authorization: secrets.token}},
      )

    this.editorValues = getEditorValues(valuesDefault)

    Object.entries(this.editorValues).forEach(([key, value]) => {
      const element = document.getElementById(`editorValues.${key}`)
      if (element) element.innerText = value
    })

    document.getElementById("message")?.setAttribute("placeholder", this.editorValues.placeholder)

    document.getElementById("form")?.addEventListener("submit", event => {
      event.preventDefault()

      const data = new FormData(event.target as HTMLFormElement)
      for (const value of data) {
        console.log(value)
      }
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/")
      xhr.onload = console.log
      // xhr.send(data);
    })
  }
}

export default App
